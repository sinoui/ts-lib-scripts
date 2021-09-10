import { execSync } from 'child_process';
import { pathExists } from 'fs-extra';
import { dirname, resolve } from 'path';

import getInstallCmd from './getInstallCmd';
import getInstallDepsCmd from './getInstallDepsCmd';
import isMonorepo from './isMonorepo';
import logError from './logError';

export const SCOPE_NAME_REGEXP = /^@(.+)\//;
export const BLANK_CHARACTER_REGEXP =
  /((^[^a-zA-Z]+)|[^\w.-])|([^a-zA-Z0-9]+$)/g;
export { getInstallCmd, getInstallDepsCmd, isMonorepo, logError };
/**
 * 获取安全的包名称，用于文件路径中
 *
 * @param {string} packageName 包名
 */
export function safePackageName(packageName: string): string {
  return packageName
    .toLowerCase()
    .replace(SCOPE_NAME_REGEXP, (_, name) => `${name}-`)
    .replace(BLANK_CHARACTER_REGEXP, '');
}

/**
 * 获取包名对应的安全的变量名，作为iife打包中的整个包的变量名
 *
 * @param {string} packageName 包名
 */
export function safeVariableName(packageName: string): string {
  return packageName
    .toLowerCase()
    .replace(SCOPE_NAME_REGEXP, '')
    .replace(/-(.)/g, (_, character: string) => character.toUpperCase())
    .replace(BLANK_CHARACTER_REGEXP, '');
}

/**
 * 判断是否已经安装Git
 */
export function isGitInstalled(): boolean {
  try {
    execSync('git --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 判断是否在git仓库中
 *
 * @param {string} appPath 应用路径
 */
export function isInGitRepository(appPath: string): boolean {
  try {
    execSync('git rev-parse --is-inside-work-tree', {
      stdio: 'ignore',
      cwd: appPath,
    });
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 获取上级目录
 *
 * @param path 路径
 */
function getParents(path: string): string[] {
  let currentPath = path;
  let parentPath = dirname(path);
  const paths: string[] = [];

  while (parentPath !== currentPath) {
    paths.push(parentPath);
    currentPath = parentPath;
    parentPath = dirname(parentPath);
  }

  return paths;
}

/**
 * 判断是否在 monorepo 项目中
 */
export async function isInMonorepo(): Promise<boolean> {
  const isMonoTsLib = async (path: string): Promise<boolean> => {
    const isMono = await isMonorepo(path);
    const isTsLib = await pathExists(resolve(path, 'ts-lib.config.json'));
    return isMono && isTsLib;
  };

  const results = await Promise.all(getParents(process.cwd()).map(isMonoTsLib));

  return results.some(Boolean);
}
