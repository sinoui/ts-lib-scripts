import type { Observable } from 'rxjs';
import { combineLatestWith, map, mergeMap } from 'rxjs';

import type EsLintRule from './EsLintRule';
import parseRulesTable from './utils/parse-rules-table';
import fetchText from './utils/rx-fetch-text';

/**
 *
 */
function getEslintRecommendedRulesFromEnglishWebsite(): Observable<
  EsLintRule[]
> {
  return fetchText('https://eslint.org/docs/rules/').pipe(
    map((html) => parseRulesTable(html, 'tbody > tr:contains(✓)', 4, 5)),
    map((rules) =>
      rules.map((rule) => ({
        ...rule,
        link: new URL(
          rule.link ?? '',
          'https://eslint.org/docs/rules/',
        ).toString(),
      })),
    ),
  );
}

/**
 *
 */
function getEslintRecommendedRulesFromChineseWebsite(): Observable<
  EsLintRule[]
> {
  return fetchText('https://eslint.cn/docs/rules/').pipe(
    map((html) => parseRulesTable(html, 'tr.rule-zh:contains(✓)')),
    map((rules) =>
      rules.map((rule) => ({
        ...rule,
        link: new URL(
          rule.link ?? '',
          'https://eslint.cn/docs/rules/',
        ).toString(),
      })),
    ),
  );
}

/**
 * 获取 eslint 推荐的规则
 */
export default function getEslintRecommendedRules(): Observable<EsLintRule> {
  const enRules$ = getEslintRecommendedRulesFromEnglishWebsite();
  const zhRules$ = getEslintRecommendedRulesFromChineseWebsite();

  return enRules$.pipe(
    combineLatestWith(zhRules$),
    mergeMap(([enRules, zhRules]) =>
      enRules.map((rule) => {
        const zhRule = zhRules.find((item) => item.name === rule.name);
        if (zhRule) {
          return {
            ...rule,
            description: zhRule.description,
            cnLink: zhRule.link,
            category: 'eslint:recommended',
            categoryUrl: 'https://eslint.org/docs/rules/',
          };
        }
        return rule;
      }),
    ),
  );
}
