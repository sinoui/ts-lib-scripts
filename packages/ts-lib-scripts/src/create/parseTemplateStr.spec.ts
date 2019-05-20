import parseTemplateStr from './parseTemplateStr';

it('parse template str', () => {
  expect(parseTemplateStr('I am <%= name %>.', { name: 'Jacking' })).toBe(
    'I am Jacking.',
  );

  expect(parseTemplateStr('I am <%=name%>.', { name: 'zinuo' })).toBe('I am zinuo.');
});
