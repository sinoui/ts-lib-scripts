/* eslint-disable @typescript-eslint/no-require-imports */
import execa from 'execa';
import type { Ora } from 'ora';
import {
  getInstallCmd,
  getInstallDepsCmd,
  logError,
} from 'ts-lib-scripts-utils';

import { resolveRoot } from '../config/paths';
import {
  dependencies,
  devDependencies,
  devDependenciesForDocz,
  devDependenciesForGhpages,
  devDependenciesForReact,
  monorepoDevDependencies,
} from './constants';
import {
  dependenciesMessage,
  failureMessage,
  successMessage,
} from './messages';

/**
 * 获取开发依赖
 *
 * @param options 配置项
 */
function getDevPendencies(options: CreateOptions): string[] {
  return [
    ...devDependencies,
    ...(options.react ? devDependenciesForReact : []),
    ...(options.docz ? devDependenciesForDocz : []),
    ...(options.doczGithubPages ? devDependenciesForGhpages : []),
    ...(options.monorepo ? monorepoDevDependencies : []),
  ];
}

/**
 * 执行安装依赖的命令
 *
 * @param projectName 项目名称
 * @param deps 依赖
 * @param isDev 是否是开发依赖
 * @param monorepo 是否是 monorepo 模式
 */
async function execInstallDeps(
  projectName: string,
  deps: string[],
  isDev = false,
  monorepo = false,
): Promise<void> {
  const cmd = getInstallCmd();
  const args = [
    cmd === 'npm' ? 'i' : 'add',
    ...deps,
    isDev ? '--dev' : '',
    cmd === 'npm' ? '--save' : '',
    cmd === 'yarn' && monorepo ? '-W' : '',
    '--ignore-scripts',
  ].filter(Boolean);
  await execa(cmd, args, {
    cwd: resolveRoot(projectName),
  });
}

/**
 * 安装依赖
 *
 * @param spinner 进度条
 * @param options 配置
 */
async function installDeps(
  spinner: Ora,
  options: CreateOptions,
): Promise<void> {
  const { projectName, monorepo } = options;
  const devDeps = getDevPendencies(options);
  spinner.start(dependenciesMessage(dependencies, devDeps));
  try {
    await execInstallDeps(projectName, devDeps, true, !!monorepo);
    await execInstallDeps(projectName, dependencies, false, !!monorepo);
    spinner.succeed('安装依赖包');
    successMessage(getInstallCmd(), projectName);
  } catch (error) {
    logError(error);
    spinner.fail(`安装依赖失败`);
    failureMessage([
      getInstallDepsCmd(dependencies, false, !!monorepo),
      getInstallDepsCmd(devDeps, true, !!monorepo),
    ]);
    process.exit(1);
  }
}

export default installDeps;
