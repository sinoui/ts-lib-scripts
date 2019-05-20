import { isGitInstalled, isInGitRepository } from 'ts-lib-scripts-utils';
import { execSync } from 'child_process';
import { removeSync } from 'fs-extra';
import { join } from 'path';

/**
 * 初始化Git仓库
 */
export default function initGitRepository(appPath: string) {
  let didInit = false;
  try {
    if (isGitInstalled() && !isInGitRepository(appPath)) {
      execSync('git init', { cwd: appPath });
      didInit = true;

      execSync('git add -A', { stdio: 'ignore', cwd: appPath });
      execSync('git commit -m "Initial commit from ts-lib-scripts"', {
        stdio: 'ignore',
        cwd: appPath,
      });

      return true;
    }
    return false;
  } catch (e) {
    if (didInit) {
      try {
        removeSync(join(appPath, '.git'));
      } catch (removeErr) {
        // 忽略
      }
    }
    throw e;
  }
}
