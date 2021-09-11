/* eslint-disable @typescript-eslint/no-require-imports */
import execa from 'execa';

/**
 * 判断指定命令行是否安装
 *
 * @param cmd 命令行
 * @param args 判断是否安装时的参数，默认为`['--version']`
 */
export default async function isCmdInstalled(
  cmd: string,
  args: string[] = ['--version'],
): Promise<boolean> {
  try {
    await execa(cmd, args);
    return true;
  } catch (e) {
    return false;
  }
}
