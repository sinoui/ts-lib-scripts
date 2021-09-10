import moduleA from '@test/module-a';
import k from '@test/module-a/k';

it('module-a', () => {
  expect(k).toBeDefined();
  expect(moduleA).toBe('module-a');
});
