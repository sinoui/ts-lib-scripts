import { transform } from '@babel/core';
import { join } from 'path';
import plugin from './index';

it('验证变量名变更', () => {
  const input = `
    import { B, C, D, E } from './E';
    x === y;
    console.log(B);
    export {
      /* type */
      B,
      /* type */
      C, 
      // type
      D,
      E
    };
  `;

  const result = transform(input, {
    filename: 'test.ts',
    plugins: [plugin],
    babelrc: false,
    cwd: join(__dirname, '.'),
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
        },
      ],
    ],
  });

  expect(result?.code).toMatchSnapshot();
});
