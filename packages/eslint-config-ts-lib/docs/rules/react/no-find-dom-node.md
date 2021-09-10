# react/no-find-dom-node

> 来自 [undefined](undefined) 的规则。

# Prevent usage of findDOMNode (react/no-find-dom-node)

Facebook will eventually deprecate `findDOMNode` as it blocks certain improvements in React in the future.

It is recommended to use callback refs instead. See [Dan Abramov comments and examples](https://github.com/yannickcr/eslint-plugin-react/issues/678#issue-165177220).

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
class MyComponent extends Component {
  componentDidMount() {
    findDOMNode(this).scrollIntoView();
  }
  render() {
    return <div />;
  }
}
```

Examples of **correct** code for this rule:

```jsx
class MyComponent extends Component {
  componentDidMount() {
    this.node.scrollIntoView();
  }
  render() {
    return <div ref={(node) => (this.node = node)} />;
  }
}
```

## 参考文档

- [react/no-find-dom-node 官方文档](https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/no-find-dom-node.md)
