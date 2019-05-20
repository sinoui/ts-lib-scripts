import babelJest from 'babel-jest';

const babelTransform = babelJest.createTransformer({
  presets: [require.resolve('babel-preset-ts-lib')],
  babelrc: false,
  configFile: false,
});

module.exports = babelTransform;
