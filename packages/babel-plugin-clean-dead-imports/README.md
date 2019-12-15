# babel-plugin-clean-dead-imports

清除无用导入的 Babel 插件。

## 例子

In

```js
import A, { B, C } from './C';

export { B, /* type */ C };
```

Out

```js
import { B } from './C';

export { B };
```

## 安装

```shell
yarn add babel-plugin-clean-dead-imports
```

## 使用

### 通过 `.babelrc` （推荐）

`.babelrc`

```json
{
  "plugins": ["babel-plugin-clean-dead-imports"]
}
```

### 通过命令行

```shell
babel --plugins babel-plugin-clean-dead-imports script.js
```

### 通过 Node API

```js
require('@babel/core').transform('code', {
  plugins: ['babel-plugin-clean-dead-imports'],
});
```
