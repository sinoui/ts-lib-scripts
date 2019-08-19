/* eslint-disable no-console */
import { pathExists, copy, readJSON, outputJSON, remove } from 'fs-extra';
import chalk from 'chalk';
import { resolve } from 'path';
import {
  resolveRoot,
  MONOREPO_TEMPLATE_PATH,
  GIT_IGNORE_FILE_PATH,
  COMMON_TEMPLATE_PATH,
} from '../config/paths';
import updateREADMEFile from './fns/updateREADMEFile';
import genLicenseFile from './fns/updateLicense';
import genDoczFiles from './genDoczFiles';

/**
 * 更新模块配置信息
 *
 * @param {string} projectPath
 * @param {CreateOptions} options
 */
async function updatePackageInfo(projectPath: string, options: CreateOptions) {
  const packagePath = resolve(projectPath, 'package.json');
  const packageInfo = await readJSON(packagePath);
  packageInfo.version = options.packageVersion;
  packageInfo.name = options.packageName;
  packageInfo.description = options.packageDescription;

  await outputJSON(packagePath, packageInfo, {
    spaces: 2,
  });
}

/**
 * 更新项目配置
 *
 * @param {string} projectPath
 * @param {CreateOptions} options
 */
async function updateProjectConfig(
  projectPath: string,
  options: CreateOptions,
) {
  const configPath = resolve(projectPath, 'ts-lib.config.json');
  const projectConfig = await readJSON(configPath);
  projectConfig.npmScope = options.npmScope || options.packageName;

  await outputJSON(configPath, projectConfig, {
    spaces: 2,
  });
}

/**
 * 更新tsconfig配置
 *
 * @param {string} projectPath
 * @param {CreateOptions} options
 */
async function updateTsConfig(projectPath: string, options: CreateOptions) {
  const tsconfigPath = resolve(projectPath, 'tsconfig.json');
  const tsconfig = await readJSON(tsconfigPath);

  tsconfig.compilerOptions.paths = {
    [`@${options.npmScope || options.packageName}/*`]: ['packages/*/src'],
  };

  await outputJSON(tsconfigPath, tsconfig, {
    spaces: 2,
  });
}

/**
 * 生成monorepo模式的项目
 *
 * @param {CreateOptions} options
 */
async function genMonorepoProject(options: CreateOptions) {
  const projectPath = resolveRoot(options.projectName);
  const exists = await pathExists(projectPath);

  if (exists) {
    console.error(
      chalk.red(
        `已经存在${options.projectName}文件夹，请选择一个新的项目名称。`,
      ),
    );

    process.exit(1);
  }

  await copy(COMMON_TEMPLATE_PATH, projectPath);
  await copy(MONOREPO_TEMPLATE_PATH, projectPath);
  await copy(GIT_IGNORE_FILE_PATH, resolve(projectPath, '.gitignore'));
  await updatePackageInfo(projectPath, options);
  await updateProjectConfig(projectPath, options);
  await updateREADMEFile(projectPath, options);
  await genLicenseFile(projectPath, options);
  await updateTsConfig(projectPath, options);
  await remove(resolve(projectPath, 'src'));

  if (options.docz) {
    await genDoczFiles(projectPath, options);
    await remove(resolve(projectPath, 'docs/Counter.mdx'));
  }
}

export default genMonorepoProject;
