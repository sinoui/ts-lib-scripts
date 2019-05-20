import { prompt } from 'enquirer';
import { Command } from 'commander';

/**
 * 以交互方式获取配置
 *
 * @param options
 */
export async function getOptionsWithConfirm(options: CreateOptions) {
  const confirms = [
    {
      type: 'input',
      name: 'pacakgeVersion',
      message: '项目版本号',
      initial: options.packageVersion,
    },
    {
      type: 'input',
      name: 'packageName',
      initial: options.packageName,
      message: '项目名称',
    },
    {
      type: 'input',
      name: 'packageDescription',
      message: '项目描述',
    },
    {
      type: 'input',
      name: 'author',
      message: '作者',
    },
  ];

  const response = await prompt(confirms);

  return { ...options, ...response };
}

/**
 * 获取命令行参数
 *
 * @param projectName 项目名称
 * @param packageName 模块名
 * @param program 命令行程序
 */
export async function getOptions(
  projectName: string,
  packageName: string,
  program: Command,
) {
  const options = {
    version: program.v,
    projectName,
    packageName,
    packageDescription: program.packageDescription as string,
    packageVersion: program.packageVersion as string,
  };

  if (program.i) {
    const newOptions = await getOptionsWithConfirm(options);
    return newOptions;
  }
  return options;
}
