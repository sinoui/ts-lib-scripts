const varRules = {
  // 关闭未定义规则。因为 TypeScript 本身对未定义的检测更智能、全面：https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
  'no-undef': 'off',
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
};

module.exports = varRules;
