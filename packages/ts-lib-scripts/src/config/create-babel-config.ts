/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
import { TransformOptions } from '@babel/core';

const devBabelConfig = require('babel-preset-ts-lib/dev');
const productionBabelConfig = require('babel-preset-ts-lib/production');
const umdBabelConfig = require('babel-preset-ts-lib/umd');

/**
 * 创建babel配置
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
