const classRules = require('./rules/class-rules');
const functionRules = require('./rules/function-rules');
const ignoredRequireTsServerRules = require('./rules/ignored-require-ts-server-rules');
const ignoredImportRules = require('./rules/import-rules');
const prettierRules = require('./rules/prettier-rules');
const reactRules = require('./rules/react-rules');
const tsRules = require('./rules/ts-rules');
const varRules = require('./rules/var-rules');

const eslintConfig = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
    worker: true,
    'cypress/globals': true,
  },
  extends: [
    'airbnb-typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/standard',
    'prettier/react',
    'plugin:cypress/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'cypress'],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs'],
    'import/ignore': ['.css$', '.png$', '.jpg$', '.svg'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },

  rules: {
    ...ignoredRequireTsServerRules,
    ...ignoredImportRules,
    ...reactRules,
    ...prettierRules,
    ...functionRules,
    ...tsRules,
    ...classRules,
    ...varRules,
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-underscore-dangle': [
      'error',
      { allow: ['__REDUX_DEVTOOLS_EXTENSION__'] },
    ],
  },

  overrides: [
    {
      files: ['*.test.ts', '*.spec.ts', '*.test.tsx', '*.spec.tsx'],
      rules: {
        'no-console': 'off',
        '@typescript-eslint/camelcase': 'off',
      },
    },
    {
      files: ['**/examples/**', '**/demos/**', '**/stories/**', '**/mock/**'],
      rules: {
        'no-console': 'off',
        'import/no-webpack-loader-syntax': 'off',
        '@typescript-eslint/camelcase': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};

module.exports = eslintConfig;
