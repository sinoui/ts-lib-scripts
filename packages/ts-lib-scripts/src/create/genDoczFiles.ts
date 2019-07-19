import {
  copy,
  readFile,
  writeFile,
  readJSON,
  outputJSON,
  createReadStream,
} from 'fs-extra';
import { resolve } from 'path';
import { DOCZ_TEMPLATE_PATH, DOC_README_PATH } from '../config/paths';
import appendContentToFile from './fns/appendContentToFile';

function getHomepage(options: CreateOptions) {
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
 */
async function genDoczFiles(projectPath: string, options: CreateOptions) {
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
