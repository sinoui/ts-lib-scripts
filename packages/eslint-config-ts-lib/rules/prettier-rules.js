const prettierRules = {
  // 关闭标准的缩进和typescript缩进规则，启用prettier的缩进规则
  indent: 'off',
  '@typescript-eslint/indent': 'off',

  'prettier/prettier': 'error',
};

module.exports = prettierRules;
