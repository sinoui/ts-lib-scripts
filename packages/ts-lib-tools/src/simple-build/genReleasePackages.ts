/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';
import { writeFile, readJSON, writeJSON, pathExists } from 'fs-extra';
import globby from 'globby';
import { ROOT_DIR, DIST_ROOT, SRC_ROOT } from './constants';

/**
 * 拷贝主模块配置文件
 */
async function cpMainPackageFile() {
  const sourcePath = resolve(ROOT_DIR, 'package.json');
  const distPath = resolve(DIST_ROOT, 'package.json');

  const pkgInfo = await readJSON(sourcePath);

  pkgInfo.main = 'index.js';
  pkgInfo.module = 'esm/index.js';
  pkgInfo.types = 'index.d.ts';
  delete pkgInfo.files;

  await writeJSON(distPath, pkgInfo, {
    spaces: 2,
  });
}

const subPackageTemplate = `
{
  "sideEffects": false,
  "module": "{modulePath}",
  "typings": "./index.d.ts"
}
`;

/**
 * 生成子包的配置文件
 *
 * @param name 子包名称
 */
async function genSubPackageFile(name: string) {
  const subPackageDir = resolve(DIST_ROOT, name);
  const mainFilePath = resolve(subPackageDir, 'index.js');
  const isMainFileExists = await pathExists(mainFilePath);

  if (!isMainFileExists) {
    return;
  }

  const modulePath = `${new Array(name.split('/').length)
    .fill('..')
    .join('/')}/esm/${name}/index.js`;

  await writeFile(
    resolve(subPackageDir, 'package.json'),
    subPackageTemplate.replace('{modulePath}', modulePath),
  );
}

/**
 * 生成发布包的package.json文件
 */
export default async function genReleasePackages() {
  await cpMainPackageFile();

  const subPackages = await globby(
    ['**', '!**/__tests__', '!**/__snapshots__'],
    {
      cwd: SRC_ROOT,
      onlyDirectories: true,
    },
  );

  await Promise.all(subPackages.map(genSubPackageFile));
}
