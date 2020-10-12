const importRules = {
  // 无需启用。ts会有错误提示。
  'import/named': 'off',
  // 有一些情况下，应允许ts文件没有默认导出
  'import/no-named-as-default-member': 'off',
  // 有一些情况下，应允许ts文件没有默认导出
  'import/no-named-as-default': 'off',
  // 有一些情况下，应允许ts文件没有默认导出
  'import/prefer-default-export': 'off',
  'import/extensions': 'off',
  // 文档、单元测试、示例、脚本等可以使用 devDependencies 中的依赖库
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
        'stories/**/*',
        'docs/**/*',
        'scripts/**/*',
      ],
    },
  ],
};

module.exports = importRules;
