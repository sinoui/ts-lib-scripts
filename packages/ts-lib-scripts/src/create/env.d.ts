declare module 'validate-npm-package-name';

interface CreateOptions {
  /**
   * 工具版本号
   *
   * @type {string}
   * @memberof CreateOptions
   */
  version: string;
  /**
   * 项目名称
   *
   * @type {string}
   * @memberof CreateOptions
   */
  projectName: string;
  /**
   * 包名称
   *
   * @type {string}
   * @memberof CreateOptions
   */
  packageName: string;
  /**
   * 项目初始版本，默认为0.1.0
   *
   * @type {string}
   * @memberof CreateOptions
   */
  packageVersion: string;
  /**
   * 项目描述
   */
  packageDescription?: string;
  /**
   * 作者
   */
  author?: string;
  /**
   * 启用react组件开发
   */
  react?: boolean;
  /**
   * 使用docz组织组件文档
   */
  docz?: boolean;
  /**
   * 将docz文档发布到Github Pages上
   */
  doczGithubPages?: boolean;
}
