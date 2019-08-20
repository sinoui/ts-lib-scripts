import { resolve, isAbsolute } from 'path';
import { safePackageName, safeVariableName } from 'ts-lib-scripts-utils';
import { getAppPackageInfo } from './config/paths';

/**
 * 获取打包js文件的路径
 *
 * @export
 * @param {string} outDir 输出目录
 * @param {('es' | 'cjs' | 'umd')} format 打包js的格式
 * @param {('development' | 'production')} env 运行环境
 * @returns
 */
export function getOutputFilePath(
  outDir: string,
  format: 'es' | 'cjs' | 'umd',
  env: 'development' | 'production',
) {
  if (format === 'es') {
    return resolve(outDir, `${safePackageName(getAppPackageInfo().name)}.esm.js`);
  }
  return resolve(
    outDir,
    `${safePackageName(getAppPackageInfo().name)}.${format}.${env}.js`,
  );
}

/**
 * 获取库名称
 *
 * @export
 * @returns 返回库名称
 */
export function getLibraryName() {
  return safeVariableName(getAppPackageInfo().name);
}

/**
 * 判断指定模块id是否为外部依赖
 *
 * @param {string} id 指定模块id
 * @returns {boolean} 如果指定模块id为外部依赖，则返回true；否则返回false。
 */
export function external(id: string): boolean {
  return !id.startsWith('.') && !isAbsolute(id);
}

/**
 * 将字符串解析为列表
 *
 * 如： `"item1,item2"`解析为`["item1", "item2"]`
 *
 * @param value 字符串值
 */
export function commaSeparatedList(value: string) {
  return value ? value.split(',') : [];
}

// Taken from Create React App, react-dev-utils/clearConsole
// @see https://github.com/facebook/create-react-app/blob/master/packages/react-dev-utils/clearConsole.js
/**
 * 清除控制台
 */
export function clearConsole() {
  process.stdout.write(
    process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H',
  );
}

/**
 *
 * @param items 数组
 * @param mapper 映射函数
 */
export function flatMap<T, U>(items: T[], mapper: (item: T) => U[]): U[] {
  const result: U[] = [];
  items.forEach((item) => {
    result.push(...mapper(item));
  });

  return result;
}
