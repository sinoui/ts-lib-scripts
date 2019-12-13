import { execSync } from 'child_process';
import { dirname, resolve } from 'path';
import { pathExists } from 'fs-extra';
import logError from './logError';
import isMonorepo from './isMonorepo';
import getInstallCmd from './getInstallCmd';
import getInstallDepsCmd from './getInstallDepsCmd';

export const SCOPE_NAME_REGEXP = /^@(.+)\//;
export const BLANK_CHARACTER_REGEXP = /((^[^a-zA-Z]+)|[^\w.-])|([^a-zA-Z0-9]+$)/g;
export { logError, isMonorepo, getInstallCmd, getInstallDepsCmd };
/**
 * 获取安全的包名称，用于文件路径中
 *
 * @export
 * @param {string} packageName 包名
 * @returns
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
 * @export
 * @param {string} packageName 包名
 * @returns
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
export function isGitInstalled() {
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
export function isInGitRepository(appPath: string) {
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

function getParents(path: string) {
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
export async function isInMonorepo() {
  const isMonoTsLib = async (path: string) => {
    const isMono = await isMonorepo(path);
    const isTsLib = await pathExists(resolve(path, 'ts-lib.config.json'));
    return isMono && isTsLib;
  };

  const results = await Promise.all(getParents(process.cwd()).map(isMonoTsLib));

  return results.some(Boolean);
}
