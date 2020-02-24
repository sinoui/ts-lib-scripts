/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';
import { ensureDirSync } from 'fs-extra';
import { cpus } from 'os';
import { ASSETS_PATH } from '../config/paths';

export const ROOT_DIR = process.cwd();
export const DIST_ROOT = resolve(ROOT_DIR, './dist');
export const SRC_ROOT = resolve(ROOT_DIR, 'src');
export const DIST_PATH_ES = resolve(DIST_ROOT, 'es');
export const DIST_PATH_ESM = resolve(DIST_ROOT, 'esm');
export const BUILD_DIR = resolve(ROOT_DIR, './build');
export const CACHE_PATH = resolve(BUILD_DIR, '.cache');
export const BUILD_ESM_CACHE_PATH = resolve(CACHE_PATH, 'babel-esm');
export const BUILD_COMMONJS_CACHE_PATH = resolve(CACHE_PATH, 'build-commonjs');
export const cpuCount = cpus().length;
export const CP_FILES = [
  'README.md',
  'LICENSE',
  'CHANGELOG.md',
  'tsconfig.json',
];
export const TYPES_CACHE_PATH = resolve(BUILD_DIR, 'types');
export const ES6_CACHE_PATH = resolve(BUILD_DIR, 'es6');
export const SIMPLE_BUILD_TS_CONFIG_FILE = 'tsconfig.simple.release.json';
export const SIMPLE_BUILD_TS_CONFIG_TEMPLATE = resolve(
  ASSETS_PATH,
  'module-template',
  SIMPLE_BUILD_TS_CONFIG_FILE,
);

ensureDirSync(BUILD_ESM_CACHE_PATH);
ensureDirSync(BUILD_COMMONJS_CACHE_PATH);
ensureDirSync(BUILD_DIR);
