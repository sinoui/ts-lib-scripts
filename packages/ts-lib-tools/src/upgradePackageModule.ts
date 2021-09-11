import { outputJSON, readJSON } from 'fs-extra';
import { globby } from 'globby';
import { isMonorepo, safePackageName } from 'ts-lib-scripts-utils';

import { resolveRoot } from './config/paths';

/**
 * 更新包
 *
 * @param packageFilePath 包描述文件路径
 */
async function updatePackage(packageFilePath: string): Promise<void> {
  const absolutePackageFileInfo = resolveRoot(packageFilePath);
  const packageInfo = await readJSON(absolutePackageFileInfo);
  if (!packageInfo.module || !packageInfo.module.endsWith('.esm.js')) {
    packageInfo.module = `dist/${safePackageName(packageInfo.name)}.esm.js`;
    await outputJSON(absolutePackageFileInfo, packageInfo, {
      spaces: 2,
    });
  }
}

/**
 * 升级包模块
 */
export default async function upgradePakageModule(): Promise<void> {
  const isMono = await isMonorepo();

  if (!isMono) {
    await updatePackage('./package.json');
  } else {
    const packages = await globby('packages/*/package.json');
    await Promise.all(packages.map(updatePackage));
  }
}
