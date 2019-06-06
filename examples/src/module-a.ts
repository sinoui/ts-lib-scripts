import { Pointer } from './types';

/**
 * 创建二维坐标点
 *
 * @export
 * @param {number} x
 * @param {number} y
 * @returns {Pointer}
 */
export default function createPointer(x: number, y: number): Pointer {
  return { x, y };
}
