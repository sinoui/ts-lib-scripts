# jest-resolver-tsconfig-paths

jest 支持[tsconfig paths](http://www.typescriptlang.org/docs/handbook/module-resolution.html)规则。

识别项目根目录下的`tsconfig.json`中的`paths`配置，并作为模块路径解析的优先规则。使用[tsconfig-paths](https://github.com/dividab/tsconfig-paths)库支持 tsconfig paths。

在 Jest 中的配置：

```json
{
  "resolver": "jest-resolver-tsconfig-paths"
}
```
