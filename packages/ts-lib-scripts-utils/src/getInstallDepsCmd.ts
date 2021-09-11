import getInstallCmd from './getInstallCmd';

/**
 * 获取安装依赖的命令行
 *
 * @param deps 依赖
 * @param isDev 是否是开发依赖
 * @param isMonorepo 是否是 monorepo 模式
 */
export default function getInstallDepsCmd(
  deps: string[],
  isDev = false,
  isMonorepo = false,
): string {
  const cmd = getInstallCmd();

  if (cmd === 'npm') {
    return `npm add ${deps.join(' ')} ${
      isDev ? '--save' : '--save-dev'
    }`.trim();
  }
  return `yarn add ${deps.join(' ')}${isDev ? ' --dev' : ''} ${
    isMonorepo ? '-W' : ''
  }`.trim();
}
