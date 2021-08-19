/* eslint-disable global-require */
import execa from 'execa';
import { transformAsync, TransformOptions } from '@babel/core';
import globby from 'globby';
import {
  readFile,
  ensureDir,
  writeFile,
  copyFile,
  pathExists,
  copy,
  remove,
} from 'fs-extra';
import { resolve, basename, dirname } from 'path';
import { mapLimit, map } from 'async';
import ora from 'ora';
import chalk from 'chalk';
import {
  DIST_PATH_ES,
  DIST_PATH_ESM,
  DIST_ROOT,
  BUILD_ESM_CACHE_PATH,
  BUILD_COMMONJS_CACHE_PATH,
  cpuCount,
  SRC_ROOT,
  ROOT_DIR,
  CP_FILES,
  TYPES_CACHE_PATH,
  ES6_CACHE_PATH,
  SIMPLE_BUILD_TS_CONFIG_FILE,
  SIMPLE_BUILD_TS_CONFIG_TEMPLATE,
} from './constants';
import FileCache from './file-cache';
import genReleasePackages from './genReleasePackages';

(process.env as any).NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';

const esmCache = new FileCache(BUILD_ESM_CACHE_PATH);
const commonjsCache = new FileCache(BUILD_COMMONJS_CACHE_PATH);

/**
 * 清空 dist 目录
 */
async function cleanDist() {
  await remove(DIST_ROOT);
}

async function ensureTsconfig() {
  const targetPath = resolve(ROOT_DIR, SIMPLE_BUILD_TS_CONFIG_FILE);
  const isExists = await pathExists(targetPath);

  if (!isExists) {
    await copy(SIMPLE_BUILD_TS_CONFIG_TEMPLATE, targetPath);
  }
}

/**
 * ts -> es and types
 */
async function buildEs6AndTypes() {
  await ensureTsconfig();
  await execa('yarn', ['run', 'tsc', '--build', SIMPLE_BUILD_TS_CONFIG_FILE], {
    stdio: 'inherit',
  });

  await copy(ES6_CACHE_PATH, DIST_PATH_ES);
  await copy(TYPES_CACHE_PATH, DIST_ROOT);
}

/**
 * 通过 babel 编译代码
 *
 * @param from 源码目录
 * @param to 生成代码放置目录
 * @param opts 选项
 */
async function buildByBabel(
  from: string,
  to: string,
  opts: TransformOptions,
  cache: FileCache,
) {
  const files = await globby(['**/*.js'], {
    cwd: from,
  });

  await ensureDir(to);

  await mapLimit(files, cpuCount - 1, async (filePath: string) => {
    const sourcePath = resolve(from, filePath);
    const distPath = resolve(to, filePath);

    let compiledCode = await cache.get(sourcePath);

    if (!compiledCode) {
      const codeSource = await readFile(sourcePath, 'utf-8');

      const result = await transformAsync(codeSource, {
        configFile: false,
        filename: basename(filePath),
        ast: true,
        ...opts,
      });

      await cache.store(sourcePath, result?.code);
      compiledCode = result?.code;
    }

    await ensureDir(dirname(distPath));
    await writeFile(distPath, compiledCode);
  });
}

/**
 * es -> esm
 */
async function buildEsm() {
  await buildByBabel(
    DIST_PATH_ES,
    DIST_PATH_ESM,
    {
      presets: [require('babel-preset-ts-lib')],
    },
    esmCache,
  );
}

/**
 * esm -> commonjs
 */
async function buildCommonjs() {
  await buildByBabel(
    DIST_PATH_ESM,
    DIST_ROOT,
    {
      plugins: [require('@babel/plugin-transform-modules-commonjs')],
    },
    commonjsCache,
  );
}

/**
 * 拷贝文件
 */
async function copyFiles() {
  const files = await globby(
    [
      '**/*',
      '!**/*.ts',
      '!**/*.tsx',
      '!**/__tests__/**',
      '!**/__snapshots__/**',
    ],
    {
      cwd: SRC_ROOT,
    },
  );

  const copyToDist = async (distPath: string) => {
    await mapLimit(files, 10, async (filePath) => {
      await ensureDir(dirname(resolve(distPath, filePath)));
      await copyFile(resolve(SRC_ROOT, filePath), resolve(distPath, filePath));
    });
  };

  await copyToDist(DIST_PATH_ES);
  await copyToDist(DIST_PATH_ESM);
  await copyToDist(DIST_ROOT);

  await map(CP_FILES, async (filePath) => {
    const sourcePath = resolve(ROOT_DIR, filePath);
    const distPath = resolve(DIST_ROOT, filePath);
    const isExists = await pathExists(sourcePath);
    if (isExists) {
      await ensureDir(dirname(distPath));
      await copyFile(sourcePath, distPath);
    }
  });

  await genReleasePackages();
}

/**
 * 打包
 */
export default async function build() {
  const begin = Date.now();
  const spinner = ora().start();
  async function log<T>(promise: Promise<T>, message: string) {
    spinner.text = `${message}\t`;
    try {
      return await promise;
    } catch (e) {
      spinner.fail(message);
      throw e;
    }
  }
  try {
    await log(cleanDist(), '清空 dist 目录');
    await log(buildEs6AndTypes(), '打包步骤1：ts -> es, types');
    await log(buildEsm(), '打包步骤2：es -> esm');
    await log(buildCommonjs(), '打包步骤3：esm -> commonjs');
    await log(copyFiles(), '打包步骤4：拷贝其他文件');
    spinner.succeed(`打包完成，用时 ${chalk.green(`${Date.now() - begin}ms`)}`);
    console.log('');
    console.log(`打包文件放在${chalk.green('dist')}目录中。`);
  } catch {
    console.error('打包失败');
    process.exit(1);
  }
}
