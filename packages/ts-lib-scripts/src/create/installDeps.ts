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
 * 安装依赖
 *
 * @param {CreateOptions} options
 */
async function installDeps(spinner: ora.Ora, options: CreateOptions) {
  const { projectName } = options;
  const devDeps = getDevPendencies(options);
  spinner.start(dependenciesMessage(dependencies, devDeps));
  try {
    await execa(getInstallDepsCmd(dependencies), {
      cwd: resolveRoot(projectName),
    });
    await execa(getInstallDepsCmd(devDeps, true), {
      cwd: resolveRoot(projectName),
    });
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
