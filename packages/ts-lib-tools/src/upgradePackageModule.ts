import { isMonorepo, safePackageName } from 'ts-lib-scripts-utils';
import globby from 'globby';
import { readJSON, outputJSON } from 'fs-extra';
import { resolveRoot } from './config/paths';

async function updatePackage(packageFilePath: string) {
  const absolutePackageFileInfo = resolveRoot(packageFilePath);
  const packageInfo = await readJSON(absolutePackageFileInfo);
  if (!packageInfo.module || !packageInfo.module.endsWith('.esm.js')) {
    packageInfo.module = `dist/${safePackageName(packageInfo.name)}.esm.js`;
    await outputJSON(absolutePackageFileInfo, packageInfo, {
      spaces: 2,
    });
  }
}

export default async function upgradePakageModule() {
  const isMono = await isMonorepo();

  if (!isMono) {
    await updatePackage('./package.json');
  } else {
    const packages = await globby('packages/*/package.json');
    await Promise.all(packages.map(updatePackage));
  }
}
