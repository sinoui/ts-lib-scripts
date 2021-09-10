/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import chalk from 'chalk';
import { copy, outputJSON, pathExists, readJSON } from 'fs-extra';
import { resolve } from 'path';
import { safePackageName } from 'ts-lib-scripts-utils';

import {
  COMMON_TEMPLATE_PATH,
  GIT_IGNORE_FILE_PATH,
  NPM_IGNORE_FILE_PATH,
  REACT_TEMPLATE_PATH,
  resolveRoot,
  TEMPLATE_PATH,
} from '../config/paths';
import genLicenseFile from './fns/updateLicense';
import updateREADMEFile from './fns/updateREADMEFile';
import genDoczFiles from './genDoczFiles';

/**
 * 生成package.json文件
 *
 * @param projectPath 项目路径
 * @param options 配置
 */
export async function genPackageFile(
  projectPath: string,
  options: CreateOptions,
): Promise<void> {
  const packagePath = resolve(projectPath, 'package.json');
  const packageInfo = await readJSON(packagePath);
  packageInfo.version = options.packageVersion;
  packageInfo.name = options.packageName;
  packageInfo.description = options.packageDescription;
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
export async function genProject(options: CreateOptions): Promise<void> {
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
  await copy(NPM_IGNORE_FILE_PATH, resolve(projectPath, '.npmignore'));

  await genPackageFile(projectPath, options);
  await updateREADMEFile(projectPath, options);
  await genLicenseFile(projectPath, options);

  if (options.docz) {
    await genDoczFiles(projectPath, options);
  }
}
