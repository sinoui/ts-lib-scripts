/* eslint-disable import/no-extraneous-dependencies */
import { pathExists, readFile, writeFile } from 'fs-extra';
import md5 from 'md5';
import { resolve } from 'path';

/**
 * 文件缓存
 */
export default class FileCache {
  /**
   * 创建文件缓存类实例
   *
   * @param rootPath 文件根目录
   */
  public constructor(private rootPath: string) {}

  /**
   * 获取指定文件的md5值
   *
   * @param filePath 文件路径
   */
  public async md5File(filePath: string): Promise<string> {
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
  public async store(
    filePath: string,
    cacheContent?: string | null,
  ): Promise<void> {
    const fileMd5 = await this.md5File(filePath);
    const cacheFilePath = resolve(this.rootPath, fileMd5);
    await writeFile(cacheFilePath, cacheContent);
  }
}
