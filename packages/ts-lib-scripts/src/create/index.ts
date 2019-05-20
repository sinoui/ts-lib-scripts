/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import chalk from 'chalk';
import ora from 'ora';
import { Command } from 'commander';
import { prompt } from 'enquirer';
import { logError } from 'ts-lib-scripts-utils';
import { validatePackageName } from './validatePackageName';
import { getOptions } from './getOptions';
import { genProject } from './genProject';
import getInstallCmd from './getInstallCmd';
import {
  failureMessage,
  successMessage,
  dependenciesMessage,
} from './messages';
import { dependencies, devDependencies } from './constants';
import { resolveRoot } from '../config/paths';
import initGitRepository from './initGitRepository';
import getInstallDepsCmd from './getInstallDepsCmd';
import isCmdInstalled from './isCmdInstalled';

import execa = require('execa');

/**
 * 创建项目
 *
 * @param projectName 项目名称
 * @param program 命令行对象
 */
export default async function create(projectName: string, program: Command) {
  const packageName = (program.packageName || projectName) as string;

  if (!validatePackageName(packageName)) {
    process.exit(1);
  }

  const options = await getOptions(projectName, packageName, program);

  const spinner = ora().start();
  spinner.start('正在生成项目...');
  try {
    await genProject(options);
    spinner.succeed(`已生成项目 ${chalk.green(packageName)}`);
  } catch (error) {
    spinner.fail('生成项目失败');
    logError(error);
    process.exit(1);
  }

  spinner.start(dependenciesMessage(dependencies, devDependencies));
  try {
    await execa(getInstallDepsCmd(dependencies), {
      cwd: resolveRoot(projectName),
    });
    await execa(getInstallDepsCmd(devDependencies, true), {
      cwd: resolveRoot(projectName),
    });
    spinner.succeed('安装依赖包');
    successMessage(getInstallCmd(), projectName);
  } catch (error) {
    spinner.fail(`安装依赖失败`);
    failureMessage([
      getInstallDepsCmd(dependencies),
      getInstallDepsCmd(devDependencies, true),
    ]);
    process.exit(1);
  }

  spinner.start('初始化git');
  try {
    if (initGitRepository(resolveRoot(options.projectName))) {
      spinner.succeed('初始化git成功');
    } else {
      spinner.stop();
      console.log(
        '提示：您没有安装git或者项目已经在git仓库中，无法为您的项目初始化git。',
      );
    }
  } catch (error) {
    spinner.fail('初始化git失败');

    logError(error);
    process.exit(1);
  }

  if (isCmdInstalled('code')) {
    const { openWithCode } = await prompt({
      type: 'confirm',
      name: 'openWithCode',
      message: '使用vscode打开项目？',
      initial: 'Y',
    });

    if (openWithCode) {
      await execa('code', [projectName]);
    }
  }

  process.exit(0);
}
