import execa from 'execa';

let cmd: InstallCommand;

export type InstallCommand = 'yarn' | 'npm';

/**
 * 获取可以安装依赖的命令行
 */
export default function getInstallCmd(): InstallCommand {
  if (cmd) {
    return cmd;
  }

  try {
    execa.sync('yarnpkg', ['--version']);
    cmd = 'yarn';
  } catch (e) {
    cmd = 'npm';
  }

  return cmd;
}
