import { resolve } from 'path';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';

import type EsLintRule from '../EsLintRule';
import createRuleMarkdown from './create-rule-markdown';
import saveTextFile from './rx-save-text-file';

/**
 * @param rule eslint 规则
 */
export default function genRuleFile(rule: EsLintRule): Observable<string> {
  const filepath = resolve(__dirname, '../../build/rules', `${rule.name}.md`);
  console.log('开始保存文件', filepath);
  return saveTextFile(filepath, createRuleMarkdown(rule)).pipe(
    tap((filepath) => {
      console.log('文件保存成功', filepath);
    }),
  );
}
