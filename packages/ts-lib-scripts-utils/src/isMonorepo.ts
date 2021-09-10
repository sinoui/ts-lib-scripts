import { pathExists, readJSON } from 'fs-extra';
import { join } from 'path';

/**
 * 判断是否在monorepo模式下。
 *
 * @param modulePath 模块路径
 */
export default async function isMonorepo(
  modulePath = process.cwd(),
): Promise<boolean> {
  const packageFilePath = join(modulePath, 'package.json');
  const isExists = await pathExists(packageFilePath);

  if (!isExists) {
    return false;
  }

  const packageInfo = await readJSON(packageFilePath);

  return (
    packageInfo.workspaces &&
    packageInfo.workspaces.length > 0 &&
    packageInfo.private
  );
}
