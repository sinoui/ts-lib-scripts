/* eslint-disable global-require */
module.exports = function create(_api, _opts, env) {
  const isEnvDevelopment = env === 'development';
  const isEnvProduction = env === 'production';
  const isEnvTest = env === 'test';
  const replacements = [{ original: 'lodash', replacement: 'lodash-es' }];

  return {
    presets: [
      isEnvTest && [
        // ES features necessary for user's Node version
        require('@babel/preset-env').default,
        {
          targets: {
            node: 'current',
          },
        },
      ],
      // eslint-disable-next-line prettier/prettier
      isEnvProduction && [
        require('@babel/preset-env').default,
        {
          // Allow importing core-js in entrypoint and use browserlist to select polyfills
          useBuiltIns: 'entry',
          // Set the corejs version we are using to avoid warnings in console
          // This will need to change once we upgrade to corejs@3
          corejs: 3,
          // Do not transform modules to CJS
          modules: false,
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol'],
          targets: '> 0.25%, not dead, not op_mini all',
        },
      ],
      isEnvDevelopment && [
        // Latest stable ECMAScript features
        require('@babel/preset-env').default,
        {
          // Allow importing core-js in entrypoint and use browserlist to select polyfills
          useBuiltIns: 'entry',
          // Set the corejs version we are using to avoid warnings in console
          // This will need to change once we upgrade to corejs@3
          corejs: 3,
          // Do not transform modules to CJS
          modules: false,
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol'],
        },
      ],
      [
        require('@babel/preset-react').default,
        {
          // Adds component stack to warning messages
          // Adds __self attribute to JSX which React will use for some warnings
          development: isEnvDevelopment || isEnvTest,
          // Will use the native built-in instead of trying to polyfill
          // behavior for any plugins that require one.
          useBuiltIns: true,
        },
      ],
      require('@babel/preset-typescript'),
    ].filter(Boolean),
    plugins: [
      require('@babel/plugin-proposal-optional-chaining'),
      require('babel-plugin-styled-components'),
      require('babel-plugin-module-resolver'),
      require('babel-plugin-macros'),
      require('babel-plugin-annotate-pure-calls'),
      require('babel-plugin-dev-expression'),
      [require('babel-plugin-transform-rename-import'), { replacements }],
      // 添加装饰器语法支持(typescript支持的语法)
      [require('@babel/plugin-proposal-decorators').default, false],
      // 添加类属性语法支持(typescript支持的语法)
      [
        require('@babel/plugin-proposal-class-properties').default,
        {
          loose: true,
        },
      ],
      // 添加一些babel、async/await的helpers
      [
        require('@babel/plugin-transform-runtime').default,
        {
          corejs: false,
          helpers: true,
          regenerator: true,
          useESModules: false,
        },
      ],
      // 添加import()语法支持
      require('@babel/plugin-syntax-dynamic-import').default,
      isEnvTest &&
        // 将import()转变为require
        require('babel-plugin-dynamic-import-node'),
    ].filter(Boolean),
    overrides: [
      {
        test: /\.tsx?$/,
        plugins: [
          [
            require('@babel/plugin-proposal-decorators').default,
            { legacy: true },
          ],
        ],
      },
    ],
  };
};
