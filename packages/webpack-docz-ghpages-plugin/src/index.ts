/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import Webpack, { Compiler } from 'webpack';

const PluginName = 'WebpackDoczGhpagesPlugin';

/**
 * 将docz文档发布到github pages时需要使用的webpack插件。
 *
 * @class WebpackDoczGhpagesPlugin
 * @extends {Webpack.Plugin}
 */
class WebpackDoczGhpagesPlugin extends Webpack.Plugin {
  public apply(compiler: Compiler) {
    compiler.hooks.emit.tapAsync(PluginName, (compilation, callback) => {
      compilation.assets['404.html'] = compilation.assets['index.html'];
      callback();
    });
  }
}

export default WebpackDoczGhpagesPlugin;
