import execa from 'execa';
import type { Ora } from 'ora';
import { isGitInstalled, isInGitRepository } from 'ts-lib-scripts-utils';

import { resolveRoot, rootPath } from '../config/paths';

/**
 * 初始化 husky
 *
 * @param spinner 进度条
 * @param projectName 项目名称
 */
export default async function initHusky(
  spinner: Ora,
  projectName: string,
): Promise<void> {
  if (isGitInstalled() && !isInGitRepository(rootPath)) {
    spinner.start('初始化 husky');
    try {
      await execa('npx', ['husky', 'install'], {
        cwd: resolveRoot(projectName),
      });
      await execa('npm', ['set-script prepare', '"husky install"']);
      spinner.succeed('初始化 husky 成功');
    } catch (e) {
      spinner.fail('初始化 husky 失败');
    }
  }
}
