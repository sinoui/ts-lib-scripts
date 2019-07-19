### 预览文档

```shell
yarn doc:dev
```

### 编译并打包文档

```shell
yarn doc:publish
```

### 发布文档

在发布文档之前，在`package.json`中配置好`homepage`，如下所示：

```json
{
  "homepage": "https://sinouiincubator.github.io/editable-data-table"
}
```

配置完之后就可以执行下面的命令行发布文档：

```shell
yarn doc:publish
```
