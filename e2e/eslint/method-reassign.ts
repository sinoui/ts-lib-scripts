/**
 * 累加
 *
 * @param acc 累加值
 * @param item 需要合并的项
 */
export function reduce(acc: Record<string, string>, item: string): void {
  acc[item] = '123';
}
