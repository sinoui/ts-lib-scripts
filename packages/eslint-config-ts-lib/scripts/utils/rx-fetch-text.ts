import http from '@sinoui/http';
import type { Observable } from 'rxjs';
import { catchError, defer, mergeMap, retry, tap } from 'rxjs';

import { get, save } from './cache-fetch-response';

/**
 * 获取资源文本内容
 *
 * @param url 资源链接
 * @returns 返回资源文本内容
 */
export default function fetchText(url: string): Observable<string> {
  return get(url).pipe(
    catchError(() => {
      console.log('开始请求', url);
      return defer(() =>
        http.get<string>(url, {
          responseType: 'text',
        }),
      ).pipe(
        retry(10),
        tap({
          complete() {
            console.log('请求成功', url);
          },
          error() {
            console.error('请求失败', url);
          },
        }),
      );
    }),
    mergeMap((content) => save(url, content ?? '')),
  );
}
