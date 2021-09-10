/* eslint-disable no-console */
import chalk from 'chalk';

export const successMessage = (cmd: string, projectName: string): void => {
  console.log(`  ${chalk.green('棒极了！')}你现在可以编码了。
        
    已经运行了${chalk.cyan(`${cmd} install`)}，接下来：
    ${chalk.cyan(`cd ${projectName}`)}

    开始开发（在变更时重新构建）：
    ${chalk.cyan(`yarn start`)}

    打包：
    ${chalk.cyan('yarn build')}

    测试：
    ${chalk.cyan('yarn test')}
  `);
};

export const failureMessage = (cmds: string[]): void => {
  console.error(
    `${'\n\n'}安装依赖失败，但是项目已经准备好，请打开项目，执行下面的命令行安装相关依赖：${'\n\n    '}${chalk.green(
      cmds.join('\n    '),
    )}${'\n\n'}`,
  );
};

export const dependenciesMessage = (
  dependencies: string[],
  devDependencies: string[],
): string => {
  return `安装依赖：${'\n    '}${chalk.bold.cyan(
    dependencies.join('\n    '),
  )}${'\n  devDependencies:\n    '}${chalk.bold.cyan(
    devDependencies.join('    '),
  )}`;
};
