# 变更说明

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
