import { execSync } from 'child_process';
import { removeSync } from 'fs-extra';
import { join } from 'path';

/**
 * 提交git
 *
 * @param appPath 项目目录
 */
export default function gitCommit(appPath: string) {
  try {
    execSync('git add -A', { stdio: 'ignore', cwd: appPath });
    execSync('git commit -m "Initial commit from ts-lib-scripts"', {
      stdio: 'ignore',
      cwd: appPath,
    });
  } catch (e) {
    try {
      removeSync(join(appPath, '.git'));
    } catch (removeErr) {
      // 忽略
    }

    throw e;
  }
}
