import buildSource from './build-source';

it('编译数字分隔符', () => {
  const source = `const num = 123_123_123;`;
  const expected = `"use strict";\n\nconst num = 123123123;`;

  const result = buildSource(source);

  expect(result).toBe(expected);
});
