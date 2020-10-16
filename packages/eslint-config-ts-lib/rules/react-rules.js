const reactRules = {
  'react/jsx-filename-extension': [
    'error',
    { extensions: ['.js', '.jsx', '.tsx'] },
  ],
  // eslint-config-airbnb 要求每个 React 组件必须定义 propTypes，但是在 TS 环境中，推荐使用 TS 类型来声明组件属性。所以关闭此规则。
  'react/prop-types': 0,
  // 在开发 UI 库时，难免会展开 props。eslint-config-airbnb开启了此规则。所以在此关闭此规则。
  'react/jsx-props-no-spreading': 'off',
  // 此规则不符合 ts 模式下编写 React 组件，不需要通过 .defaultProps 属性指定默认属性，通过 es6 的函数默认参数指定默认属性值
  'react/require-default-props': 'off',
  // 此规则不满足 React.createElement('div', props) 场景，故禁用此规则
  'react/no-unused-prop-types': 0,
};

module.exports = reactRules;
