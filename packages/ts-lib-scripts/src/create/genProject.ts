/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { pathExists, copy, readJSON, outputJSON } from 'fs-extra';
import chalk from 'chalk';
import { resolve } from 'path';
import { safePackageName } from 'ts-lib-scripts-utils';
import {
  resolveRoot,
  TEMPLATE_PATH,
  REACT_TEMPLATE_PATH,
  COMMON_TEMPLATE_PATH,
  GIT_IGNORE_FILE_PATH,
} from '../config/paths';
import genDoczFiles from './genDoczFiles';
import updateREADMEFile from './fns/updateREADMEFile';
import genLicenseFile from './fns/updateLicense';

/**
 * 生成package.json文件
 *
 * @param projectPath 项目路径
 * @param options 配置
 */
export async function genPackageFile(
  projectPath: string,
  options: CreateOptions,
) {
  const packagePath = resolve(projectPath, 'package.json');
  const packageInfo = await readJSON(packagePath);
  packageInfo.version = options.packageVersion;
  packageInfo.name = options.packageName;
  packageInfo.description = options.packageDescription;
  packageInfo.files = ['dist', 'assets'];
  packageInfo['umd:main'] = `dist/${safePackageName(
    options.packageName,
  )}.umd.production.js`;
  packageInfo.module = `dist/${safePackageName(options.packageName)}.esm.js`;

  await outputJSON(packagePath, packageInfo, {
    spaces: 2,
  });
}

/**
 * 生成项目
 *
 * @param options 配置
 */
export async function genProject(options: CreateOptions) {
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
  await copy(options.react ? REACT_TEMPLATE_PATH : TEMPLATE_PATH, projectPath);
  await copy(GIT_IGNORE_FILE_PATH, resolve(projectPath, '.gitignore'));

  await genPackageFile(projectPath, options);
  await updateREADMEFile(projectPath, options);
  await genLicenseFile(projectPath, options);

  if (options.docz) {
    await genDoczFiles(projectPath, options);
  }
}
