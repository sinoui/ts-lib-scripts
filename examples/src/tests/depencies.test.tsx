import React from 'react';
import { x } from './any';

it('测试', () => {
  const element = React.createElement('div');
  console.log(React.createContext(null));
  console.log(element, <div>123</div>);

  expect(element).toBe(element);

  console.log(x);
});
