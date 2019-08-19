import k from '@test/module-a/k';
import moduleA from '@test/module-a';

it('module-a', () => {
  expect(k).toBeDefined();
  expect(moduleA).toBe('module-a');
});
