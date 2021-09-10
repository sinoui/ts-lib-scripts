import { readFile, writeFile } from 'fs-extra';
import { resolve } from 'path';

import parseTemplateStr from '../parseTemplateStr';

/**
 * 生成LICENSE文件
 *
 * @param projectPath 项目路径
 * @param options 配置
 */
export default async function genLicenseFile(
  projectPath: string,
  options: CreateOptions,
): Promise<void> {
  const licensePath = resolve(projectPath, 'LICENSE');
  const content = await readFile(licensePath, 'utf-8');

  await writeFile(
    licensePath,
    parseTemplateStr(content, {
      time: new Date().getFullYear(),
      author: options.author || '',
    }),
  );
}
