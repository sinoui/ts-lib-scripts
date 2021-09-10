/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import type { Compiler } from 'webpack';
import type Webpack from 'webpack';

const PluginName = 'WebpackDoczGhpagesPlugin';

/**
 * 将docz文档发布到github pages时需要使用的webpack插件。
 *
 * @class WebpackDoczGhpagesPlugin
 * @augments {Webpack.Plugin}
 */
class WebpackDoczGhpagesPlugin implements Webpack.Plugin {
  /**
   * 插件入口
   *
   * @param compiler 编译器
   */
  public apply(compiler: Compiler): void {
    compiler.hooks.emit.tapAsync(PluginName, (compilation, callback) => {
      compilation.assets['404.html'] = compilation.assets['index.html'];
      callback();
    });
  }
}

export default WebpackDoczGhpagesPlugin;
