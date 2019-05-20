import execa from 'execa';
import { rootPath } from './config/paths';

// eslint-disable-next-line import/prefer-default-export
export async function lint() {
  const otherArgv = process.argv.slice(3);
  await execa(
    'eslint',
    ['--color', '--ext', '.ts', '--ext', '.tsx', 'src/', ...otherArgv],
    {
      cwd: rootPath,
    },
  );
}
