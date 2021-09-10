import type EsLintRule from '../EsLintRule';

/**
 * 合并规则的分类
 *
 * @param rule 规则
 * @param category 分类名称
 * @param categoryUrl 分类url
 * @returns 返回合并后的规则对象
 */
export default function mergeRuleCategory(
  rule: EsLintRule,
  category: string,
  categoryUrl: string,
): EsLintRule {
  return {
    ...rule,
    category,
    categoryUrl,
  };
}
