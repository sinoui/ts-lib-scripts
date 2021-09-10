import type EsLintRule from '../EsLintRule';

/**
 * 创建规则的markdown内容
 *
 * @param rule 规则
 * @returns 返回创建的规则 markdown 内容
 */
export default function createRuleMarkdown(rule: EsLintRule): string {
  const description = rule.fullDescription
    ? rule.fullDescription.replace(/^# .+$/, '')
    : rule.description;

  return `# ${rule.name}
> 来自 [${rule.category}](${rule.categoryUrl}) 的规则。

${description}

## 参考文档

- [${rule.name} 官方文档](${rule.link})
${rule.cnLink ? `- [${rule.name} 中文教程](${rule.cnLink})` : ''}
  `;
}
