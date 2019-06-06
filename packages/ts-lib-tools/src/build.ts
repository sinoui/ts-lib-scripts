import util from 'util';
import { writeFile, readFile } from 'fs';
import { mkdirp, remove } from 'fs-extra';
import execa from 'execa';
import { resolve } from 'path';
import { rollup } from 'rollup';
import { safePackageName } from 'ts-lib-scripts-utils';
import { createRollupOptions } from './config/create-rollup-options';
import logError from './logError';
import { rootPath, getAppPackageInfo, DIST_PATH } from './config/paths';
import { flatMap } from './utils';
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

  await mkdirp(outDir);
  await util.promisify(writeFile)(
    resolve(outDir, 'index.js'),
    content.replace(
      /\{packageName\}/g,
      safePackageName(getAppPackageInfo().name),
    ),
  );
}

/**
 * 生成.d.ts文件
 *
 * @export
 */
export async function createTsDeclarationFiles(buildOptions: BuildOptions) {
  await execa(
    'yarn',
    [
      'tsc',
      '-d',
      '--emitDeclarationOnly',
      '--skipLibCheck',
      '--declarationDir',
      buildOptions.outDir,
    ].filter(Boolean),
    {
      cwd: rootPath,
    },
  );
}

/**
 *  清除打包文件存放目录dist
 */
export async function clean() {
  await remove(DIST_PATH);
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
    await logger(clean(), '清除dist');
    await logger(
      createTsDeclarationFiles(buildOptions),
      '使用tsc生成.d.ts文件',
    );
    await logger(
      createCjsIndexFile(buildOptions.outDir),
      '生成dist/index.js文件(cjs入口文件)',
    );

    const buildPromise = Promise.all(
      flatMap(formats, (formatMode) =>
        envs.map((env) => createRollupOptions(formatMode, env, buildOptions)),
      ).map(async ([inputOptions, outputOptions]) => {
        const bundle = await rollup(inputOptions);
        await bundle.write(outputOptions);
      }),
    );

    await logger(buildPromise, '使用rollup编译js文件');
  } catch (error) {
    logError(error);
    process.exit(1);
  }
}
