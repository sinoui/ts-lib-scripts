import execa from 'execa';
import { isMonorepo } from 'ts-lib-scripts-utils';
import { rootPath } from './config/paths';

// eslint-disable-next-line import/prefer-default-export
export async function lint() {
  const otherArgv = process.argv.slice(3);
  const mono = isMonorepo();
  await execa(
    'eslint',
    ['--color', '--ext', '.ts', '--ext', '.tsx', mono? 'packages/' : 'src/', ...otherArgv],
    {
      cwd: rootPath,
    },
  );
}
