import type { Observable } from 'rxjs';
import { map, of } from 'rxjs';

import type EsLintRule from '../EsLintRule';
import getGithubRawContent from './rx-get-github-raw-content';

/**
 * @param rule eslint规则
 */
export default function getFullDescription(
  rule: EsLintRule,
): Observable<EsLintRule> {
  return rule.link
    ? getGithubRawContent(rule.link).pipe(
        map((fullDescription) => ({
          ...rule,
          fullDescription,
        })),
      )
    : of(rule);
}
