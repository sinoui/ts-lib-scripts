import { ensureDir, writeFile } from 'fs-extra';
import { dirname } from 'path';
import prettier from 'prettier';
import type { Observable } from 'rxjs';
import { defer } from 'rxjs';

/**
 * 保存文本到指定文件
 *
 * @param filepath 文件路径
 * @param content 文本内容
 * @returns 返回文件路径
 */
export default function saveTextFile(
  filepath: string,
  content: string,
): Observable<string> {
  return defer(async () => {
    await ensureDir(dirname(filepath));
    const formattedContent = prettier.format(content, { filepath });
    await writeFile(filepath, formattedContent, 'utf-8');
    return filepath;
  });
}
