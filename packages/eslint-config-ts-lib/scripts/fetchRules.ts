import type { Observable } from 'rxjs';
import { mergeWith, toArray } from 'rxjs';

import type EsLintRule from './EsLintRule';
import getEslintRecommendedRules from './getEslintRecommendedRules';
import getReactRecommendedRules from './getReactRecommendedRules';
import getTypeScriptRecommendedRules from './getTypeScriptRecommendedRules';

/**
 *
 */
export default function fetchRules(): Observable<EsLintRule[]> {
  return getEslintRecommendedRules().pipe(
    mergeWith(getReactRecommendedRules(), getTypeScriptRecommendedRules()),
    toArray(),
  );
}
