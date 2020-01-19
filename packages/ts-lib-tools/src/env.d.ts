declare module 'rollup-plugin-babel';
declare module 'rollup-plugin-size-snapshot';
declare module 'rollup-plugin-terser';
declare module 'babel-preset-ts-lib';
declare module 'babel-preset-ts-lib/dev';
declare module 'babel-preset-ts-lib/production';
declare module 'babel-preset-ts-lib/umd';
declare module 'rollup-plugin-url';
declare module '@svgr/rollup';
declare module '*.svg';
declare module '@rollup/plugin-image';

interface BuildOptions {
  /**
   * 目标环境
   */
  target: 'web' | 'node';
  /**
   * 目标模块格式化，如['es', 'cjs']
   */
  format: FormatMode[];
  /**
   * 入口模块，如`src/example.tsx`
   */
  entry: string;
  /**
   * UMD中使用的模块名称
   */
  name: string;

  /**
   * 输出目录
   */
  outDir: string;

  /**
   * 跳过 tsc 编译 .d.ts 步骤
   */
  skipTsc: boolean;
}

type Env = 'production' | 'development';
type FormatMode = 'es' | 'cjs' | 'umd';
