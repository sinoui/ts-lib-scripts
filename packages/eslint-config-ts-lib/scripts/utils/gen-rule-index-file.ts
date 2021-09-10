import { resolve } from 'path';
import type { Observable } from 'rxjs';

import type EsLintRule from '../EsLintRule';
import saveTextFile from './rx-save-text-file';

/**
 * 生成规则清单文件
 *
 * @param rules 规则
 * @returns 返回规则清单文件的路径
 */
export default function genRuleIndexFile(
  rules: EsLintRule[],
): Observable<string> {
  // 目录：toc 即 table of contents
  const toc = rules
    .map((rule) => rule.name)
    .map((name) => `- [${name}](./docs/rules/${name}.md)`)
    .join('\n');

  return saveTextFile(resolve(__dirname, '../../build/rule-index.md'), toc);
}
