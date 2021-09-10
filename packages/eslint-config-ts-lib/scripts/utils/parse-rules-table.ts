import { load } from 'cheerio';

import type EsLintRule from '../EsLintRule';

/**
 * 从网页内容中解析出规则信息
 *
 * @param html 网页内容
 * @param trSelector 包含规则的 tr 元素选择器
 * @param nameIndex 规则名称的序号
 * @param descriptionIndex 规则描述的序号
 * @returns 返回解析出来的规则
 */
export default function parseRulesTable(
  html: string,
  trSelector = 'tbody > tr:contains(✔)',
  nameIndex = 3,
  descriptionIndex = 4,
): EsLintRule[] {
  const $ = load(html);
  const trs = $(trSelector);

  return trs
    .map((_, tr) => {
      const ruleNameTd$ = $(`td:nth-child(${nameIndex})`, tr);
      const ruleDescriptionTd$ = $(`td:nth-child(${descriptionIndex})`, tr);
      return {
        name: ruleNameTd$.text().trim(),
        link: $('a', ruleNameTd$).attr('href'),
        description: ruleDescriptionTd$.text().trim(),
      };
    })
    .get();
}
