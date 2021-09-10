# @typescript-eslint/no-misused-new

> 来自 [plugin:@typescript-eslint/recommended](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) 的规则。

# Enforce valid definition of `new` and `constructor` (`no-misused-new`)

Warns on apparent attempts to define constructors for interfaces or `new` for classes.

## Rule Details

Examples of **incorrect** code for this rule.

```ts
class C {
  new(): C;
}

interface I {
  new (): I;
  constructor(): void;
}
```

Examples of **correct** code for this rule.

```ts
class C {
  constructor() {}
}
interface I {
  new (): C;
}
```

## Options

```json
{
  "@typescript-eslint/no-misused-new": "error"
}
```

## Compatibility

- TSLint: [no-misused-new](https://palantir.github.io/tslint/rules/no-misused-new/)

## 参考文档

- [@typescript-eslint/no-misused-new 官方文档](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-misused-new.md)
