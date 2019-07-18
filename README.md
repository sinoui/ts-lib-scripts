---
title: ts-lib-scripts
---

ts-lib-scripts，一个以 🚀 速度创建零配置 TypeScript 库项目的命令行工具。

尽管 TypeScript 最近很火爆，但是要设置一个 TypeScript 库仍然很困难。ts-lib-scripts 能让你轻松创建、构建、测试和发布 TypeScript 库。别再浪费一个下午时间来处理[TypeScript](http://www.typescriptlang.org/)、[Rollup](https://github.com/rollup/rollup)、[Babel](https://babeljs.io)、[ESLint](https://eslint.org/)、`tsconfig.json`、[Yarn](https://yarnpkg.com/)、[Prettier](https://prettier.io)和[VSCode](https://code.visualstudio.com/)之间的和谐共处，用 ts-lib-scripts 来帮你节省出这些时间：

```shell
npx ts-lib-scripts create my-ts-lib
```

- [特性](#%E7%89%B9%E6%80%A7)
- [快速开始](#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B)
  - [`yarn start`](#yarn-start)
  - [`yarn build`](#yarn-build)
  - [`yarn lint`](#yarn-lint)
  - [`yarn format`](#yarn-format)
  - [`yarn test`](#yarn-test)
- [优化](#%E4%BC%98%E5%8C%96)
  - [开发日志](#%E5%BC%80%E5%8F%91%E6%97%A5%E5%BF%97)
  - [warning](#warning)
  - [使用 lodash](#%E4%BD%BF%E7%94%A8lodash)
  - [babel helpers](#babel-helpers)
  - [polyfill](#polyfill)
  - [tree shaking](#tree-shaking)
- [灵感](#%E7%81%B5%E6%84%9F)
- [ts-lib-scripts 不是什么](#ts-lib-scripts%E4%B8%8D%E6%98%AF%E4%BB%80%E4%B9%88)
- [下一步](#%E4%B8%8B%E4%B8%80%E6%AD%A5)
- [API](#api)
  - [`ts-lib-scripts create`](#ts-lib-scripts-create)
  - [`yarn start` (`ts-lib-tools start`)](#yarn-start-ts-lib-scripts-start)
  - [`yarn build` (`ts-lib-tools build`)](#yarn-build-ts-lib-scripts-build)
  - [`yarn lint` (`ts-lib-tools lint`)](#yarn-lint-ts-lib-scripts-lint)
  - [`yarn format` (`ts-lib-tools format`)](#yarn-format-ts-lib-scripts-format)
  - [`yarn test` (`ts-lib-tools test`)](#yarn-test-ts-lib-scripts-test)

## 特性

ts-lib-scripts 关注构建 TypeScript 库需要的元素，并提供一些开箱即用的特性：

- 🎯 使用[Rollup](https://github.com/rollup/rollup)打包你的代码，支持`CJS`、`UMD`、`ESM`输出格式和`development`、`production`模式。当然，还有.d.ts 文件。
- 📦 支持 tree-shaking，内置 lodash 优化、babel helpers、代码压缩，节省代码大小。
- 💄 友好的日志输出。
- 💯 内置 ESLint 和 Prettier 支持，让代码错误无所遁形。
- 🏎️ 针对 Git、GitHub 和 VSCode 做调优，完美的编程体验。
- ✨ 内含非常智能的`Jest`配置，`yarn test`即可享受美妙的单元测试。
- 🎣Babel 宏：轻松扩展 Babel 配置。
- 🎉 无须配置，只需一个命令行。

## 快速开始

ts-lib-scripts 需要[Node.js 10+](https://nodejs.org/)和[Yarn](https://yarnpkg.com/)。

打开命令行，执行以下命令：

```shell
npx ts-lib-scripts create my-ts-lib

cd my-ts-lib
code .
yarn start
```

使用 VSCode 打开`src/index.ts`，开始构建你的 TypeScript 库吧。

项目结构：

```
my-ts-lib
|__ .vscode
|__ src
|__ .editorconfig
|__ .gitignore
|__ package.json
|__ README.md
|__ tsconfig.json
```

创建的`my-ts-lib`项目有很多有用的命令可用。如下介绍。

### `yarn start`

在开发和监听模式下启动项目。当代码发生变化时就会重新编译代码。它同时会实时地向你汇报项目中的代码错误。

### `yarn build`

打包，并将打包文件放在`dist`文件夹中。使用 rollup 对代码做优化并打包成多种格式（`Common JS`，`UMD`和`ES Module`）。

### `yarn lint`

`yarn lint`会检查整个项目是否有代码错误、风格错误。

开启 vscode 的 eslint、prettier 插件，在使用 vscode 编码时，就会自动修正风格错误、提示语法错误。

### `yarn format`

`yarn format`可以自动调整整个项目的代码风格问题。

### `yarn test`

`yarn test`以监听模式启动 jest，运行单元测试。

开启 vscode 的 jest 插件，会在文件变化时自动运行单元测试。

## monorepo (v0.3.0)

从 0.3.0 开始，`ts-lib-scripts`支持生成 monorepo 结构的项目：

```shell
npx ts-lib-scripts create my-ts-lib --monorepo
```

生成的项目结构如下：

```text
my-ts-lib
|__ .vscode
|__ pacakges
|__ .editorconfig
|__ .gitignore
|__ lerna.json
|__ package.json
|__ README.md
|__ tsconfig.json
```

采用[lerna](https://github.com/lerna/lerna)管理模块的依赖和发布，所有模块都放在 pacakges 目录中。有以下几个命令行可用：

- `yarn build` - 编译所有模块
- `yarn lint` - 检查所有模块的代码
- `yarn test` - 以监听者模式执行所有模块的单元测试
- `yarn lerna publish` - 发布
- `yarn gen` - 添加新模块。例如：`yarn gen module-a`。
- `yarn lerna add` - 添加依赖。

可以为所有模块添加依赖，如给所有模块添加`ts-lib`依赖：

```shell
yarn lerna add ts-lib
```

也可以为单个模块添加依赖：

```shell
yarn lerna add immer --scope=module-a
```

## 优化

前端代码的大小是前端项目中至关重要的指标，但是压缩代码大小不能以牺牲开发者体验为代价。ts-lib-scripts 做代码优化就是本着这个原则来的。

### 开发日志

我们在开发时需要很多日志来记录和展示代码的运行情况，但是这些日志又不想打包到生产环境中去。使用 ts-lib-scripts，可以实现这种愿望。

我们的代码如下：

```ts
function sum(a: number, b: number) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`调用sum方法：${a} + ${b} = ${a + b}`);
  }

  return a + b;
}
```

打包之后，在`dist`目录下生成下面三个文件：

`index.js`:

```js
'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./ts-lib-scripts-example.cjs.production.js');
} else {
  module.exports = require('./ts-lib-scripts-example.cjs.development.js');
}
```

`my-ts-lib.cjs.development.js`:

```js
'use strict';

function sum(a, b) {
  {
    console.log(
      '调用sum方法：'
        .concat(a, ' + ')
        .concat(b, ' = ')
        .concat(a + b),
    );
  }

  return a + b;
}

exports.sum = sum;
```

`my-ts-lib.cjs.production.js`:

```js
'use strict';

exports.sum = function(t, r) {
  return t + r;
};
```

如你所见，ts-lib-scripts 在生成生产模式（production mode）包时是会剔除掉`process.env.NODE_ENV !== 'production'`而不会影响到开发模式（development mode）包。所以，你可以尽情地编写一些开发日志而不用担心加大生产包的大小。

### warning

[warning](https://github.com/BerkeleyTrue/warning)是非常有用的产生开发日志的库。用法如下：

```js
// some script
var warning = require('warning');

var ShouldBeTrue = false;

warning(
  ShouldBeTrue,
  'This thing should be true but you set to false. No soup for you!',
);
//  'This thing should be true but you set to false. No soup for you!'
```

ts-lib-scripts 会将`warning`代码转换成`process.env.NODE_ENV !== 'production'`代码，如下所示：

```js
warning(condition, argument, argument);
```

会被替换成：

```js
if ('production' !== process.env.NODE_ENV) {
  warning(condition, argument, argument);
}
```

### 使用 lodash

[lodash](https://www.lodashjs.com)是前端的瑞士军刀，在前端出现频次非常高，但是 lodash 库很大。ts-lib-scripts 内置了 lodash 打包优化。

要使用 lodash，你需要先安装 lodash：

```shell
yarn add lodash lodash-es @types/lodash
```

然后在你的代码中自由使用 lodash：

```js
// ./src/index.ts
import { kebabCase } from 'lodash';

export const KebabLogger = (msg: string) => {
  console.log(kebabCase(msg));
};
```

ts-lib-scripts 会将上面的代码翻译成：

```js
import o from 'lodash-es/kebabCase';
const e = (e) => {
  console.log(o(e));
};
export { e as KebabLogger };
```

也就是说，ts-lib-scripts 将`import kebabCase from 'lodash/kebabCase'`转换成了`import o from 'lodash-es/kebabCase'`。这样这些 lodash 代码可以被 treeshaking 优化。

### babel helpers

ts-lib-scripts 使用 Babel 编译 TypeScript，在转换 ES6 语法时，需要一些胶水代码才能转换成 ES5 语法。如类：

`index.js`:

```ts
export class Pointer {
  construcor(private x: number, private y: number) {}

  move(x: number, y: number) {
    return new Point(this.x + x, this.y + y);
  }
}
```

不经过优化编译后的代码如下：

```js
'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/* eslint-disable import/prefer-default-export */
var Pointer =
  /*#__PURE__*/
  (function() {
    function Pointer(x, y) {
      _classCallCheck(this, Pointer);

      this.x = x;
      this.y = y;
    }

    _createClass(Pointer, [
      {
        key: 'move',
        value: function move(x, y) {
          return new Pointer(this.x + x, this.y + y);
        },
      },
    ]);

    return Pointer;
  })();

exports.Pointer = Pointer;
//# sourceMappingURL=my-ts-lib.cjs.development.js.map
```

编译后的代码中有`_classCallCheck`、`_createClass`、`_defineProperties`三个函数，这三个函数就是为了支持 ES6 类语法的胶水代码，我们称之为 babel helpers。

如果我们的库代码中包含了这样的代码，那么被其他项目引用后，就很可能出现重复的这样的代码，这样就增加了应用的大小。

我们可以将胶水代码改成引用 babel helpers 相关的库。经过优化后，编译的代码如下：

```js
'use strict';

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var _classCallCheck = _interopDefault(
  require('@babel/runtime/helpers/classCallCheck'),
);
var _createClass = _interopDefault(
  require('@babel/runtime/helpers/createClass'),
);

/* eslint-disable import/prefer-default-export */
var Pointer =
  /*#__PURE__*/
  (function() {
    function Pointer(x, y) {
      _classCallCheck(this, Pointer);

      this.x = void 0;
      this.y = void 0;
      this.x = x;
      this.y = y;
    }

    _createClass(Pointer, [
      {
        key: 'move',
        value: function move(x, y) {
          return new Pointer(this.x + x, this.y + y);
        },
      },
    ]);

    return Pointer;
  })();

exports.Pointer = Pointer;
//# sourceMappingURL=my-ts-lib.cjs.development.js.map
```

这样的 ES6 语法胶水代码还很多，包括`async/await`语法。

### polyfill

实践证明，babel 现在在自动引入 polyfill 方面做得还不是特别好。所以 ts-lib-scripts 不会自动插入新 API 的补丁引用。当你的库使用到新的 API，但是又需要支持旧浏览器，你就需要在库的醒目位置（如 README.md 文档）提示使用者需要引入这些新 API 的 polyfill。

### tree shaking

ts-lib-scripts 使用 rollup 做打包，所以支持 tree shaking。

tree-shaking 特性会将应用中没有使用到的代码在最终打包时剔除掉。

ts-lib-scripts 使用[babel-plugin-annotate-pure-calls](https://github.com/Andarist/babel-plugin-annotate-pure-calls)插件辅助产生`#__PURE__`注释，以使项目充分利用 tree shaking 剔除无用代码。

## 灵感

日常工作中经常需要创建 TypeScript 库，但是每次都需要从零开始设置配置。用惯[create-react-app](https://github.com/facebook/create-react-app)创建小应用后，创建一个类似的简单易用的工具的想法就变得非常强烈。偶然间遇到[tsdx](https://github.com/palmerhq/tsdx)，哇喔，多简洁的工具呀。可惜跟我想要的还差一些距离，而所在的团队又急切需要这方面的工具，所以就出来了这样的一个轮子，满足日常需求。

## ts-lib-scripts 不是什么

ts-lib-scripts 只关注如何构建 TypeScript 库，不关注其他方面的需求。你如果想构建 React 应用，请使用[create-react-app](https://github.com/facebook/create-react-app)、[Next.js](https://github.com/zeit/next.js)等工具；如果你想构建 JavaScript 库，看看[microbundle](https://github.com/developit/microbundle)；如果想构建大型应用，您最好研究一下[Webpack](https://webpack.js.org)。

## 下一步

ts-lib-scripts 会围绕着 TypeScript 库的开发、构建、部署体验继续前进，与周边工具继续加强关联性，如 VSCode、Git、Github、CircleCI、Docker 等。

近期规划清单：

- [ ] 更易用的 ts-lib-scripts 文档
- [x] 支持 React (0.2.0)
- [ ] 添加 demo 支持
- [ ] 文档支持：docusaurus（针对普通库）
- [x] 文档支持：docz（针对 React 组件库） (0.2.0)
- [ ] TypeScript 编译缓存，提升 TypeScript 编译速度
- [ ] 默认启用 UMD（正在提升 UMD 打包体验）
- [ ] 文档：CircleCI 集成
- [ ] Git：提交前检查提交注释（git commit message）
- [ ] vscode：添加默认的 demo 调试配置
- [ ] vscode：推荐安装的插件清单
- [ ] npm：发布包命令（类似如`lerna publish`）
- [ ] eject
- [ ] 文档：迁移指南
- [ ] 其他类型的文件编译处理

中期规划清单：

- [ ] 使用 16 倍速的[swc](https://github.com/swc-project/swc)编译 TypeScript 代码（等着 swc 的成熟）
- [ ] 英文文档
- [x] monorepo 支持
- [ ] 分离的 ES Module 支持（不合并文件，只针对单个文件进行编译处理）

## API

### `ts-lib-scripts create`

TODO

### `yarn start` (`ts-lib-tools start`)

TODO

### `yarn build` (`ts-lib-tools build`)

TODO

### `yarn lint` (`ts-lib-tools lint`)

TODO

### `yarn format` (`ts-lib-tools format`)

TODO

### `yarn test` (`ts-lib-tools test`)

TODO
