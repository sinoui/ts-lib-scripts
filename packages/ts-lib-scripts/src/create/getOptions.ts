import { prompt } from 'enquirer';
import { Command } from 'commander';

/**
 * 以交互方式获取配置
 *
 * @param options
 */
export async function getOptionsWithConfirm(
  options: CreateOptions,
): Promise<CreateOptions> {
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
 * 获取React组件开发相关的配置
 *
 * @export
 * @param {CreateOptions} options
 * @returns
 */
export async function getReactOptionsWithConfirm(
  options: CreateOptions,
): Promise<CreateOptions> {
  const { react } = await prompt({
    type: 'confirm',
    name: 'react',
    skip: options.react,
    message: '开发React组件？',
    initial: options.react,
  });

  const { docz } = await prompt({
    type: 'confirm',
    name: 'docz',
    skip: !react || !!options.docz,
    message: '使用docz编写组件文档？',
    initial: react,
  });

  const { doczGithubPages } = await prompt({
    type: 'confirm',
    name: 'doczGithubPages',
    skip: () => !docz || !!options.doczGithubPages,
    message: '将docz文档发布到Github Pages上？',
    initial: docz,
  });

  return { ...options, react, docz, doczGithubPages };
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
  let options: CreateOptions = {
    version: program.v,
    projectName,
    packageName,
    packageDescription: program.packageDescription as string,
    packageVersion: program.packageVersion as string,
    react: program.react as boolean,
    monorepo: program.monorepo as boolean,
    npmScope: program.npmScope as string,
  };

  if (program.i) {
    options = await getOptionsWithConfirm(options);
  }

  options = await getReactOptionsWithConfirm(options);

  return options;
}
