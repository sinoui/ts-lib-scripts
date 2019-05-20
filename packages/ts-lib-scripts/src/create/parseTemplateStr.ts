/**
 * 解析模板字符串
 *
 * @param template 模板字符串
 * @param value 模板的值
 */
export default function parseTemplateStr(
  template: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: { [x: string]: any },
) {
  return template.replace(/<%= *(.+?) *%>/g, (_exp, keyName) => value[keyName]);
}
