/* eslint-disable no-plusplus */
import type { ReadStream } from 'fs';
import { createWriteStream } from 'fs';

/**
 * 向指定文件添加内容
 *
 * @param targetFilePath 目录文件路径
 * @param contents 需要添加的内容
 */
async function appendContentToFile(
  targetFilePath: string,
  ...contents: (string | ReadStream)[]
): Promise<void> {
  const writer = createWriteStream(targetFilePath, {
    flags: 'a',
  });

  const append = (
    content: string | ReadStream,
    end = false,
  ): Promise<boolean> =>
    new Promise<boolean>((resolve, reject) => {
      if (typeof content === 'string') {
        const cb = (error?: Error | null): void => {
          if (error) {
            reject(error);
          } else {
            resolve(true);
          }
        };
        if (end) {
          writer.end(content, cb);
        }
        writer.write(content, cb);
      } else {
        const stream = content.pipe(writer, {
          end,
        });
        content.on('end', () => {
          resolve(true);
        });
        stream.on('error', (error) => {
          reject(error);
        });
      }
    });

  for (let i = 0; i < contents.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await append(contents[i], i === contents.length - 1);
  }
}

export default appendContentToFile;
