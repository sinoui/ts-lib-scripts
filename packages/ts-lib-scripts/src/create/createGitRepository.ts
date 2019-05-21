import { isGitInstalled, isInGitRepository } from 'ts-lib-scripts-utils';
import { execSync } from 'child_process';

/**
 * 创建Git仓库
 *
 * @param rootPath 项目根目录
 */
export default function createGitRepository(rootPath: string) {
  try {
    if (isGitInstalled() && !isInGitRepository(rootPath)) {
      execSync('git init', { cwd: rootPath });
      return true;
    }
  } catch (e) {
    // 忽略错误
  }
  return false;
}
