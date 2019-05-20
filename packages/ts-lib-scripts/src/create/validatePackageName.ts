/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import validate from 'validate-npm-package-name';
import chalk from 'chalk';

/**
 * 验证模块名
 *
 * @param packageName 模块名
 */
export function validatePackageName(packageName: string) {
  const result = validate(packageName);
  if (!result.validForNewPackages) {
    console.error(`${chalk.red(
      `指定的库名称不符合规范，原因是：
    ${result.warnings.map((msg: string) => `* ${msg}`).join('\n')}`,
    )}


${chalk.yellow(`请阅读以下规范，重新取名：

1. 所有字符必须是小写的
2. 可以使用连字符连接多个单词，如my-ts-lib
3. 不能以.或者_开头
4. 不能包含空格
5. 不能包含~)('!*
6. 不能与node、npm中的核心模块名冲突，如
  * http
  * stream
  * node_modules
  * favicon.ico
7. 长度不能超过214`)}

示例：

* my-ts-lib
* my-component
* @scope/package-name
    `);

    return false;
  }

  return true;
}
