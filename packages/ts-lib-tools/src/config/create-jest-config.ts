/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

import chalk from 'chalk';
import { resolve } from 'path';
import { isMonorepo } from 'ts-lib-scripts-utils';
import { getAppPackageInfo } from './paths';

const monorepoJestConfig = {
  collectCoverageFrom: [
    'packages/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/*.d.ts',
    '!**/dist/**',
    '!**/.cache/**',
  ],
  watchPathIgnorePatterns: [
    'node_modules',
    '.docz',
    'coverage',
    'examples',
    '.*/node_modules/.*',
    '.*/dist/.*',
    '.*/\\.cache/.*',
  ],
  testPathIgnorePatterns: [
    '.*/node_modules/.*',
    '.*/dist/.*',
    '.*/\\.cache/.*',
  ],
};

/**
 * 创建Jest配置
 */
export async function createJestConfig() {
  const isMono = await isMonorepo();
  const jestConfig: { [x: string]: any } = {
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': resolve(__dirname, './jest/babelTransform.js'),
      '^.+\\.css$': resolve(__dirname, './jest/cssTransform.js'),
      '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': resolve(
        __dirname,
        './jest/fileTransform.js',
      ),
    },
    transformIgnorePatterns: [
      'node_modules/(?!(@sinoui|sinoui-components|lodash-es)/)',
      '^.+\\.module\\.(css|sass|scss)$',
      '^.+[/\\\\]dist[/\\\\]',
    ],
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!**/node_modules/**',
      '!**/vendor/**',
      '!**/*.d.ts',
    ],
    watchPathIgnorePatterns: [
      'node_modules',
      'dist',
      '.docz',
      '.cache',
      'coverage',
      'examples',
    ],
    testRegex: '.*\\.(spec|test)\\.tsx?$',
    watchPlugins: [
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname',
    ],
    moduleNameMapper: {
      '^react-native$': 'react-native-web',
      '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    },
    resolver: 'jest-resolver-tsconfig-paths',
    ...(isMono ? monorepoJestConfig : {}),
  };

  const overrides = { ...getAppPackageInfo().jest };

  const supportedKeys = [
    'collectCoverageFrom',
    'coverageReporters',
    'coverageThreshold',
    'extraGlobals',
    'globalSetup',
    'globalTeardown',
    'moduleNameMapper',
    'resetMocks',
    'resetModules',
    'snapshotSerializers',
    'transform',
    'transformIgnorePatterns',
    'watchPathIgnorePatterns',
    'testRegex',
    'testPathIgnorePatterns',
  ];

  if (overrides) {
    supportedKeys.forEach((key) => {
      if (overrides[key] !== undefined && overrides[key] !== null) {
        if (
          Array.isArray(jestConfig[key]) ||
          typeof jestConfig[key] !== 'object'
        ) {
          // for arrays or primitive types, directly override the config key
          jestConfig[key] = overrides[key];
        } else {
          // for object types, extend gracefully
          jestConfig[key] = { ...jestConfig[key], ...overrides[key] };
        }

        delete overrides[key];
      }
    });

    const unsupportedKeys = Object.keys(overrides);

    if (unsupportedKeys.length) {
      const isOverridingSetupFile =
        unsupportedKeys.indexOf('setupFilesAfterEnv') > -1;

      if (isOverridingSetupFile) {
        console.error(
          chalk.red(
            `在package.json中发现了${chalk.bold('setupFilesAfterEnv')}。\n\n` +
              `请将它删除掉, 并将你的初始化代码放在 ${chalk.bold(
                'src/setupTests.js',
              )}。\n这个文件会自动加载。\n`,
          ),
        );
      } else {
        console.error(
          chalk.red(
            `${'\nts-lib-scripts只支持以下Jest扩展配置:\n\n'}${supportedKeys
              .map((_) => chalk.bold(`  \u2022 ${_}`))
              .join('\n')}。\n\n` +
              `以下在package.json的jest配置不被ts-lib-scripts支持：\n\n${unsupportedKeys
                .map((_) => chalk.bold(`  \u2022 ${_}`))
                .join('\n')}`,
          ),
        );
      }

      process.exit(1);
    }
  }
  return jestConfig;
}
