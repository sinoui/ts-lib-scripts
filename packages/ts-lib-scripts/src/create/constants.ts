/**
 * 开发依赖
 */
export const devDependencies = [
  'husky',
  'prettier',
  'ts-lib-tools',
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
  '@testing-library/jest-dom',
  '@testing-library/react-hooks',
  'react-test-renderer',
];

/**
 * docz依赖
 */
export const devDependenciesForDocz = [
  'docz',
  'tsconfig-paths-webpack-plugin',
  '@types/theme-ui',
];

/**
 * github pages依赖
 */
export const devDependenciesForGhpages = ['gh-pages'];

/**
 * monorepo需要的依赖
 */
export const monorepoDevDependencies = ['lerna'];
