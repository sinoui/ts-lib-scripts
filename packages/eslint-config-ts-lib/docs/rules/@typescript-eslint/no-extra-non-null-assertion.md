# @typescript-eslint/no-extra-non-null-assertion

> 来自 [plugin:@typescript-eslint/recommended](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) 的规则。

# Disallow extra non-null assertion (`no-extra-non-null-assertion`)

## Rule Details

Examples of **incorrect** code for this rule:

```ts
const foo: { bar: number } | null = null;
const bar = foo!!!.bar;
```

```ts
function foo(bar: number | undefined) {
  const bar: number = bar!!!;
}
```

```ts
function foo(bar?: { n: number }) {
  return bar!?.n;
}
```

Examples of **correct** code for this rule:

```ts
const foo: { bar: number } | null = null;
const bar = foo!.bar;
```

```ts
function foo(bar: number | undefined) {
  const bar: number = bar!;
}
```

```ts
function foo(bar?: { n: number }) {
  return bar?.n;
}
```

## How to use

```json
{
  "@typescript-eslint/no-extra-non-null-assertion": ["error"]
}
```

## 参考文档

- [@typescript-eslint/no-extra-non-null-assertion 官方文档](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-extra-non-null-assertion.md)
