import ora from 'ora';
import { getInstallDepsCmd, getInstallCmd } from 'ts-lib-scripts-utils';
import {
  dependenciesMessage,
  successMessage,
  failureMessage,
} from './messages';
import {
  dependencies,
  devDependencies,
  devDependenciesForReact,
  devDependenciesForDocz,
  devDependenciesForGhpages,
  monorepoDevDependencies,
} from './constants';
import { resolveRoot } from '../config/paths';

import execa = require('execa');

function getDevPendencies(options: CreateOptions) {
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
 */
async function execInstallDeps(
  projectName: string,
  deps: string[],
  isDev = false,
  monorepo = false,
) {
  const cmd = getInstallCmd();
  const args = [
    cmd === 'npm' ? 'i' : 'add',
    ...deps,
    isDev ? '--dev' : '',
    cmd === 'npm' ? '--save' : '',
    monorepo ? '-W' : '',
  ].filter(Boolean);
  await execa(cmd, args, {
    cwd: resolveRoot(projectName),
  });
}

/**
 * 安装依赖
 *
 * @param {CreateOptions} options
 */
async function installDeps(spinner: ora.Ora, options: CreateOptions) {
  const { projectName } = options;
  const devDeps = getDevPendencies(options);
  spinner.start(dependenciesMessage(dependencies, devDeps));
  try {
    await execInstallDeps(projectName, dependencies, false, true);
    await execInstallDeps(projectName, devDeps, true, true);
    spinner.succeed('安装依赖包');
    successMessage(getInstallCmd(), projectName);
  } catch (error) {
    spinner.fail(`安装依赖失败`);
    failureMessage([
      getInstallDepsCmd(dependencies),
      getInstallDepsCmd(devDeps, true),
    ]);
    process.exit(1);
  }
}

export default installDeps;
