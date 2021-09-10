import execa from 'execa';
import { getInstallCmd, isMonorepo } from 'ts-lib-scripts-utils';

import { rootPath } from './config/paths';

// eslint-disable-next-line import/prefer-default-export
/**
 * 格式化代码
 */
export async function format(): Promise<void> {
  const otherArgv = process.argv.slice(3);
  const mono = await isMonorepo();

  await execa(getInstallCmd(), [
    'prettier',
    '**/src/**/*.(tsx|ts|md|json)',
    '**/package.json',
    '--write',
  ]);

  console.log(
    [
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
      '--fix',
      ...otherArgv,
      mono ? 'packages/' : 'src/',
    ].join(''),
  );
  await execa(
    getInstallCmd(),
    [
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
      '--fix',
      ...otherArgv,
      mono ? 'packages/' : 'src/',
    ],
    {
      cwd: rootPath,
    },
  );
}
