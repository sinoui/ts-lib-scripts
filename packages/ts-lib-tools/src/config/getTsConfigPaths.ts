import { loadConfig } from 'tsconfig-paths';
import { join } from 'path';

export default function getTsConfigPaths() {
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
