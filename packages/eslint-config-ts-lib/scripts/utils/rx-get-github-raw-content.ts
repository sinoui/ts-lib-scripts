import type { Observable } from 'rxjs';

import fetchText from './rx-fetch-text';

/**
 * @param fileUrl 文件链接
 */
export default function getGithubRawContent(
  fileUrl: string,
): Observable<string> {
  const rawFileUrl = fileUrl
    .replace(/^https:\/\/github.com/, 'https://raw.githubusercontent.com')
    .replace('blob/HEAD', 'master');

  return fetchText(rawFileUrl);
}
