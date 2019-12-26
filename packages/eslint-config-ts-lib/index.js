const eslintConfig = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/standard',
    'prettier/react',
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
  plugins: [
    'react',
    'import',
    '@typescript-eslint',
    'react-hooks',
    'prettier',
    'standard',
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.json'],
    'import/ignore': ['.css$', '.png$', '.jpg$', '.svg'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },

  rules: {
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/*.spec.ts',
          '**/*.spec.tsx',
          '**/*.test.js',
          '**/*.test.jsx',
          '**/*.spec.js',
          '**/*.spec.jsx',
        ],
      },
    ],
    'import/named': 0,
    'import/no-named-as-default-member': 0,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'import/extensions': [
      'error',
      {
        js: 'never',
        ts: 'never',
        tsx: 'never',
        jsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'react/prop-types': 0,
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    // rule: https://eslint.org/docs/rules/no-param-reassign.html
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'acc', // for reduce accumulators
          'accumulator', // for reduce accumulators
          'e', // for e.returnvalue
          'ctx', // for Koa routing
          'req', // for Express requests
          'request', // for Express requests
          'res', // for Express responses
          'response', // for Express responses
          '$scope', // for Angular 1 scopes
          'staticContext', // for ReactRouter context
          'draft', // for immer
          'draftState', // for immer
          'ref', // for React ref.current
        ],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'all',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        caughtErrors: 'none',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    // 关闭标准的缩进和typescript缩进规则，启用prettier的缩进规则
    indent: 'off',
    '@typescript-eslint/indent': 'off',
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    'no-empty-function': 'off',
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
