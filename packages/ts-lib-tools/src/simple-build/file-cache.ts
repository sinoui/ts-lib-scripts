/* eslint-disable import/no-extraneous-dependencies */
import md5 from 'md5';
import { readFile, pathExists, writeFile } from 'fs-extra';
import { resolve } from 'path';

export default class FileCache {
  public constructor(private rootPath: string) {}

  public async md5File(filePath: string) {
    const content = await readFile(filePath, 'utf-8');
    return md5(content);
  }

  /**
   * 获取缓存
   *
   * @param filePath 源文件目录
   */
  public async get(filePath: string): Promise<string | undefined | null> {
    const fileMd5 = await this.md5File(filePath);
    const cacheFilePath = resolve(this.rootPath, fileMd5);
    const isCacheFileExists = await pathExists(cacheFilePath);

    if (isCacheFileExists) {
      return readFile(cacheFilePath, 'utf-8');
    }

    return null;
  }

  /**
   * 存储缓存
   *
   * @param filePath 源文件目录
   * @param cacheContent 需要缓存的内容
   */
  public async store(filePath: string, cacheContent?: string | null) {
    const fileMd5 = await this.md5File(filePath);
    const cacheFilePath = resolve(this.rootPath, fileMd5);
    await writeFile(cacheFilePath, cacheContent);
  }
}
