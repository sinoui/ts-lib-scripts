import type { Observable } from 'rxjs';
import { mergeMap } from 'rxjs';

import type EsLintRule from './EsLintRule';
import getFullDescription from './utils/get-full-description';
import parseRulesTable from './utils/parse-rules-table';
import fetchText from './utils/rx-fetch-text';

/**
 * 获取所有的 react 推荐规则
 */
export default function getReactRecommendedRules(): Observable<EsLintRule> {
  const url = 'https://www.npmjs.com/package/eslint-plugin-react';
  return fetchText(url).pipe(
    mergeMap((html) => parseRulesTable(html)),
    mergeMap(getFullDescription, 8),
  );
}
