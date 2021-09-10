# react/no-direct-mutation-state

> 来自 [undefined](undefined) 的规则。

# Prevent direct mutation of this.state (react/no-direct-mutation-state)

NEVER mutate `this.state` directly, as calling `setState()` afterwards may replace
the mutation you made. Treat `this.state` as if it were immutable.

The only place that's acceptable to assign this.state is in a ES6 `class` component constructor.

## Rule Details

This rule is aimed to forbid the use of mutating `this.state` directly.

Examples of **incorrect** code for this rule:

```jsx
var Hello = createReactClass({
  componentDidMount: function () {
    this.state.name = this.props.name.toUpperCase();
  },
  render: function () {
    return <div>Hello {this.state.name}</div>;
  },
});

class Hello extends React.Component {
  constructor(props) {
    super(props);

    // Assign at instance creation time, not on a callback
    doSomethingAsync(() => {
      this.state = "bad";
    });
  }
}
```

Examples of **correct** code for this rule:

```jsx
var Hello = createReactClass({
  componentDidMount: function() {
    this.setState({
      name: this.props.name.toUpperCase();
    });
  },
  render: function() {
    return <div>Hello {this.state.name}</div>;
  }
});

class Hello extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      foo: 'bar',
    }
  }
}
```

## 参考文档

- [react/no-direct-mutation-state 官方文档](https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/no-direct-mutation-state.md)
