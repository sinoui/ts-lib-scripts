// 在 0.13.5 ~ 0.13.6 中，会报 `_value` 未使用的eslint错误。实际希望禁用此规则：允许以前缀`_`忽略未使用的参数，保持与ts一致。
export function hello(_value: string) {
  console.log(`hello, world`);
}
