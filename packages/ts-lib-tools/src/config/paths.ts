import { existsSync, readJsonSync, realpathSync } from 'fs-extra';
import { dirname, resolve } from 'path';
import { isMonorepo } from 'ts-lib-scripts-utils';

import { moduleFileExtensions } from './constants';

/**
 * 项目根目录
 */
export const rootPath = realpathSync(process.cwd());

/**
 * 将相对于项目根目录的路径解析为绝对路径
 *
 * @param relativePath 相对路径
 */
export const resolveRoot = (relativePath: string): string =>
  resolve(rootPath, relativePath);

/**
 * 命令行工具的配置
 */
export const cliPackageInfo = readJsonSync(
  resolve(__dirname, '../../package.json'),
);

/**
 * 获取项目配置
 */
export function getAppPackageInfo(): Record<string, any> {
  return readJsonSync(resolveRoot('package.json'));
}

/**
 * 项目版本号
 */
export const getAppVersion = (): string => {
  return getAppPackageInfo().version;
};

/**
 * 解析模块的真实文件路径
 *
 * @param resolveFn 相对路径解析函数
 * @param filePath 模块相对路径
 * @param testExists 是否存在测试
 */
export const resolveModule = (
  resolveFn: (relativePath: string) => string,
  filePath: string,
  testExists = false,
): string => {
  const extension = moduleFileExtensions.find((_) =>
    existsSync(resolveFn(`${filePath}${_}`)),
  );

  if (extension) {
    return resolveFn(`${filePath}${extension}`);
  }

  return testExists ? '' : resolveFn(`${filePath}.ts`);
};

/**
 * 源码根路径
 */
export const src = resolveRoot(rootPath);

/**
 * 入口文件路径
 */
export const entry = resolveModule(resolveRoot, 'src/index');

/**
 * 测试环境初始化文件路径
 */
export const testsSetup = resolveModule(resolveRoot, 'src/setupTests');

/**
 * assets路径
 */
export const ASSETS_PATH = resolve(__dirname, '../../assets');

/**
 * 打包目标目录
 */
export const DIST_PATH = resolveRoot('./dist');

/**
 * 模块模板路径
 */
export const MODULE_TEMPLATE_PATH = resolve(ASSETS_PATH, './module-template');

/**
 * 获取初始化测试文件
 */
export const getTestSetups = (): string =>
  resolveModule(resolveRoot, 'src/setupTests', true);

/**
 * 获取 @testing-library/jest-dom 模块的路径
 */
export const getJestDOMModulePath = (): string | undefined => {
  try {
    return require.resolve('@testing-library/jest-dom/extend-expect');
  } catch {
    return undefined;
  }
};

/**
 * 库对应的全局名称
 */
export const globals = (): string => {
  return {
    react: 'React',
    'react-native': 'ReactNative',
    ...getAppPackageInfo().globals,
  };
};

/**
 * 获取 mono 项目的根目录
 */
export const getMonoRootPath = async (): Promise<string> => {
  const findMonoPath = async (dirPath: string): Promise<string> => {
    const isResult = await isMonorepo(dirPath);

    if (isResult) {
      return dirPath;
    }

    const parentPath = dirname(dirPath);

    if (parentPath === dirPath) {
      throw new Error('未找到根目录');
    }

    return findMonoPath(parentPath);
  };

  const result = await findMonoPath(process.cwd());

  return result;
};
