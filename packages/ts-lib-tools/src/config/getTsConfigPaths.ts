import { join } from 'path';
import { loadConfig } from 'tsconfig-paths';

/**
 * 获取 tsconfig.json 中的 paths 配置
 */
export default function getTsConfigPaths():
  | Record<string, string[]>
  | undefined {
  const config = loadConfig();

  if (config.resultType === 'success') {
    Object.keys(config.paths).forEach((key) => {
      config.paths[key] = config.paths[key].map((p) =>
        join(config.baseUrl, p).replace(/\\+/g, '/'),
      );
    });

    return config.paths;
  }

  return undefined;
}
