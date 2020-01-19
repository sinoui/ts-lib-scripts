import { realpathSync, readJsonSync } from 'fs-extra';
import { resolve } from 'path';

/**
 * 项目根目录
 */
export const rootPath = realpathSync(process.cwd());

/**
 * 将相对于项目根目录的路径解析为绝对路径
 *
 * @param relativePath 相对路径
 */
export const resolveRoot = (relativePath: string) =>
  resolve(rootPath, relativePath);

/**
 * 命令行工具的配置
 */
export const cliPackageInfo = readJsonSync(
  resolve(__dirname, '../../package.json'),
);

/**
 * 模板位置
 */
export const TEMPLATE_PATH = resolve(__dirname, '../../assets/template');
/**
 * react组件库模板位置
 */
export const REACT_TEMPLATE_PATH = resolve(
  __dirname,
  '../../assets/react-template',
);

/**
 * 通用模板位置
 */
export const COMMON_TEMPLATE_PATH = resolve(
  __dirname,
  '../../assets/common-template',
);

/**
 * monorepo模式项目的模板
 */
export const MONOREPO_TEMPLATE_PATH = resolve(
  __dirname,
  '../../assets/monorepo-template',
);

/**
 * git忽略文件位置
 */
export const GIT_IGNORE_FILE_PATH = resolve(
  __dirname,
  '../../assets/gitignore',
);

/**
 * .npmignore 文件位置
 */
export const NPM_IGNORE_FILE_PATH = resolve(
  __dirname,
  '../../assets/npmignore',
);

/**
 * assets路径
 */
export const ASSETS_PATH = resolve(__dirname, '../../assets');

/**
 * docz模板路径
 */
export const DOCZ_TEMPLATE_PATH = resolve(ASSETS_PATH, './docz-template');

/**
 * doc命令行内容
 */
export const DOC_README_PATH = resolve(ASSETS_PATH, 'doc-readme.md');
