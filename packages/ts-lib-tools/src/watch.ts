/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import chalk from 'chalk';
import ora from 'ora';
import { watch } from 'rollup';

import { createCjsIndexFile } from './build';
import { createRollupOptions } from './config/create-rollup-options';
import logError from './logError';
import { clearConsole, flatMap } from './utils';

/**
 * 运行监听命令
 *
 * @param buildOptions 构建参数
 */
export async function runWatch(buildOptions: BuildOptions): Promise<void> {
  const formats: FormatMode[] = buildOptions.format;
  const envs: Env[] = ['production', 'development'];

  const configs = flatMap(formats, (formatMode) =>
    envs.map((env) => createRollupOptions(formatMode, env, buildOptions)),
  ).map(([input, output]) => ({
    ...input,
    output,
    watch: {
      silent: true,
      include: ['src/**'],
      exclude: ['node_modules/**'],
    },
  }));

  const spinner = ora().start();
  watch(configs).on('event', async (event) => {
    switch (event.code) {
      case 'START':
        clearConsole();
        spinner.start(chalk.bold.cyan('开始编译模块...'));
        break;
      case 'ERROR':
        spinner.fail(chalk.bold.red('编译失败'));
        logError(event.error);
        break;
      case 'END':
        spinner.succeed(chalk.bold.green('编译成功'));
        console.log(chalk.dim('开始监听变化'));
        break;
      default:
    }
  });

  createCjsIndexFile(buildOptions.outDir);
}
