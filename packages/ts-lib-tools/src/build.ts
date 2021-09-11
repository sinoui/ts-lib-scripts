/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import execa from 'execa';
import {
  copy,
  mkdirp,
  move,
  pathExists,
  pathExistsSync,
  readdir,
  readFile,
  readJSON,
  remove,
  writeFile,
} from 'fs-extra';
import { globby } from 'globby';
import { join, resolve } from 'path';
import prettier from 'prettier';
import { rollup } from 'rollup';
import {
  getInstallCmd,
  isInMonorepo,
  safePackageName,
} from 'ts-lib-scripts-utils';

import { createRollupOptions } from './config/create-rollup-options';
import {
  ASSETS_PATH,
  DIST_PATH,
  getAppPackageInfo,
  getMonoRootPath,
  resolveRoot,
  rootPath,
} from './config/paths';
import simpleBuild from './simple-build';
import upgradePakageModule from './upgradePackageModule';
import { flatMap } from './utils';

const createLogger = require('progress-estimator');

const logger = createLogger({
  storagePath: resolve(__dirname, '.progress-estimator'),
});

/**
 * 创建index.js文件
 *
 * @param {string} outDir 输出目录
 */
export async function createCjsIndexFile(outDir: string): Promise<void> {
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
export async function clean(): Promise<void> {
  await remove(DIST_PATH);
}

/**
 * @param callback 回调函数
 */
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
async function copyDeclarationFiles(): Promise<void> {
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
 *
 * @param templateFilePath 模板文件路径
 */
async function ensureReleaseTsConfig(templateFilePath: string): Promise<void> {
  const releaseTsConfigPath = resolve(process.cwd(), 'tsconfig.release.json');
  const isFileExists = await pathExists(releaseTsConfigPath);

  if (!isFileExists) {
    copy(templateFilePath, releaseTsConfigPath);
  }
}

/**
 * 确保有 tsconfig.release.json
 */
async function ensureModuleReleaseTsConfig(): Promise<void> {
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
 * 确保生成 ts 类型的临时文件在 gitignore 中
 */
async function ensureGitignoreForTsBuildInfoAndTypes(): Promise<void> {
  const isIn = await isInMonorepo();
  const pkgPath = isIn ? await getMonoRootPath() : rootPath;
  const gitignorePath = resolve(pkgPath, '.gitignore');
  if (pathExistsSync(gitignorePath)) {
    let content = await readFile(gitignorePath, 'utf-8');
    let isNeedUpdate = false;
    if (!content.includes('*.tsbuildinfo')) {
      content = content.replace('tsconfig.tsbuildinfo', '*.tsbuildinfo');
      isNeedUpdate = true;
    }
    if (!content.includes('types')) {
      content = content.replace('dist', 'dist\ntypes');
      isNeedUpdate = true;
    }
    if (isNeedUpdate) {
      await writeFile(gitignorePath, content);
    }
  }
}

/**
 * 确保包的类型入口文件正确性
 */
async function ensurePackageTypesEntry(): Promise<void> {
  const pkg = await readJSON(resolveRoot('package.json'));
  const isNeedUpdate = pkg.types !== 'types/index.d.ts' || pkg.files;

  if (isNeedUpdate) {
    delete pkg.typings;
    delete pkg.files;
    pkg.types = 'types/index.d.ts';
  }

  await writeFile(
    resolveRoot('package.json'),
    prettier.format(JSON.stringify(pkg), {
      parser: 'json',
    }),
  );
}

/**
 * 确保 .npmignore 文件存在
 */
async function ensureNpmIgnore(): Promise<void> {
  const npmIgnorePath = resolveRoot('.npmignore');
  const isExists = await pathExists(npmIgnorePath);

  if (!isExists) {
    await copy(
      resolve(ASSETS_PATH, 'module-template', 'npmignore'),
      npmIgnorePath,
    );
  }
}

/**
 * 编译出.d.ts文件
 */
async function compileDeclarationFiles(): Promise<void> {
  await ensureModuleReleaseTsConfig();
  await ensureGitignoreForTsBuildInfoAndTypes();
  await ensurePackageTypesEntry();
  await ensureNpmIgnore();

  await execa(getInstallCmd(), ['tsc', '--build', 'tsconfig.release.json'], {
    stdio: 'inherit',
  });
}

/**
 * 移动.d.ts到dist根目录下
 */
async function mvDeclarationFiles(): Promise<void> {
  const pacakgeInfo = await readJSON(resolveRoot('package.json'));
  const moduleName = pacakgeInfo.name.replace(/^@.+?\//, '');

  const from = resolveRoot(`dist/${moduleName}/src/`);
  const to = resolveRoot(`types/`);
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
 *
 */
async function isSkipTsc(): Promise<boolean> {
  const isIn = await isInMonorepo();
  let configPath = resolveRoot('ts-lib.config.json');
  if (isIn) {
    configPath = resolve(await getMonoRootPath(), 'ts-lib.config.json');
  }
  const isExists = await pathExists(configPath);
  if (isExists) {
    const content = await readJSON(configPath);

    return !!content.skipTsc;
  }

  return false;
}

/**
 * 运行编译命令
 *
 * @param buildOptions 构建命令参数
 */
export async function runBuild(buildOptions: BuildOptions): Promise<void> {
  const formats: FormatMode[] = buildOptions.format;
  const envs: Env[] = ['production', 'development'];

  if (buildOptions.simple) {
    await simpleBuild();
    return;
  }

  try {
    await upgradePakageModule();
    await logger(clean(), '清除dist');

    const skipTsc = await isSkipTsc();
    if (!skipTsc && !buildOptions.skipTsc) {
      await logger(compileDeclarationFiles(), '编译生成.d.ts');
    }

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
            try {
              const bundle = await rollup(inputOptions);
              await bundle.write(outputOptions);
            } catch (e) {
              console.error(e);
              throw e;
            }
          });
        }),
    );

    await logger(buildPromise, '使用rollup编译js文件');

    await mvDeclarationFiles();
  } catch (e) {
    console.log('打包失败');
    console.error(e);
    process.exit(1);
  }
}
