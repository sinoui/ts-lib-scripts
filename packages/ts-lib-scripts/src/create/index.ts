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
import { resolveRoot } from '../config/paths';
import isCmdInstalled from './isCmdInstalled';
import createGitRepository from './createGitRepository';
import gitCommit from './gitCommit';
import installDeps from './installDeps';

import execa = require('execa');

/**
 * 创建项目
 *
 * @param projectName 项目名称
 * @param program 命令行对象
 */
export default async function create(
  projectNameConfig: string,
  program: Command,
) {
  const projectName = projectNameConfig.startsWith('@')
    ? projectNameConfig.substr(projectNameConfig.indexOf('/') + 1)
    : projectNameConfig;
  const packageName = (program.packageName || projectNameConfig) as string;

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

  const projectPath = resolveRoot(options.projectName);
  const gitCreated = createGitRepository(projectPath);

  await installDeps(spinner, options);

  if (gitCreated) {
    try {
      gitCommit(projectPath);
    } catch (error) {
      // 忽略git提交失败
    }
  }

  if (isCmdInstalled('code')) {
    console.log();
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
