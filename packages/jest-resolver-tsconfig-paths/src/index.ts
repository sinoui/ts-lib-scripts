import type { MatchPath } from 'tsconfig-paths';
import { createMatchPath, loadConfig } from 'tsconfig-paths';

/**
 * Jest 解析器配置
 */
interface JestResolverOptions {
  /**
   * 基本路径
   */
  basedir: string;
  /**
   * 是否是在浏览器中执行
   */
  browser?: boolean;
  /**
   * 默认的解析器
   */
  defaultResolver: (request: string, options: JestResolverOptions) => string;
  /**
   * 代码文件扩展
   */
  extensions?: string[];
  /**
   * 模块目录
   */
  moduleDirectory?: string[];
  /**
   * 路径
   */
  paths?: string[];
  /**
   * 根目录
   */
  rootDir?: string[];
}

let cachedMatchPath: MatchPath | undefined;

/**
 * 获取或者创建匹配路径
 */
function getOrCreateMatchPath(): MatchPath | undefined {
  if (!cachedMatchPath) {
    const tsconfig = loadConfig();
    if (tsconfig.resultType === 'success') {
      cachedMatchPath = createMatchPath(
        tsconfig.absoluteBaseUrl,
        tsconfig.paths,
        ['main'],
        tsconfig.addMatchAll,
      );
    }
  }

  return cachedMatchPath;
}

/**
 * 从 tsconfig.json 中解析出路径
 *
 * @param request 请求
 * @param options 配置项
 */
function tsConfigPathsResolver(
  request: string,
  options: JestResolverOptions,
): string {
  const matchPath = getOrCreateMatchPath();

  if (matchPath) {
    const pathResolveFromTsconfigPaths = matchPath(
      request,
      undefined,
      undefined,
      ['.ts', '.tsx', '.js', '.jsx', '.json', '.node'],
    ); // 返回的是还需要解析一下的路径，如@test/module-a -> <root>/packages/module-a，而不是root>/packages/module-a/index.ts

    return options.defaultResolver(
      pathResolveFromTsconfigPaths || request,
      options,
    );
  }

  return options.defaultResolver(request, options);
}

module.exports = tsConfigPathsResolver;
