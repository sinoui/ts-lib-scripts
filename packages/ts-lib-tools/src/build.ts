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
  pathExistsSync,
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
import prettier from 'prettier';
import { createRollupOptions } from './config/create-rollup-options';
import {
  getAppPackageInfo,
  DIST_PATH,
  resolveRoot,
  ASSETS_PATH,
  getMonoRootPath,
  rootPath,
} from './config/paths';
import { flatMap } from './utils';
import upgradePakageModule from './upgradePackageModule';
import simpleBuild from './simple-build';
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
 * 确保生成 ts 类型的临时文件在 gitignore 中
 */
async function ensureGitignoreForTsBuildInfoAndTypes() {
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
async function ensurePackageTypesEntry() {
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
async function ensureNpmIgnore() {
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
async function compileDeclarationFiles() {
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
async function mvDeclarationFiles() {
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

async function isSkipTsc() {
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
 * @export
 * @param {BuildOptions} buildOptions 构建命令参数
 */
export async function runBuild(buildOptions: BuildOptions) {
  const formats: FormatMode[] = buildOptions.format;
  const envs: Env[] = ['production', 'development'];

  if (buildOptions.simple) {
    await simpleBuild();
    return;
  }

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
          const bundle = await rollup(inputOptions);
          await bundle.write(outputOptions);
        });
      }),
  );

  await logger(buildPromise, '使用rollup编译js文件');

  await mvDeclarationFiles();
}
