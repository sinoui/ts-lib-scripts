# @typescript-eslint/no-unused-vars

> 来自 [plugin:@typescript-eslint/recommended](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) 的规则。

# Disallow unused variables (`no-unused-vars`)

## Rule Details

This rule extends the base [`eslint/no-unused-vars`](https://eslint.org/docs/rules/no-unused-vars) rule.
It adds support for TypeScript features, such as types.

## How to use

```jsonc
{
  // note you must disable the base rule as it can report incorrect errors
  "no-unused-vars": "off",
  "@typescript-eslint/no-unused-vars": ["error"]
}
```

## Options

See [`eslint/no-unused-vars` options](https://eslint.org/docs/rules/no-unused-vars#options).

<sup>Taken with ❤️ [from ESLint core](https://github.com/eslint/eslint/blob/master/docs/rules/no-unused-vars.md)</sup>

## 参考文档

- [@typescript-eslint/no-unused-vars 官方文档](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-unused-vars.md)
