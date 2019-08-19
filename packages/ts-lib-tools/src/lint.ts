import execa from 'execa';
import { isMonorepo } from 'ts-lib-scripts-utils';
import { rootPath } from './config/paths';

// eslint-disable-next-line import/prefer-default-export
export async function lint() {
  const otherArgv = process.argv.slice(3);
  const mono = await isMonorepo();
  await execa(
    'eslint',
    ['--color', '--ignore-pattern', '**/node_modules/*', '--ignore-pattern', '**/*.d.ts', '--ext', '.ts', '--ext', '.tsx', mono? 'packages/' : 'src/', ...otherArgv],
    {
      cwd: rootPath,
    },
  );
}
