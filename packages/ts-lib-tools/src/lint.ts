import { exec } from 'child_process';
import { isMonorepo, getInstallCmd } from 'ts-lib-scripts-utils';
import { rootPath } from './config/paths';

export async function lint() {
  const otherArgv = process.argv.slice(3);
  const mono = await isMonorepo();

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
      mono ? 'packages/' : 'src/',
      ...otherArgv,
    ].join(' '),
    {
      cwd: rootPath,
    },
  );
}
