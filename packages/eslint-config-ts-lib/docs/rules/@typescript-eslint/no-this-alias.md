# @typescript-eslint/no-this-alias

> 来自 [plugin:@typescript-eslint/recommended](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) 的规则。

# Disallow aliasing `this` (`no-this-alias`)

This rule prohibits assigning variables to `this`.

## Rule Details

Rationale from TSLint:

> Assigning a variable to `this` instead of properly using arrow lambdas may be a symptom of pre-ES6 practices
> or not managing scope well.
>
> Instead of storing a reference to `this` and using it inside a `function () {`:
>
> ```js
> const self = this;
>
> setTimeout(function () {
>   self.doWork();
> });
> ```
>
> Use `() =>` arrow lambdas, as they preserve `this` scope for you:
>
> ```js
> setTimeout(() => {
>   this.doWork();
> });
> ```

Examples of **incorrect** code for this rule:

(see the rationale above)

Examples of **correct** code for this rule:

(see the rationale above)

### Options

You can pass an object option:

```jsonc
{
  "@typescript-eslint/no-this-alias": [
    "error",
    {
      "allowDestructuring": false, // Disallow `const { props, state } = this`; true by default
      "allowedNames": ["self"] // Allow `const self = this`; `[]` by default
    }
  ]
}
```

## When Not To Use It

If you need to assign `this` to variables, you shouldn’t use this rule.

## Related to

- TSLint: [`no-this-assignment`](https://palantir.github.io/tslint/rules/no-this-assignment/)

## 参考文档

- [@typescript-eslint/no-this-alias 官方文档](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-this-alias.md)
