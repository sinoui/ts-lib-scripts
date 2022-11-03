# 变更说明

# 0.14.6 - 2022.11.3

- chore(ts-lib-tools): gen-module 脚本支持指定新建模块所在的文件夹名称

# 0.14.5 - 2022.5.19

- improve(eslint-config-ts-lib): eslint 从 7.x 升级到 8.15.0

## 0.14.4 - 2022.5.7

- improve(eslint-config-ts-lib): 改进执行 lint 的速度
- fix(eslint-config-ts-lib): 修复 prettier 和 eslint 规则冲突的缺陷
- breadchange(eslint-config-ts-lib): 增加 jsdoc 和 typescript 类型显式声明的规则
- improve(ts-lib-scripts): 启用 eslint 的缓存
- improve(ts-lib-scripts): 升级 husky 和 lint-staged
- fix(ts-lib-tools): 修复在 monorepo 模式下打包之后再执行单元测试，有可能报 `package.json` 和 `dist/package.json` 名称相同的冲突
- improve(ts-lib-tools): 升级 @babel/core 到 7.17.10 版本

## v0.14.3 - 2021.8.19

- fix(ts-lib-tools): 修复打包时包含了 jest 的 `__snapshots__` 目录的缺陷

## v0.14.2 - 2021.8.19

- fix(ts-lib-tools): 修复打包时包含了 jest 的 `__snapshots__` 目录的缺陷
- fix(ts-lib-tools): 修复新建的 monorepo 子模块发布之前不编译和发布失败的缺陷
- fix(ts-lib-tools): 修复执行 monorepo 子模块中的单元测试失败的缺陷（失败的原因：在部分情况下， jest 会解析到 `dist` 目录下的 `package.json` 文件）

## v0.14.1 - 2021.8.5

- fix(babel-preset-ts-lib): 修复总是出现 @babel/plugin-proposal-private-methods loose 警告的缺陷

## v0.14.0 - 2021.3.25

