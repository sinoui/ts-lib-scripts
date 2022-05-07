const functionRules = require('./rules/function-rules');
const varRules = require('./rules/var-rules');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsdoc/recommended',
    'prettier',
  ],
  plugins: [
    '@typescript-eslint',
    'react-hooks',
    'simple-import-sort',
    'import',
    'jsdoc',
  ],
  settings: {
    react: { version: '17' },
    import: {
      parsers: {
        '@typescript-eslint/parser': ['.js', '.ts', '.tsx'],
      },
      cache: { lifetime: Infinity },
    },
    jsdoc: {
      mode: 'jsdoc',
    },
  },

  rules: {
    ...functionRules,
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
  },

  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-duplicate-imports': 'off',
        '@typescript-eslint/no-duplicate-imports': ['error'],
        'no-dupe-class-members': 'off',
        '@typescript-eslint/no-dupe-class-members': ['error'],
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': [
          'error',
          {
            builtinGlobals: false,
          },
        ],
        'no-invalid-this': 'off',
        '@typescript-eslint/no-invalid-this': ['error'],
        'no-loop-func': 'off',
        '@typescript-eslint/no-loop-func': ['error'],
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': ['error'],
        'no-loss-of-precision': 'off',
        '@typescript-eslint/no-loss-of-precision': ['error'],
        '@typescript-eslint/array-type': ['error'],
        '@typescript-eslint/consistent-type-imports': ['error'],
        '@typescript-eslint/explicit-function-return-type': ['error'],
        '@typescript-eslint/no-require-imports': ['error'],
        '@typescript-eslint/prefer-optional-chain': ['error'],
        '@typescript-eslint/type-annotation-spacing': ['error'],
        'jsdoc/require-returns-type': 'off',
        'jsdoc/require-param-type': 'off',
        'jsdoc/require-property-type': 'off',
        'jsdoc/require-returns': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'react/prop-types': 'off',
        'jsdoc/require-jsdoc': [
          'error',
          {
            contexts: [
              'TSInterfaceDeclaration',
              'TSMethodSignature',
              'TSPropertySignature',
            ],
            require: {
              ClassDeclaration: true,
              ClassExpression: true,
              MethodDefinition: true,
            },
          },
        ],
        'jsdoc/check-tag-names': [
          'warn',
          {
            definedTags: ['jest-environment'],
          },
        ],
        ...varRules,
      },
      settings: {
        jsdoc: {
          mode: 'typescript',
        },
      },
    },
    {
      files: ['*.worker.js', '*.worker.ts'],
      env: {
        browser: false,
        node: false,
        worker: true,
      },
    },
    {
      files: [
        '*.test.js',
        '*.spec.js',
        '*.test.ts',
        '*.spec.ts',
        '*.test.tsx',
        '*.spec.tsx',
        '*/tests/*.js',
        '*/tests/*.ts',
        '*/tests/*.tsx',
        '*.stories.tsx',
        '*/stories/*',
      ],
      env: {
        jest: true,
      },
      rules: {
        'no-console': 'off',
      },
    },
  ],
};
