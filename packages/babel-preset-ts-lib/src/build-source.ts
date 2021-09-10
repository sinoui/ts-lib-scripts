import type { TransformOptions } from '@babel/core';
import { transform } from '@babel/core';

import tsLibBabelPreset from '../index';

const transformOptions: TransformOptions = {
  presets: [[tsLibBabelPreset]],
  filename: 'test.ts',
};

/**
 * 编译源码
 *
 * @param source 源码
 */
export default function buildSource(source: string): string {
  const babelFileResult = transform(source, transformOptions);
  return babelFileResult.code;
}
