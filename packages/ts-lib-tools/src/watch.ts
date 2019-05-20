/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { watch } from 'rollup';
import ora from 'ora';
import chalk from 'chalk';
import { createCjsIndexFile } from './build';
import { createRollupOptions } from './config/create-rollup-options';
import { clearConsole, flatMap } from './utils';
import logError from './logError';

/**
 * 运行监听命令
 *
 * @param buildOptions 构建参数
 */
export async function runWatch(buildOptions: BuildOptions) {
  const formats: FormatMode[] = buildOptions.format;
  const envs: Env[] = ['production', 'development'];

  const configs = flatMap(formats, (formatMode) =>
    envs.map((env) => createRollupOptions(formatMode, env, buildOptions, true)),
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
  await watch(configs).on('event', async (event) => {
    switch (event.code) {
      case 'START':
        clearConsole();
        spinner.start(chalk.bold.cyan('开始编译模块...'));
        break;
      case 'ERROR':
      case 'FATAL':
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
