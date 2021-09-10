import { flatMap } from './utils';

it('flatMap', () => {
  expect(flatMap([1, 2, 3], (item) => [item * 2, item * 2])).toEqual([
    2, 2, 4, 4, 6, 6,
  ]);
});
