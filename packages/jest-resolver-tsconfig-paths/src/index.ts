import { loadConfig, createMatchPath, MatchPath } from 'tsconfig-paths';

interface JestResolverOptions {
  /**
   * 基本路径
   */
  basedir: string;
  browser?: boolean;
  defaultResolver: (request: string, options: JestResolverOptions) => string;
  extensions?: string[];
  moduleDirectory?: string[];
  paths?: string[];
  rootDir?: string[];
}

let cachedMatchPath: MatchPath | undefined;

function getOrCreateMatchPath() {
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

function tsConfigPathsResolver(request: string, options: JestResolverOptions) {
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
