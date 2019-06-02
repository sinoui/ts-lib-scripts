import ora from 'ora';
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
} from './constants';
import getInstallDepsCmd from './getInstallDepsCmd';
import { resolveRoot } from '../config/paths';
import getInstallCmd from './getInstallCmd';

import execa = require('execa');

function getDevPendencies(options: CreateOptions) {
  return [
    ...devDependencies,
    ...(options.react ? devDependenciesForReact : []),
    ...(options.docz ? devDependenciesForDocz : []),
    ...(options.doczGithubPages ? devDependenciesForGhpages : []),
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
  isDev: boolean = false,
) {
  const cmd = getInstallCmd();
  const args = [
    cmd === 'npm' ? 'i' : 'add',
    ...deps,
    isDev ? '--dev' : '',
    cmd === 'npm' ? '--save' : '',
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
    await execInstallDeps(projectName, dependencies);
    await execInstallDeps(projectName, devDeps, true);
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
