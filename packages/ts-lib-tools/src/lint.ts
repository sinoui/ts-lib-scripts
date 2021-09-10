import { exec } from 'child_process';
import execa from 'execa';
import { getInstallCmd, isMonorepo } from 'ts-lib-scripts-utils';

import { rootPath } from './config/paths';

/**
 * 执行代码静态检查
 */
export async function lint(): Promise<void> {
  const otherArgv = process.argv.slice(3);
  const mono = await isMonorepo();

  if (otherArgv.includes('--fix')) {
    await execa(getInstallCmd(), [
      'prettier',
      '**/src/**/*.(tsx|ts|md|json)',
      '**/package.json',
      '--write',
    ]);
  }

  exec(
    [
      getInstallCmd(),
      'eslint',
      '--color',
      '--ignore-pattern',
      '**/node_modules/*',
      '--ignore-pattern',
      '**/*.d.ts',
      '--ext',
      '.ts',
      '--ext',
      '.tsx',
      '--cache',
      '--cache-location',
      'node_modules',
      ...otherArgv,
      mono ? 'packages/' : 'src/',
    ].join(' '),
    {
      cwd: rootPath,
    },
  );
}
