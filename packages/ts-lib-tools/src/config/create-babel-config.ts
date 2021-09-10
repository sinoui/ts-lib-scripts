/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
import type { TransformOptions } from '@babel/core';

const devBabelConfig = require('babel-preset-ts-lib/dev');
const productionBabelConfig = require('babel-preset-ts-lib/production');
const umdBabelConfig = require('babel-preset-ts-lib/umd');

/**
 * 创建babel配置
 *
 * @param format 包的格式
 * @param env 运行环境
 */
export function createBabelConfig(
  format: 'es' | 'cjs' | 'umd',
  env: 'development' | 'production',
): TransformOptions {
  if (format === 'umd') {
    return umdBabelConfig;
  }
  if (env === 'development') {
    return devBabelConfig();
  }
  return productionBabelConfig();
}
