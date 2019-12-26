# babel-plugin-clean-type-import-export

清除类型导入和导出的 Babel 插件。

## 例子

In

```js
import A, { B, C, D, E } from './C';

export {
  A,
  /* type */
  B,
  // type
  C,
};
```

Out

```js
import A, { D, E } from './C';

export { A };
```

## 安装

```shell
yarn add babel-plugin-clean-type-import-export
```

## 使用

### 通过 `.babelrc` （推荐）

`.babelrc`

```json
{
  "plugins": ["babel-plugin-clean-type-import-export"]
}
```

### 通过命令行

```shell
babel --plugins babel-plugin-clean-type-import-export script.js
```

### 通过 Node API

```js
require('@babel/core').transform('code', {
  plugins: ['babel-plugin-clean-type-import-export'],
});
```
