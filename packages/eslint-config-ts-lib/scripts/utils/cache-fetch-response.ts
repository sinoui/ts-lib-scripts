import crypto from 'crypto';
import { readFile, writeFile } from 'fs/promises';
import { ensureDir } from 'fs-extra';
import { resolve } from 'path';
import type { Observable } from 'rxjs';
import { defer, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';

const CACHE_DIR = resolve(__dirname, '../../build/.cache');

/**
 * 获取缓存内容
 *
 * @param url 链接
 * @returns 返回缓存内容。如果缓存内容为空，则返回 null。
 */
export function get(url: string): Observable<string | null> {
  const id = crypto.createHash('md5').update(url).digest('hex');
  const filepath = resolve(CACHE_DIR, id);
  return defer(() => readFile(filepath, 'utf-8'));
}

/**
 * 保存缓存
 *
 * @param url 链接
 * @param content 缓存的内容
 * @returns 返回缓存内容
 */
export function save(url: string, content: string): Observable<string> {
  const id = crypto.createHash('md5').update(url).digest('hex');
  const filepath = resolve(CACHE_DIR, id);
  return defer(async () => {
    await ensureDir(CACHE_DIR);
    await writeFile(filepath, content);
  }).pipe(
    mapTo(content),
    catchError((_) => of(content)),
  );
}
