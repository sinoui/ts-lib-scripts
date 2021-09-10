# react/react-in-jsx-scope

> 来自 [undefined](undefined) 的规则。

# Prevent missing React when using JSX (react/react-in-jsx-scope)

When using JSX, `<a />` expands to `React.createElement("a")`. Therefore the `React` variable must be in scope.

If you are using the @jsx pragma this rule will check the designated variable and not the `React` one.

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
var Hello = <div>Hello {this.props.name}</div>;
```

```jsx
/** @jsx Foo.bar */
var React = require("react");

var Hello = <div>Hello {this.props.name}</div>;
```

Examples of **correct** code for this rule:

```jsx
import React from "react";

var Hello = <div>Hello {this.props.name}</div>;
```

```jsx
var React = require("react");

var Hello = <div>Hello {this.props.name}</div>;
```

```jsx
/** @jsx Foo.bar */
var Foo = require("foo");

var Hello = <div>Hello {this.props.name}</div>;
```

## When Not To Use It

If you are not using JSX, or if you are setting `React` as a global variable.

If you are using the [new JSX transform from React 17](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports), you should disable this rule by extending [`react/jsx-runtime`](https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/index.js#L163-L176) in your eslint config (add `"plugin:react/jsx-runtime"` to `"extends"`).

## 参考文档

- [react/react-in-jsx-scope 官方文档](https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/react-in-jsx-scope.md)
