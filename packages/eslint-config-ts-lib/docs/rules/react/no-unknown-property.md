# react/no-unknown-property

> 来自 [undefined](undefined) 的规则。

# Prevent usage of unknown DOM property (react/no-unknown-property)

In JSX all DOM properties and attributes should be camelCased to be consistent with standard JavaScript style. This can be a possible source of error if you are used to writing plain HTML.

**Fixable:** This rule is automatically fixable using the `--fix` flag on the command line.

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
var React = require("react");

var Hello = <div class="hello">Hello World</div>;
```

Examples of **correct** code for this rule:

```jsx
var React = require("react");

var Hello = <div className="hello">Hello World</div>;
```

## Rule Options

```js
...
"react/no-unknown-property": [<enabled>, { ignore: <ignore> }]
...
```

- `enabled`: for enabling the rule. 0=off, 1=warn, 2=error. Defaults to 0.
- `ignore`: optional array of property and attribute names to ignore during validation.

## When Not To Use It

If you are not using JSX you can disable this rule.

## 参考文档

- [react/no-unknown-property 官方文档](https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/no-unknown-property.md)
