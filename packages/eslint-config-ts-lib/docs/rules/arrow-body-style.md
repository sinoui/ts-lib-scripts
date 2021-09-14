# arrow-body-style

> 来自 [eslint](https://eslint.org/docs/rules/) 的规则。

> ts-lib-scripts 推荐使用。遵循简洁的原则。

> 当箭头函数体的大括号是可以省略的，则强制不使用它们。

## 示例

### 错误用法

```javascript
const foo = () => {
  return 0;
};

const foo = () => {
  return {
    bar: {
      foo: 1,
      bar: 2,
    },
  };
};
```

### 正确用法

```javascript
let foo = () => 0;
let foo = () => ({
  bar: {
    foo: 1,
    bar: 2,
  },
});
```

## 参考文档

- [arrow-body-style 官方文档](https://eslint.org/docs/rules/arrow-body-style)
- [arrow-body-style 中文教程](https://eslint.cn/docs/rules/arrow-body-style)
