const capitalize = require(`../helpers/capitalize`);

describe(`Capitalize`, () => {
  it(`Capitalizes the first letter of a word`, () => {
    expect(capitalize('api')).toBe('Api');
  });

  it(`Joins words separated by a hyphen and capitalizes each word`, () => {
    expect(capitalize('knowledge-base')).toBe('KnowledgeBase');
  });
});
