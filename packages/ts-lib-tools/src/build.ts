import {
  writeFile,
  readFile,
  mkdirp,
  remove,
  copy,
  readJSON,
  move,
  pathExists,
  readdir,
} from 'fs-extra';
import { resolve, join } from 'path';
import { rollup } from 'rollup';
import {
  safePackageName,
  getInstallCmd,
  isInMonorepo,
} from 'ts-lib-scripts-utils';
import globby from 'globby';
import execa from 'execa';
import { createRollupOptions } from './config/create-rollup-options';
import logError from './logError';
import {
  getAppPackageInfo,
  DIST_PATH,
  resolveRoot,
  ASSETS_PATH,
} from './config/paths';
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
  const content = await readFile(
    resolve(__dirname, '../assets/index.js.tpl'),
    'utf-8',
  );

  await mkdirp(outDir);

  await writeFile(
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
  await remove(DIST_PATH);
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
 * 确保有 tsconfig.release.json
 */
async function ensureReleaseTsConfig(templateFilePath: string) {
  const releaseTsConfigPath = resolve(process.cwd(), 'tsconfig.release.json');
  const isFileExists = await pathExists(releaseTsConfigPath);

  if (!isFileExists) {
    copy(templateFilePath, releaseTsConfigPath);
  }
}

/**
 * 确保有 tsconfig.release.json
 */
async function ensureModuleReleaseTsConfig() {
  const isIn = await isInMonorepo();
  if (isIn) {
    ensureReleaseTsConfig(
      resolve(ASSETS_PATH, 'module-template/tsconfig.release.json'),
    );
  } else {
    ensureReleaseTsConfig(resolve(ASSETS_PATH, 'tsconfig.release.json'));
  }
}

/**
 * 编译出.d.ts文件
 */
async function compileDeclarationFiles() {
  await ensureModuleReleaseTsConfig();

  const cmd = `${getInstallCmd()} tsc --build tsconfig.release.json`;
  await execa(cmd);
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
    await Promise.all(
      files.map((file) => move(join(from, file), join(to, file))),
    );
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
    await logger(compileDeclarationFiles(), '编译生成.d.ts');
    await logger(copyDeclarationFiles(), '拷贝src中的ts声明文件');
    await logger(
      createCjsIndexFile(buildOptions.outDir),
      '生成dist/index.js文件(cjs入口文件)',
    );

    const buildTargets = flatMap(formats, (formatMode) =>
      envs.map((env) => [formatMode, env] as [FormatMode, Env]),
    ).filter(
      ([formatMode, env]) => !(formatMode === 'es' && env === 'production'),
    );

    const buildPromise = Promise.all(
      buildTargets
        .map(([formatMode, env]) =>
          createRollupOptions(formatMode, env, buildOptions),
        )
        .map(async ([inputOptions, outputOptions]) => {
          await nextTick(async () => {
            const bundle = await rollup(inputOptions);
            await bundle.write(outputOptions);
          });
        }),
    );

    await logger(buildPromise, '使用rollup编译js文件');

    await mvDeclarationFiles();
  } catch (error) {
    logError(error);
    process.exit(1);
  }
}
