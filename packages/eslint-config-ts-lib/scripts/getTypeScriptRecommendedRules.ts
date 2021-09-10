import type { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs';

import type EsLintRule from './EsLintRule';
import getFullDescription from './utils/get-full-description';
import mergeRuleCategory from './utils/mergeRuleCategory';
import parseRulesTable from './utils/parse-rules-table';
import fetchText from './utils/rx-fetch-text';

const ROOT_URL =
  'https://www.npmjs.com/package/@typescript-eslint/eslint-plugin';

/**
 * 获取所有 TypeScript 推荐的规则
 */
export default function getTypeScriptRecommendedRules(): Observable<EsLintRule> {
  return fetchText(ROOT_URL).pipe(
    mergeMap((html) =>
      parseRulesTable(html, 'tbody > tr:contains(✅):not(:contains(💭))', 1, 2),
    ),
    mergeMap(getFullDescription, 8),
    map((rule) =>
      mergeRuleCategory(
        rule,
        'plugin:@typescript-eslint/recommended',
        ROOT_URL,
      ),
    ),
  );
}
