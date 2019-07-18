import { realpathSync, readJsonSync, existsSync } from 'fs-extra';
import { resolve } from 'path';
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
export const resolveRoot = (relativePath: string) =>
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
export function getAppPackageInfo() {
  return readJsonSync(resolveRoot('package.json'));
}

/**
 * 项目版本号
 */
export const getAppVersion = () => {
  return getAppPackageInfo().version;
};

/**
 * 解析模块的真实文件路径
 *
 * @param resolveFn 相对路径解析函数
 * @param filePath 模块相对路径
 */
export const resolveModule = (
  resolveFn: (relativePath: string) => string,
  filePath: string,
) => {
  const extension = moduleFileExtensions.find((_) =>
    existsSync(resolveFn(`${filePath}.${_}`)),
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.ts`);
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
 * 库对应的全局名称
 */
export const globals = () => {
  return {
    react: 'React',
    'react-native': 'ReactNative',
    ...getAppPackageInfo().globals,
  };
};