- feat: 支持新的 JSX 转换 ([#38](https://github.com/sinoui/ts-lib-scripts/issues/38))

## v0.13.11 - 2021.3.24

- fix(ts-lib-tools): 修复代码中引入 node_modules 中的 css 文件，导致 jest 单元测试执行失败的缺陷

## v0.13.10 - 2020.10.16

- fix(eslint-config-ts-lib): 禁用 react/no-unused-prop-types 规则
- fix(eslint-config-ts-lib): 去掉不存在的 @typescript-eslint/camelcase

## v0.13.9 - 2020.10.15

- fix(eslint-config-ts-lib): 修复 eslint 不检测 react hooks 的依赖的缺陷

## v0.13.8 - 2020.10.15

- fix(eslint-config-ts-lib): 禁用 react/require-default-props，不推荐使用

## v0.13.7 - 2020.10.14

- fix(eslint-config-ts-lib): 禁用 no-undef，并重新定义 @typescript-eslint/no-unused-vars

## v0.13.6 - 2020.10.13

- fix(eslint-config-ts-lib): 修复发布 npm 模块时缺少 js 文件的缺陷

## v0.13.5 - 2020.10.13

- fix(eslint-config-ts-lib): 修复 eslint 错误提示

## v0.13.4 - 2020.9.28

- fix(eslint-config-ts-lib): 修复 eslint 错误提示

## v0.13.3 - 2020.9.27

- fix(eslint): 修复 eslint 不支持 ts 4.0 的缺陷

## v0.13.2 - 2020.9.10

- feat: 支持 webworker 场景

## v0.13.1 - 2020.8.31

- fix(ts-lib-scripts): 修复`-simple`打包模式下发布的 npm 包没有`types`和`dist`的缺陷

## v0.13.0 - 2020.8.22

- BREAKCHANGE: 去掉 babel-plugin-clean-type-import-export 模块，推荐采用 ts 3.8 语法代替此模块的作用

  ```ts
  import A, { B, C, D, E } from './C';

  export {
    A,
    /* type */
    B,
    // type
    C,
  };
  ```

  -->

  ```ts
  import A, { D, E } from './C';
  export { A };

  export type { B, C } from './C';
  ```

- feat: 升级 typescript 3.9 -> 4.0.2

## v0.12.1 - 2020.7.17

- fix(ts-lib-scripts): 修复 eslint 关于 vscode 的配置警告

  ```json
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    { "language": "typescript", "autoFix": true },
    { "language": "typescriptreact", "autoFix": true }
  ],
  ```

  -->

  ```json
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  ```

- chore(ts-lib-scripts): 去掉无用的 src/tsconfig.json
- chore(ts-lib-tools): 升级 jest 24 -> 26

## v0.12.0 - 2020.6.16

- feat(eslint-config-ts-lib): eslint 支持 cypress

## v0.11.6 - 2020.5.17

- fix(ts-lib-tools): 修复单元测试不识别 setupTests.ts 配置文件的错误

## v0.11.5 - 2020.5.17

- fix(ts-lib-tools): 修复单元测试不识别 setupTests.ts 配置文件的错误

## v0.11.4 - 2020.4.26

- fix(ts-lib-scripts): 修复 docz 配置错误

## v0.11.3 - 2020.4.8

- fix(babel-preset-ts-lib): 修复在 Jest 测试时无法使用 `jest-styled-components` 提供的 `toHaveStyleRule` 方法
- chore(babel-preset-ts-lib): 更新依赖版本

## v0.11.2 - 2020.3.28

- fix(ts-lib-tools): 修复 tsc 执行失败控制台提示信息不友好的缺陷

## v0.11.0 - 2020.3.23

- feat: 支持 typescript3.8 版本

## v0.10.3 - 2020.2.25

- fix(ts-lib-scripts): 修复打包时找不到 build/es6 目录的缺陷

## v0.10.2 - 2020.2.24

- fix(ts-lib-tools): 修复 simple 发布失败的缺陷

## v0.10.1 - 2020.2.9

- fix(ts-lib-scripts): 修复生成的模块没有 tsconfig.simple.release.json 文件的缺陷

## v0.10.0 - 2020.2.9

- feat(ts-lib-tools): 支持 simple 模式打包

  ```shell
  yarn build --simple
  ```

  生成的打包文件：

  ```
  dist
  |__ index.js
  |__ index.d.ts
  |__ sub-pkg
    |__ index.js
    |__ index.d.ts
    |__ package.json
  |__ esm
    |__ index.js
    |__ sub-pkg
      |__ index.js
  |__ package.json
  ```

## v0.9.5 - 2020.2.4

- fix(ts-lib-tools): docs、stories 变化不应执行单元测试

## v0.9.4 - 2020.1.21

- fix(ts-lib-tools): 修复在非 monorepo 模式下打包失败的缺陷

## v0.9.3 - 2020.1.19

- feat(ts-lib-tools): 从 ts-lib.config.json 中读取 `skipTsc` 参数

## v0.9.2 - 2020.1.19

- fix(ts-lib-tools): 修复模块发布时，上传不正确的文件的缺陷

## v0.9.1 - 2020.1.19

- fix(ts-lib-tools): 修复打包失败的缺陷

## v0.9.0 - 2020.1.19

- feat(ts-lib-tools): `yarn build` 支持 `--skip-tsc` 选项
- fix(ts-lib-tools): 修复 tsc 执行失败未结束编译的缺陷
- fix(ts-lib-tools): 修复从低版本升级到 0.8.0+之后打包后没有引用到 ts 类型文件的缺陷

## v0.8.7 - 2020.1.16

- chore(ts-lib-scripts): .gitattributes 中添加 `\*.snap` 文件的换行符定义
- fix: 去掉 \*_/_.json 配置，以修复 tsc 编译失败
- chore(ts-lib-tools): tsc 打包时过滤掉测试文件

## v0.8.6 - 2019.12.26

- fix(ts-lib-tools): 修复无法编译 css 的缺陷
- fix(babel-plugin-clean-type-import-export): 修复清除了已有引用的 `import as` 表达式的缺陷

## v0.8.5 - 2019.12.26

- fix(eslint-config-ts-lib): 修复编写 storybook 时提示依赖包没有定义在 dependencies 的错误

## v0.8.4 - 2019.12.26

- fix(ts-lib-tools): 修复生成小模块丢失 include 关键配置的缺陷

## v0.8.3 - 2019.12.25

- fix(ts-lib-tools): 修复编译 ts 时报无法找到 json 文件的错误
- fix(ts-lib-tools): 修复项目中引入图片、svg、json 等文件，ts 提示错误的缺陷
- improve: 改善 module css 的语法提示
- fix(babel-reset-ts-lib): 修复不支持空合并语法的缺陷

## v0.8.2 - 2019.12.15

- fix(ts-lib-tools): rollup 打包时，去掉 ts 类型导入、导出，避免打包失败

## v0.8.1 - 2019.12.13

- fix(ts-lib-tools): 修复 src/.d.ts 文件拷贝错误

## v0.8.0 - 2019.12.13

- improve: 采用 tsc 编译生成 .d.ts 文件
- fix(babel-preset-ts-lib): 修复打包的代码无法在旧版本浏览器上运行的缺陷
- chore(eslint-config-ts-lib): 去掉不常用的 eslint 规则，包括
  - 去掉 `import/no-webpack-loader-syntax`
  - `@typescript-eslint/camelcase` 对测试文件和 stories 文件放开
  - `no-underscore-dangle` 对 `__REDUX_DEVTOOLS_ExTENSION__` 放开
  - 去掉 `no-useless-constructor`
  - `no-console` 对 `stories` 和 `examples` 放开
  - 去掉 `no-empty-function`
  - 去掉 `class-methods-use-this`
  - `no-param-reassign` 对 `ref.current` 放开

## v0.7.2 - 2019.12.11

- fix(eslint-config-ts-lib): 去掉 import/no-named-as-default 规则

## v0.7.1 - 2019.12.10

- fix(eslint-config-ts-lib): 修复 import/extensions 误报 ts, tsx 文件引入错误

## v0.7.0 - 2019.12.10

- feat: 支持 ts 3.7 新语法
- feat: 调整 eslint 规则，去掉不再使用的规则

## v0.6.0 - 2019.12.10

- feat(ts-lib-tools): 新增图片的编译

## v0.5.3 - 2019.12.9

- fix(ts-lib-tools): 修复 jest 无法解析 `.module.css` 文件的错误

## v0.5.2 - 2019.11.1

- fix(ts-lib-scripts): 修复 lint-staged 配置错误
- fix(eslint-config-ts-lib): 修复单元测试代码提示 `import/no-extraneous-dependencies` 错误
- fix(ts-lib-tools): 修复无法添加 Jest 初始化配置文件的缺陷 ( #24 )

## v0.5.1 - 2019.11.1

- fix(ts-lib-tools): 修复非 monorepo 模式下，单元测试会阻止打包命令执行的错误 ( #23 )

## v0.5.0 - 2019.10.21

- feat(babel-preset-ts-lib): 内置 babel-plugin-styled-components

## v0.4.9 - 2019.10.18

- fix(ts-lib-scripts): 修复无法发布 docz 文档的缺陷

## v0.4.8 - 2019.10.8

- fix(ts-lib-scripts): 修复 git 换行符问题
- fix(ts-lib-scripts): 修复 React 项目模板的单元测试错误
- fix(ts-lib-scripts): 修复 docz 文档模板中 index.html 错误
- fix(ts-lib-scripts): 默认请用 vscode 的 `eslint.autoFixOnSave` （eslint 插件的自动保存功能）

## v0.4.7 - 2019.9.3

- fix(eslint-config-ts-lib): 关闭标准缩进和 typescript 缩进规则，只保留 prettier 缩进规则

## v0.4.6 - 2019.9.2

- fix(ts-lib-scripts): 修复 monorepo 模板中 lint-staged 范围配置错误

## v0.4.5

- improve(eslint-config-ts-lib): eslint 集成 prettier 的 fix 功能
- fix(ts-lib-tools): 修复 monorepo 下生成的模块发布时没有带上 dist 目录的缺陷
- fix(ts-lib-tools): 修复打包 esm 时，没有按照 production 模式发布的缺陷

## v0.4.4 - 2019.8.20

- fix(ts-lib-scripts): 修复在 doc:dev 时，`yarn build`失败的缺陷 (#20)

## v0.4.3 - 2019.8.20

- fix(eslint-config-ts-lib): 调整 eslint 规则
  - 禁用：react/jsx-props-no-spreading
  - 禁用：no-explicit-any
  - 启用：允许未使用的`_arg`(@typescript-eslint/no-unused-vars)
  - 启用：允许未使用的`const {arg, ...rest} = obj;`的`arg`变量(@typescript-eslint/no-unused-vars)
  - 启用：允许`console.warn`和`console.error` (no-console)
  - 启用：允许在单元测试中使用`console` api (no-console)

## v0.4.2 - 2019.8.20

- fix(ts-lib-tools): 修复 dist 目录中多出以模块名为名称的文件夹的缺陷

## v0.4.1 - 2019.8.20

- fix(ts-lib-tools): 修复缺少 jest-resolver-tsconfig-paths 依赖的错误

## v0.4.0 - 2019.8.20

- feat: 规范 vscode 的换行符和缩进
- fix(ts-lib-tools): 修复在 monorepo 模式下执行 jest 单元测试失败的缺陷
- fix(ts-lib-tools): 修复 monorepo 模式下，yarn lint 找不到文件的缺陷
- fix(ts-lib-scripts): 修复 monorepo 模式，lint-staged 配置错误
- fix: 修复 prepublishOnly 在 monorepo 模式下配置错误
- feat(ts-lib-tools): 生成模块时添加上许可证信息
- fix(ts-lib-tools): 修复`gen`生成的模块缺少.gitignore，导致将很多临时文件发布到 npm 仓库的缺陷
- fix(ts-lib-scripts): 修复 monorepo 模式，tsconfig.json 的 includes 配置错误
- fix(ts-lib-scripts): 修复 monorepo 模式，tsconfig.json 中的 paths 配置错误
- fix(eslint-config-ts-lib): eslint 的 import/no-unresolved 无法解析`tsconfig.json`的`paths`缺陷
- fix(ts-lib-scripts): 修复 docz 文档中无法解析 ts paths 的错误
- fix(ts-lib-tools): 修复 monorepo 中，单元测试包含对模块引用导致单元测试失败的缺陷
- feat: jest 24.8.0 -> 24.9.0
- feat: eslint 5.16.0 -> 6.1.0
- fix(ts-lib-tools): 修复 lint 命令行范围错误
- fix(ts-lib-tools): package.json 中的 esm 包应引用.esm.development.js 文件 (#18)
- improve(ts-lib-tools): 不需要打包.esm.production.js (#18)
- BREADK CHANGE(ts-lib-scripts): package.json 的`module`引用`<moduelName>.esm.js`
- fix(ts-lib-tools): 修复 monorepo 模式下打包时.d.ts 文件路径错误

### 破坏性变更

变更 1：

由于 eslint 相关插件的升级，eslint 规则有所变化，需要在项目中执行下面的命令行：

```shell
yarn lint --fix
```

变更 2：

package.json 的`module`从`<moduleName>.es.prodution.js`改成了`<moduleName>.esm.js`。已经使用 ts-lib-scripts 的项目会在`build`时自动调整`module`。

## v0.3.5

- chore(ts-lib-scripts): 调整 jest-dom 为@testing-library/jest-dom
- chore(ts-lib-scripts): 添加@testing-library/react-hooks，方便做 react hooks 的单元测试

## v0.3.4

- fix(ts-lib-scripts): 修复未开启 docz，但是生成项目的 README.md 中有 doc 相关命令行说明的缺陷

## v0.3.3 - 2019.7.19

- fix(ts-lib-scripts): 修复 monorepo 项目中多出 src 目录的缺陷

## v0.3.2 - 2019.7.19

- fix(ts-lib-scripts): 修复 monorepo 项目中多出 src 目录的缺陷

## v0.3.1 - 2019.7.19

- fix(ts-lib-scripts): 修复 tsconfig 配置错误，导致 ts 找不到内部模块的缺陷

## v0.3.0 - 2019.7.19

- feat(babel-preset-ts-lib): babel 支持从 tsconfig.json 文件中读取`paths`，作为自定义的模块路径映射
- feat: 支持 monorepo
- fix(ts-lib-scripts): 修复 docz 若干问题

## v0.2.17 - 2019.7.18

- fix(ts-lib-tools): 修复依赖关系错误

## v0.2.16 - 2019.7.18

- fix(ts-lib-tools): 修复依赖关系错误

## v0.2.15 - 2019.7.17

- fix(ts-lib-tools): 修复包括 lodash 导致单元测试失败的缺陷 (#13)

## v0.2.14 - 2019.7.15

- fix(ts-lib-tools): 修复生成 jest 配置错误。

## v0.2.13 - 2019.7.15

- improve(ts-lib-tools): 改进 jest 的监听范围，不再监听生成的文件。

## v0.2.12 - 2019.7.9

- fix(webpack-docz-ghpages-plugin): 修复实现错误

## v0.2.11 - 2019.7.9

- fix(webpack-docz-ghpages-plugin): 修复包主文件错误

## v0.2.10 - 2019.7.9

- fix: 修复 docz 文档发布到 ghpages 上之后，刷新页面进入 404 的缺陷

对于已有项目，手动调整一下：

1. 添加 webpack-docz-ghpages-plugin 依赖

   ```shell
   yarn add webpack-docz-ghpages-plugin --dev
   ```

2. 调整`doczrc.js`文件：

   ```diff

   +  config.plugin('ghpages').use(require('webpack-docz-ghpages-plugin'));

      return config;
   ```

## v0.2.9 - 2019.7.9

- fix(ts-lib-scripts): 修复发布文档命令错误

对于已有项目，手动调整一下`package.json`:

```diff
-  "doc:publish": "docz dev && gh-pages -d .docz/dist"
+  "doc:publish": "docz build && gh-pages -d .docz/dist"
```

## v0.2.8 - 2019.7.8

- fix(ts-lib-tools): 代码中包含@sinoui, sinoui-components 时，jest 单元测试失败
- fix(ts-lib-scripts): 修复 typescript 自动导入时引入了 amd 路径的错误

## v0.2.7 - 2019.7.8

v0.2.6 发布失败，再次发布。

## v0.2.6 - 2019.7.8

- fix(eslint-config-ts-lib): 去掉多余的 react 属性校验

## v0.2.5 - 2019.6.27

- fix(ts-lib-scripts): 修复 GIT 换行符配置错误

对于历史项目，可以手动调整`.gitattributes`文件：

```ini
*.ts text eol=lf
*.tsx text eol=lf
*.js text eol=lf
*.jsx text eol=lf
*.md text eol=lf
*.mdx text eol=lf
*.json text eol=lf
*.lock text eol=lf
.editorconfig text eol=lf
.gitignore text eol=lf
.gitattributes text eol=lf
*.txt text eol=lf
LICENSE text eol=lf

[core]
  autocrlf=input
  safecrlf=true
```

## v0.2.4 - 2019.6.27

- fix(ts-lib-scripts): 修复 GIT 换行符配置错误

对于历史项目，可以手动调整`.gitattributes`文件：

```ini
*.ts text
*.tsx text
*.js text
*.jsx text
*.md text
*.mdx text
*.json text
*.lock text
.editorconfig text
.gitignore text
.gitattributes text
*.txt text
LICENSE text

[core]
  autocrlf=input
  safecrlf=true
```

## v0.2.3 - 2019.6.10

- fix(ts-lib-scripts): 修复 gitattributes 配置错误

## v0.2.2 - 2019.6.6

- fix(babel-preset-ts-lib): 修复 jest 可能执行失败的缺陷

## v0.2.1 - 2019.6.6

- fix(ts-lib-tools): 修复打包失败却没有正常结束打包进程的错误

## v0.2.0 - 2019.6.6

- feat: 创建 React 组件库 🌈
- feat(ts-lib-scripts): 创建项目时，可指定域名项目名称，如：`npx ts-lib-scripts create @sinoui/my-ts-lib`。
- feat(ts-lib-tools): 支持在`src`中直接定义`.d.ts`文件
- fix(ts-lib-tools): 修复`index.ts`中导出了 ts 类型导致编译失败的缺陷
- feat(eslint-config-ts-lib): eslint 检查支持 immer
- fix(ts-lib-scripts): 修复 git 换行符问题
- feat(ts-lib-tools): 打包前清除`dist`文件
- fix(ts-lib-tools): 修复打包失败却仍可发布的缺陷
- fix(ts-lib-tools): 包含 async/await 代码时导致`start`失败的缺陷
- fix(ts-lib-scripts): 修复无法在 mac 创建项目的缺陷
- fix(eslint-config-ts-lib): 修复 prettier 与 react eslint 规则冲突的缺陷
- feat(ts-lib-scripts): 启用[ts incremental](https://devblogs.microsoft.com/typescript/announcing-typescript-3-4/#faster-subsequent-builds-with-the---incremental-flag)

对于历史项目，需要手动调整：

1. 升级`ts-lib-tools@0.2.0`：

   ```json
   {
     "devDependencies": {
       "ts-lib-tools": "^0.2.0"
     }
   }
   ```

2. 为了更好的解决换行符的问题，可以在项目的根目录下添加`.gitattributes`文件，内容如下：（选做）

   ```ini
   [core]
     autocrlf = input
     safecrlf = true
   ```

3. 在`tsconfig.json`中添加`incremental`：（可选）

   ```json
   {
     "compilerOptions": {
       "increumental": true
     }
   }
   ```
