import { transformAsync } from '@babel/core';
import { join } from 'path';
import plugin from './index';

it('移除无用导入', async () => {
  const input = `
    import A, { B, C, D, E } from './E';

    export { B, /* type */ C };
  `;

  const result = await transformAsync(input, {
    filename: 'test.ts',
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
    plugins: [plugin],
  });

  expect(result?.code).toMatchSnapshot();
});
