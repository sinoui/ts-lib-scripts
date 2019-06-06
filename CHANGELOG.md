# 变更说明

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
