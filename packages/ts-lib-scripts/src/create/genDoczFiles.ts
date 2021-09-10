import {
  copy,
  createReadStream,
  outputJSON,
  readFile,
  readJSON,
  writeFile,
} from 'fs-extra';
import { resolve } from 'path';

import { DOC_README_PATH, DOCZ_TEMPLATE_PATH } from '../config/paths';
import appendContentToFile from './fns/appendContentToFile';

/**
 * 获取首页
 *
 * @param options 配置项
 */
function getHomepage(options: CreateOptions): string | undefined {
  if (options.packageName.startsWith('@')) {
    const matches = options.packageName.match(/@([^/])\/(.+)/);
    if (matches) {
      const [, scopeName, packageName] = matches;
      return `https://${scopeName}.github.io/${packageName}`;
    }
  }
  return undefined;
}

/**
 * 生成docz文件
 *
 * @param projectPath 项目路径
 * @param options 配置
 */
async function genDoczFiles(
  projectPath: string,
  options: CreateOptions,
): Promise<void> {
  // 拷贝docz文件
  await copy(DOCZ_TEMPLATE_PATH, projectPath);

  // 更新docz文档页面的标题
  const content = await readFile(resolve(projectPath, './doczrc.js'), 'utf-8');
  await writeFile(
    resolve(projectPath, './doczrc.js'),
    content.replace("title: 'rctt',", `title: '${options.projectName}',`),
  );

  // 添加文档命令
  const packageInfo = await readJSON(resolve(projectPath, './package.json'));
  packageInfo.scripts['doc:dev'] = 'docz dev';
  packageInfo.scripts['doc:build'] = 'docz build';
  if (options.doczGithubPages) {
    packageInfo.scripts['doc:publish'] = 'docz build && gh-pages -d .docz/dist';
    packageInfo.homepage = getHomepage(options);
  }
  await outputJSON(resolve(projectPath, './package.json'), packageInfo, {
    spaces: 2,
  });

  // 添加doc指令说明
  await appendContentToFile(
    resolve(projectPath, 'README.md'),
    '\n',
    createReadStream(DOC_README_PATH),
  );
}

export default genDoczFiles;
