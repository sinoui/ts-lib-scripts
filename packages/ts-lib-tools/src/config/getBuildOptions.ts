/* eslint-disable import/prefer-default-export */
import { getLibraryName } from '../utils';
import * as paths from './paths';

/**
 * 获取完整的构建配置
 *
 * @param buildOptions 构建配置
 */
export function getBuildOptions(buildOptions: BuildOptions): BuildOptions {
  const entry = buildOptions.entry || paths.entry;
  const name = buildOptions.name || getLibraryName();

  return {
    entry,
    name,
    target: buildOptions.target,
    format: buildOptions.format,
    outDir: paths.resolveRoot(buildOptions.outDir),
    skipTsc: buildOptions.skipTsc,
    simple: buildOptions.simple,
  };
}
