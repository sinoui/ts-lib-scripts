import { writeFile, readFile } from 'fs-extra';
import { resolve } from 'path';
import parseTemplateStr from '../parseTemplateStr';

/**
 * 生成README.md文档
 *
 * @param projectPath 项目路径
 * @param options 配置
 */
export default async function updateREADMEFile(
  projectPath: string,
  options: CreateOptions,
) {
  const readmePath = resolve(projectPath, 'README.md');
  const content = await readFile(readmePath, 'utf-8');

  await writeFile(
    readmePath,
    parseTemplateStr(content, {
      ...options,
      packageDescription:
        options.packageDescription ||
        '这是由[ts-lib-scripts](https://github.com/sinoui/ts-lib-scripts)创建的TypeScript库项目。',
    }),
  );
}
