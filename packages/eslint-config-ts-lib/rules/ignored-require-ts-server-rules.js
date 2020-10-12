// 这些规则需要启动 ts 语言服务，会拖慢eslint速度，而 airbnb-typescript 启用了这些规则，所以需要禁用这些规则。
const ignoredRequireTsServerRules = {
  '@typescript-eslint/no-throw-literal': 'off',
  '@typescript-eslint/no-implied-eval': 'off',
  '@typescript-eslint/dot-notation': 'off',
};

module.exports = ignoredRequireTsServerRules;
