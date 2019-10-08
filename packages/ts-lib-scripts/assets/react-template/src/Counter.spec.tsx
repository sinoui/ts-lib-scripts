import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Counter from './Counter';

afterEach(cleanup);

test('渲染并更新计数', () => {
  // 测试首次渲染和 effect
  const { getByTestId } = render(<Counter />);

  const label = getByTestId('label');
  const button = getByTestId('button');

  expect(label).toHaveTextContent('You clicked 0 times');
  expect(document.title).toBe('You clicked 0 times');

  // 测试第二次渲染和 effect
  fireEvent.click(button);
  expect(label).toHaveTextContent('You clicked 1 times');
  expect(document.title).toBe('You clicked 1 times');
});
