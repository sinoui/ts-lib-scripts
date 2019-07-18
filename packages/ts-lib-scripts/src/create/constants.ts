/**
 * 开发依赖
 */
export const devDependencies = [
  'husky',
  'prettier',
  'ts-lib-tools',
  'typescript',
  'lint-staged',
];

/**
 * 依赖
 */
export const dependencies = ['@babel/runtime', '@babel/polyfill'];

/**
 * react库开发依赖
 */
export const devDependenciesForReact = [
  'react',
  'react-dom',
  '@types/react',
  '@types/react-dom',
  '@testing-library/react',
  'jest-dom',
  'react-test-renderer',
];

/**
 * docz依赖
 */
export const devDependenciesForDocz = [
  'docz',
  'docz-theme-default',
  'style-loader',
  'css-loader',
  'postcss-loader',
  'postcss-import',
  'postcss-preset-env',
  'webpack-docz-ghpages-plugin',
];

/**
 * github pages依赖
 */
export const devDependenciesForGhpages = ['gh-pages'];

/**
 * monorepo需要的依赖
 */
export const monorepoDevDependencies = ['lerna'];
