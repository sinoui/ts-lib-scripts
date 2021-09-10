/* eslint-disable global-require */
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import svgr from '@svgr/rollup';
import type { InputOptions, OutputOptions } from 'rollup';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';

import { external, getOutputFilePath } from '../utils';
import {
  MAIN_FIELDS_FOR_NODE,
  MAIN_FIELDS_FOR_WEB,
  moduleFileExtensions,
} from './constants';
import { createBabelConfig } from './create-babel-config';
import { getAppPackageInfo, globals } from './paths';

/**
 * 判断是否是React组件库
 */
function isReactLib(): boolean {
  const pkgInfo = getAppPackageInfo();

  return !!pkgInfo.dependencies?.react || !!pkgInfo.peerDependencies?.react;
}

/**
 * 创建rollup输入配置选项
 *
 * @param format 打包后js文件的格式
 * @param  env 打包后js文件的运行环境
 * @param input 打包配置项
 * @returns 返回输入配置选项
 */
export function createRollupInputOptions(
  format: 'es' | 'cjs' | 'umd',
  env: 'development' | 'production',
  input: BuildOptions,
): InputOptions {
  const inputOptions: InputOptions = {
    external,
    input: input.entry,
    treeshake: {
      propertyReadSideEffects: false,
    },
    // 忽略此 rollup 警告：The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten
    onwarn(warning, warn) {
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;
      warn(warning);
    },
    plugins: [
      postcss(),
      nodeResolve({
        mainFields:
          input.target === 'web' ? MAIN_FIELDS_FOR_WEB : MAIN_FIELDS_FOR_NODE,
        extensions: moduleFileExtensions,
      }),
      format === 'umd' &&
        commonjs({
          include: /\/node_modules\//,
        }),
      json(),
      isReactLib() &&
        svgr({
          prettier: true,
          svgo: true,
        }),
      image(),
      babel({
        babelrc: false,
        runtimeHelpers: format !== 'umd',
        exclude: ['**/node_modules/**'],
        extensions: moduleFileExtensions,
        ...createBabelConfig(format, format === 'es' ? 'production' : env),
      }),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(
          format === 'es' ? 'produciton' : env,
        ),
      }),
      sourceMaps(),
      env === 'production' &&
        terser({
          output: { comments: false },
          compress: {
            keep_infinity: true,
            pure_getters: true,
            collapse_vars: false,
          },
          ecma: 5,
          toplevel: true,
          warnings: true,
        }),
    ].filter(Boolean) as Plugin[],
  };

  return inputOptions;
}

/**
 * 创建rollup输出配置选项
 *
 * @param  format 打包后js文件的格式
 * @param env 打包后js文件的运行环境
 * @param input 打包配置
 * @returns 返回输出配置选项
 */
export function createRollupOutputOptions(
  format: 'es' | 'cjs' | 'umd',
  env: 'development' | 'production',
  input: BuildOptions,
): OutputOptions {
  const outputOptions: OutputOptions = {
    file: getOutputFilePath(input.outDir, format, env),
    name: input.name,
    sourcemap: true,
    globals,
    format,
    freeze: false,
    esModule: format === 'cjs',
    exports: 'named',
  };

  return outputOptions;
}

/**
 * 创建rollup配置项
 *
 * @param format 格式化
 * @param env 运行环境
 * @param input 打包配置项
 * @returns 返回rollup输入和输出配置项数组，第一项为输入配置，第二项为输出配置。
 */
export function createRollupOptions(
  format: 'es' | 'cjs' | 'umd',
  env: 'development' | 'production',
  input: BuildOptions,
): [InputOptions, OutputOptions] {
  return [
    createRollupInputOptions(format, env, input),
    createRollupOutputOptions(format, env, input),
  ];
}
