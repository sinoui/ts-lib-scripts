/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';

import Button from './Button';

it('验证button组件存在', () => expect(Button).toBeDefined());

it('按钮标题', () => {
  const { getByTestId } = render(<Button data-testid="button">标题</Button>);

  expect(getByTestId('button')).toHaveTextContent('标题');
});
