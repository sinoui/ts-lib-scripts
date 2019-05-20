import { safePackageName, safeVariableName } from './index';

it('safePackageName', () => {
  expect(safePackageName('test')).toBe('test');
  expect(safePackageName('@scopename/test')).toBe('scopename-test');
  expect(safePackageName('@scope-name/package-name')).toBe(
    'scope-name-package-name',
  );
});

it('safeVariableName', () => {
  expect(safeVariableName('test')).toBe('test');
  expect(safeVariableName('@scopename/test')).toBe('test');
  expect(safeVariableName('@scope-name/package-name')).toBe('packageName');
});
