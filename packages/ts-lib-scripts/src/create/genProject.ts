/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import {
  pathExists,
  copy,
  readJSON,
  readFile,
  writeFile,
  existsSync,
} from 'fs-extra';
import chalk from 'chalk';
import { resolve, join } from 'path';
import { template } from 'lodash';
import { safePackageName } from 'ts-lib-scripts-utils';
import { format } from 'prettier';
import { resolveRoot, TEMPLATE_PATH, ASSETS_PATH } from '../config/paths';

/**
 * 生成package.json文件
 *
 * @param projectPath 项目路径
 * @param options 配置
 */
export async function genPackageFile(
  projectPath: string,
  options: CreateOptions,
) {
  const packagePath = resolve(projectPath, 'package.json');
  const packageInfo = await readJSON(packagePath);
  packageInfo.version = options.packageVersion;
  packageInfo.name = options.packageName;
  packageInfo.description = options.packageDescription;
  packageInfo.files = ['dist', 'assets'];
  packageInfo['umd:main'] = `dist/${safePackageName(
    options.packageName,
  )}.umd.production.js`;
  packageInfo.module = `dist/${safePackageName(
    options.packageName,
  )}.es.production.js`;

  await writeFile(
    packagePath,
    format(JSON.stringify(packageInfo), {
      parser: 'json',
      tabWidth: 2,
      useTabs: false,
    }),
    'utf-8',
  );
}

/**
 * 生成README.md文档
 *
 * @param projectPath 项目路径
 * @param options 配置
 */
export async function genREADMEFile(
  projectPath: string,
  options: CreateOptions,
) {
  const readmePath = resolve(projectPath, 'README.md');
  const content = await readFile(readmePath, 'utf-8');

  await writeFile(
    readmePath,
    template(content)({
      ...options,
      packageDescription:
        options.packageDescription ||
        '这是由[ts-lib-scripts](https://github.com/sinoui/ts-lib-scripts)创建的TypeScript库项目。',
    }),
  );
}

/**
 * 生成LICENSE文件
 *
 * @param projectPath 项目路径
 * @param options 配置
 */
export async function genLicenseFile(
  projectPath: string,
  options: CreateOptions,
) {
  const licensePath = resolve(projectPath, 'LICENSE');
  const content = await readFile(licensePath, 'utf-8');

  await writeFile(
    licensePath,
    template(content)({
      time: new Date().getFullYear(),
      author: options.auth,
    }),
  );
}

/**
 * 生成项目
 *
 * @param options 配置
 */
export async function genProject(options: CreateOptions) {
  const projectPath = resolveRoot(options.projectName);
  const exists = await pathExists(projectPath);

  if (exists) {
    console.error(
      chalk.red(
        `已经存在${options.projectName}文件夹，请选择一个新的项目名称。`,
      ),
    );

    process.exit(1);
  }

  await copy(TEMPLATE_PATH, projectPath);

  // 修复在npx ts-lib-scripts create hello-world时，没有生成.gitignore的错误
  const gitignoreExists = existsSync(join(projectPath, '.gitignore'));
  if (!gitignoreExists) {
    await copy(
      join(ASSETS_PATH, 'gitignore.tpl'),
      join(projectPath, '.gitignore'),
    );
  }

  await genPackageFile(projectPath, options);
  await genREADMEFile(projectPath, options);
  await genLicenseFile(projectPath, options);
}
