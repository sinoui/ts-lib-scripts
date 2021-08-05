import buildSource from './build-source';

const expected1 = `"use strict";

var _interopRequireDefault = /*#__PURE__*/require("@babel/runtime/helpers/interopRequireDefault").default;

var _core = /*#__PURE__*/_interopRequireDefault( /*#__PURE__*/require("@babel/core"));

console.log(_core.default);`;

const expected2 = `"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
console.log('123');`;

it('import编译为require().default', () => {
  const source = `import babel from '@babel/core';\nconsole.log(babel);`;

  const actual = buildSource(source);

  expect(actual).toBe(expected1);
});

it('忽略 import type', () => {
  const source = `import type { TransformOptions } from '@babel/core';console.log('123');`;

  const actual = buildSource(source);

  expect(actual).toBe(expected2);
});
