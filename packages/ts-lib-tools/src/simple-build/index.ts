/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable global-require */
import type { TransformOptions } from '@babel/core';
import { transformAsync } from '@babel/core';
import { map, mapLimit } from 'async';
import chalk from 'chalk';
import execa from 'execa';
import {
  copy,
  copyFile,
  ensureDir,
  pathExists,
  readFile,
  remove,
  writeFile,
} from 'fs-extra';
import globby from 'globby';
import ora from 'ora';
import { basename, dirname, resolve } from 'path';

import {
  BUILD_COMMONJS_CACHE_PATH,
  BUILD_ESM_CACHE_PATH,
  CP_FILES,
  cpuCount,
  DIST_PATH_ES,
  DIST_PATH_ESM,
  DIST_ROOT,
  ES6_CACHE_PATH,
  ROOT_DIR,
  SIMPLE_BUILD_TS_CONFIG_FILE,
  SIMPLE_BUILD_TS_CONFIG_TEMPLATE,
  SRC_ROOT,
  TYPES_CACHE_PATH,
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
async function cleanDist(): Promise<void> {
  await remove(DIST_ROOT);
}

/**
 * 确保 tsconfig.json 文件存在
 */
async function ensureTsconfig(): Promise<void> {
  const targetPath = resolve(ROOT_DIR, SIMPLE_BUILD_TS_CONFIG_FILE);
  const isExists = await pathExists(targetPath);

  if (!isExists) {
    await copy(SIMPLE_BUILD_TS_CONFIG_TEMPLATE, targetPath);
  }
}

/**
 * ts -> es and types
 */
async function buildEs6AndTypes(): Promise<void> {
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
 * @param cache 文件缓存
 */
async function buildByBabel(
  from: string,
  to: string,
  opts: TransformOptions,
  cache: FileCache,
): Promise<void> {
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
async function buildEsm(): Promise<void> {
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
async function buildCommonjs(): Promise<void> {
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
async function copyFiles(): Promise<void> {
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

  const copyToDist = async (distPath: string): Promise<void> => {
    await mapLimit(files, 10, async (filePath: string) => {
      await ensureDir(dirname(resolve(distPath, filePath)));
      await copyFile(resolve(SRC_ROOT, filePath), resolve(distPath, filePath));
    });
  };

  await copyToDist(DIST_PATH_ES);
  await copyToDist(DIST_PATH_ESM);
  await copyToDist(DIST_ROOT);

  await map(CP_FILES, async (filePath: string) => {
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
export default async function build(): Promise<void> {
  const begin = Date.now();
  const spinner = ora().start();
  /**
   * @param promise promise
   * @param message 消息
   */
  async function log<T>(promise: Promise<T>, message: string): Promise<T> {
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
