/* eslint-disable import/prefer-default-export */
import jest from 'jest';
import { execSync } from 'child_process';
import { createJestConfig } from './config/create-jest-config';

/**
 * 判断项目是否由Git管理
 */
function isInGitRepository() {
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
export function test() {
  process.env.BABEL_ENV = 'test';
  process.env.NODE_ENV = 'test';

  const isInCI = process.env.CI === 'true';

  const argv = process.argv.slice(3);

  const jestConfig = createJestConfig();
  argv.push('--config', JSON.stringify(jestConfig));

  if (
    isInCI &&
    argv.indexOf('--findRelatedTests') === -1 &&
    (argv.indexOf('--watch') === -1 && argv.indexOf('--watchAll') === -1)
  ) {
    argv.push('--findRelatedTests', '--bail');
  }

  if (
    !isInCI &&
    argv.indexOf('--watch') === -1 &&
    argv.indexOf('--watchAll') === -1 &&
    isInGitRepository()
  ) {
    argv.push('--watch');
  }

  jest.run(argv);
}
