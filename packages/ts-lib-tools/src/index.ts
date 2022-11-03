/* eslint-disable no-console */
import chalk from 'chalk';
import { Command } from 'commander';

import { runBuild } from './build';
import { DIST_PATH_NAME } from './config/constants';
import { getBuildOptions } from './config/getBuildOptions';
import { cliPackageInfo } from './config/paths';
import { format } from './format';
import genModule from './gen-module';
import { lint } from './lint';
import { test } from './test';
import { commaSeparatedList } from './utils';
import { runWatch } from './watch';

const program = new Command('ts-lib-tools');
program.version(cliPackageInfo.version);

program
  .command('build')
  .description(
    `构建项目。将TypeScript编译成js。

    例子：

    $ build
    $ build --format cjs,es,umd
    $ build --entry src/example.ts
    $ build --target node
  `,
  )
  .option(
    '-f, --format <format>',
    '指定模块格式，默认为cjs,es',
    commaSeparatedList,
    ['cjs', 'es'],
  )
  .option('--skip-tsc', '跳过 tsc 编译生成 .d.ts 的步骤')
  .option(
    '--entry, -i <entry>',
    '指定入口文件，默认为src/index.ts或者src/index.tsx',
  )
  .option(
    '--target <target>',
    '指定目标环境，可选项为web、node，默认为web',
    'web',
  )
  .option('--name <name>', '指定在UMD中的名称，默认会取package.json中的name')
  .option(
    '--outDir <outDir>',
    `指定输出目录，默认为${DIST_PATH_NAME}`,
    DIST_PATH_NAME,
  )
  .option('--simple', '以简单模式打包')
  .action(async (options: BuildOptions) => {
    await runBuild(getBuildOptions(options));
  });

program
  .command('watch')
  .description(
    `以监听模式启动项目。每当代码发生变化就会重新编译。

  例子：

    $ watch
    $ watch --format cjs,es,umd
    $ watch --entry src/example.ts
    $ watch --target node
  `,
  )
  .option(
    '-f, --format <format>',
    '指定模块格式，默认为cjs,es',
    commaSeparatedList,
    ['cjs', 'es'],
  )
  .option('--skip-tsc', '跳过 tsc 编译生成 .d.ts 的步骤')
  .option(
    '--entry, -i <entry>',
    '指定入口文件，默认为src/index.ts或者src/index.tsx',
  )
  .option(
    '--target <target>',
    '指定目标环境，可选项为web、node，默认为web',
    'web',
  )
  .option('--name <name>', '指定在UMD中的名称，默认会取package.json中的name')
  .option(
    '--outDir <outDir>',
    `指定输出目录，默认为${DIST_PATH_NAME}`,
    DIST_PATH_NAME,
  )
  .action(async (options: BuildOptions) => {
    await runWatch(getBuildOptions(options));
  });

program
  .command('gen-module <moduleName>')
  .option('--packageName <packageName>', '指定新增模块所在的文件夹名称')
  .description('生成模块')
  .action(async (moduleName, { packageName }) => {
    await genModule(moduleName, packageName);
  });

program.command('lint').description('代码检查');
program.command('test').description('单元测试');
program.command('format').description('格式化代码');

program.on('command:*', () => {
  const commandName = program.args[0];
  console.error(
    `${chalk.red('错误！')} ts-lib-tools没有${chalk.red(commandName)}命令。`,
  );
  process.exit(1);
});

const command = process.argv[2];
const directCmds = {
  test,
  lint,
  format,
};
if (Object.keys(directCmds).indexOf(command) !== -1) {
  const fn: () => void = directCmds[command as 'test' | 'lint' | 'format'];
  fn();
} else {
  program.parse(process.argv);
}
