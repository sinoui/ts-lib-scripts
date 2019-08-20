import util from 'util';
import { writeFile, readFile } from 'fs';
import { mkdirp, remove, copy, readJSON, move, pathExists, readdir } from 'fs-extra';
import { resolve, join } from 'path';
import { rollup } from 'rollup';
import { safePackageName } from 'ts-lib-scripts-utils';
import globby from 'globby';
import { createRollupOptions } from './config/create-rollup-options';
import logError from './logError';
import { getAppPackageInfo, DIST_PATH, resolveRoot } from './config/paths';
import { flatMap } from './utils';
import upgradePakageModule from './upgradePackageModule';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const createLogger = require('progress-estimator');

const logger = createLogger({
  storagePath: resolve(__dirname, '.progress-estimator'),
});

/**
 * 创建index.js文件
 *
 * @param {string} outDir 输出目录
 *
 * @export
 */
export async function createCjsIndexFile(outDir: string) {
  const content = await util.promisify(readFile)(
    resolve(__dirname, '../assets/index.js.tpl'),
    'utf-8',
  );

  try {
    await mkdirp(outDir);
  } catch (e) {
    try {
      await mkdirp(outDir);
    } catch (e2) {
      console.error(`创建${outDir}目录失败`, e);
      throw e2;
    }
  }
  
  await util.promisify(writeFile)(
    resolve(outDir, 'index.js'),
    content.replace(
      /\{packageName\}/g,
      safePackageName(getAppPackageInfo().name),
    ),
  );
}

/**
 *  清除打包文件存放目录dist
 */
export async function clean() {
  try {
    await remove(DIST_PATH);
  } catch (e) {
    try {
      await remove(DIST_PATH);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('清除文件夹失败', error);
    }
  }
}

function nextTick<T>(callback: () => Promise<T>): Promise<T> {
  return new Promise<T>((resolveFn, reject) => {
    setTimeout(async () => {
      try {
        const result = await callback();
        resolveFn(result);
      } catch (e) {
        reject(e);
      }
    });
  });
}

/**
 * 拷贝ts声明文件
 *
 */
async function copyDeclarationFiles() {
  const declarationFiles = await globby('src/**/*.d.ts');
  await Promise.all(
    declarationFiles.map(async (filePath) => {
      await copy(
        resolveRoot(filePath),
        resolveRoot(filePath.replace('src/', 'dist/')),
      );
    }),
  );
}

/**
 * 移动.d.ts到dist根目录下
 */
async function mvDeclarationFiles() {
  const pacakgeInfo = await readJSON(resolveRoot('package.json'));
  const moduleName = pacakgeInfo.name.replace(/^@.+?\//, '');

  const from = resolveRoot(`dist/${moduleName}/src/`);
  const to = resolveRoot(`dist/`);
  const isExists = await pathExists(from);

  if (isExists) {
    const files = await readdir(from);
    await Promise.all(files.map(file => move(join(from, file), join(to, file))));
    await remove(resolveRoot(`dist/${moduleName}`));
  }
}

/**
 * 运行编译命令
 *
 * @export
 * @param {BuildOptions} buildOptions 构建命令参数
 */
export async function runBuild(buildOptions: BuildOptions) {
  const formats: FormatMode[] = buildOptions.format;
  const envs: Env[] = ['production', 'development'];

  try {
    await upgradePakageModule();
    await logger(clean(), '清除dist');
    await logger(
      createCjsIndexFile(buildOptions.outDir),
      '生成dist/index.js文件(cjs入口文件)',
    );

    const buildTargets = flatMap(formats, formatMode => envs.map(env => [formatMode, env] as [FormatMode, Env]))
      .filter(([formatMode, env]) => !(formatMode === 'es' && env === 'production'));

    const buildPromise = Promise.all(
      buildTargets.map(([formatMode, env]) => createRollupOptions(formatMode, env, buildOptions)
      ).map(async ([inputOptions, outputOptions]) => {
        await nextTick(async () => {
          const bundle = await rollup(inputOptions);
          await bundle.write(outputOptions);
        });
      }),
    );

    await logger(buildPromise, '使用rollup编译js文件');

    await mvDeclarationFiles();

    await logger(copyDeclarationFiles(), '拷贝src中的ts声明文件');
  } catch (error) {
    logError(error);
    process.exit(1);
  }
}
