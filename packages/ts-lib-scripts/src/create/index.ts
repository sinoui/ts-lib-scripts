/* eslint-disable @typescript-eslint/no-require-imports */
import chalk from 'chalk';
import { prompt as promptInConsole } from 'enquirer';
import execa from 'execa';
import ora from 'ora';
import { logError } from 'ts-lib-scripts-utils';

import { resolveRoot } from '../config/paths';
import createGitRepository from './createGitRepository';
import genMonorepoProject from './genMonorepoProject';
import { genProject } from './genProject';
import { getOptions } from './getOptions';
import gitCommit from './gitCommit';
import initHusky from './init-husky';
import installDeps from './installDeps';
import isCmdInstalled from './isCmdInstalled';
import { validatePackageName } from './validatePackageName';

/**
 * 创建项目
 *
 * @param projectNameConfig 配置名称配置
 * @param program 命令行对象
 */
export default async function create(
  projectNameConfig: string,
  program: Record<string, string | boolean>,
): Promise<void> {
  const projectName = projectNameConfig.startsWith('@')
    ? projectNameConfig.substr(projectNameConfig.indexOf('/') + 1)
    : projectNameConfig;
  const packageName = (program.packageName || projectNameConfig) as string;

  if (!validatePackageName(packageName)) {
    process.exit(1);
  }

  const options = await getOptions(projectName, packageName, program);

  if (packageName.startsWith('@') && !options.npmScope && options.monorepo) {
    console.error(
      `monorepo模式时，项目，项目名称不能以@开头。现在是：${packageName}`,
    );
    return;
  }

  const spinner = ora().start();
  spinner.start('正在生成项目...');
  try {
    if (options.monorepo) {
      await genMonorepoProject(options);
    } else {
      await genProject(options);
    }
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
      await initHusky(spinner, options.projectName);
      gitCommit(projectPath);
    } catch (error) {
      // 忽略git提交失败
    }
  }

  if (await isCmdInstalled('code')) {
    console.log();
    const { openWithCode } = await promptInConsole<any>({
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
