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

it('验证 import as 语法', async () => {
  const input = `
  import { x as y } from 'z';
  console.log(y);
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

  expect(result?.code).toBe(`import { x as y } from 'z';\nconsole.log(y);`);
  expect(result?.code).toMatchSnapshot();
});

it('保留已经引用的 import', async () => {
  const input = `
    import { x as y } from 'z';
    import x from 'z';
    import * as a from 'z';
    import 'z';

    console.log(x, y, a);
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

  expect(result?.code).toBe(
    `import { x as y } from 'z';\nimport x from 'z';\nimport * as a from 'z';\nimport 'z';\nconsole.log(x, y, a);`,
  );
  expect(result?.code).toMatchSnapshot();
});
