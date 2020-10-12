// 0.13.5 ~ 0.13.6，eslint提示 JSX 未定义。
import React from 'react';

const element: JSX.Element = React.createElement('div');

console.log(element);
