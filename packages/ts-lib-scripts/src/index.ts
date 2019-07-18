/* eslint-disable no-console */
import { Command } from 'commander';
import chalk from 'chalk';
import { cliPackageInfo } from './config/paths';
import create from './create';

const program = new Command('ts-lib-scripts');
program.version(cliPackageInfo.version);

program
  .command('create <projectName>')
  .description('创建TypeScript项目。')
  .option('--packageVersion <version>', '项目版本号', '0.1.0')
  .option(
    '--packageName <name>',
    '项目名称，默认与projectName。packageName用于package.json中的name，而projectName则用于项目的根目录名称。',
  )
  .option('--target <target>', '库构建的目标，可选项为web和node', 'web')
  .option('-i', '以交互的方式创建项目')
  .option('--packageDescription,-d <description>', '添加项目描述')
  .option('--author <author>', '指定作者')
  .option('--react', '开发React组件', false)
  .option('--monorepo', '生成monorepo模式项目', false)
  .option('--npmScope', '指定npm的作用域名称')
  .action(async (projectName, options) => {
    create(projectName, options);
  });

program.on('command:*', () => {
  const commandName = program.args[0];
  console.error(
    `${chalk.red('错误！')} ts-lib-scripts没有${chalk.red(
      commandName,
    )}命令。您如果想创建项目，请使用下面的命令行：${'\n\n  '}${chalk.green(
      `npx ts-lib-scripts create ${commandName}`,
    )}`,
  );
  process.exit(1);
});

program.parse(process.argv);
