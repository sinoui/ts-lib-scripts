import React from 'react';

it('测试', () => {
  const element = React.createElement('div');
  console.log(React.createContext(null));
  console.log(element, <div>123</div>);

  expect(element).toBe(element);
});
