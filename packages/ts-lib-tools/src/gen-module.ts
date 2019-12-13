/* eslint-disable no-console */
import { pathExists, readJSON, copy, outputJSON, move } from 'fs-extra';
import { resolve } from 'path';
import { safePackageName } from 'ts-lib-scripts-utils';
import chalk from 'chalk';
import { resolveRoot, MODULE_TEMPLATE_PATH } from './config/paths';

import execa = require('execa');
import ora = require('ora');

/**
 * 生成许可证文件
 *
 * @param modulePath 模块路径
 */
async function genLicenseFile(modulePath: string) {
  const isExists = await pathExists(resolveRoot('LICENSE'));
  if (isExists) {
    await copy(resolveRoot('LICENSE'), resolve(modulePath, 'LICENSE'));
  }
}

/**
 * 生成.gitignore
 *
 * @param modulePath 模块路径
 */
async function genNpmignoreFile(modulePath: string) {
  await move(
    resolve(modulePath, 'npmignore'),
    resolve(modulePath, '.npmignore'),
  );
}

/**
 * 生成模块
 *
 * @param {string} moduleName
 * @returns
 */
async function genModule(moduleName: string) {
  const modulePath = resolveRoot(`./packages/${moduleName}`);

  const isExists = await pathExists(modulePath);

  if (isExists) {
    console.error(chalk.red(`${moduleName}模块已经存在，不能重复创建。`));
    return;
  }

  const spinner = ora().start();
  spinner.start(`正在生成模块${chalk.green(moduleName)}...`);

  await copy(MODULE_TEMPLATE_PATH, modulePath);

  // 更新package.json
  const packageInfo = await readJSON(resolve(modulePath, 'package.json'));
  const { version = '0.1.0' } = await readJSON(resolveRoot('lerna.json'));
  const { devDependencies, license = 'MIT' } = await readJSON(
    resolveRoot('package.json'),
  );
  const { npmScope } = await readJSON(resolveRoot('ts-lib.config.json'));
  const name = `@${npmScope}/${moduleName}`;
  packageInfo.name = name;
  packageInfo.version = version;
  packageInfo.devDependencies['ts-lib-tools'] = devDependencies['ts-lib-tools'];
  packageInfo.devDependencies.typescript = devDependencies.typescript;
  packageInfo['umd:main'] = `dist/${safePackageName(name)}.umd.production.js`;
  packageInfo.module = `dist/${safePackageName(name)}.esm.js`;
  packageInfo.license = license;
  await outputJSON(resolve(modulePath, 'package.json'), packageInfo, {
    spaces: 2,
  });

  await genLicenseFile(modulePath);
  await genNpmignoreFile(modulePath);

  spinner.succeed(`已生成模块 ${chalk.green(moduleName)}`);

  spinner.start('执行yarn');
  // 执行yarn
  await execa('yarn', undefined, {
    cwd: modulePath,
  });
  spinner.succeed('执行yarn');

  console.log(chalk.green(`模块${moduleName}已生成。`));
}

export default genModule;
