/* eslint-disable import/prefer-default-export */
import { execSync } from 'child_process';
import { run } from 'jest';
import { isAbsolute, relative, resolve } from 'path';

import { createJestConfig } from './config/create-jest-config';

/**
 * 判断项目是否由Git管理
 */
function isInGitRepository(): boolean {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 运行单元测试命令
 */
export async function test(): Promise<void> {
  process.env.BABEL_ENV = 'test';
  process.env.NODE_ENV = 'test';

  const isInCI = process.env.CI === 'true';

  const argv = process.argv.slice(3).map((arg) => {
    if (
      !arg.startsWith('-') &&
      isAbsolute(arg) &&
      resolve(arg).startsWith(process.cwd())
    ) {
      return relative(process.cwd(), resolve(arg));
    }
    return arg;
  });

  const jestConfig = await createJestConfig();
  argv.push('--config', JSON.stringify(jestConfig));

  if (
    isInCI &&
    argv.indexOf('--findRelatedTests') === -1 &&
    argv.indexOf('--watch') === -1 &&
    argv.indexOf('--watchAll') === -1
  ) {
    argv.push('--findRelatedTests', '--bail');
  }

  if (
    !isInCI &&
    argv.indexOf('--watch') === -1 &&
    argv.indexOf('--watchAll') === -1 &&
    argv.indexOf('--coverage') === -1 &&
    isInGitRepository()
  ) {
    argv.push('--watch');
  }

  try {
    await run(argv);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}
