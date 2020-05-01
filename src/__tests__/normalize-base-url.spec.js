const normalizeBaseUrl = require(`../helpers/normalizeBaseUrl`);

describe(`Normalize baseUrl`, () => {
  it(`Removes trailing slashes`, () => {
    expect(normalizeBaseUrl(`example.com/`)).toBe(`example.com`);
  });

  // it(`Removes the protocol`, () => {
  //   expect(normalizeBaseUrl(`http://example.com`)).toBe(`example.com`);
  //   expect(normalizeBaseUrl(`https://example.com`)).toBe(`example.com`);
  // });
});
