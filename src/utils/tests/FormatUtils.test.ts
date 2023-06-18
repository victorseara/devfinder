import FormatUtils, { GITHUB_URL, TWITTER_URL } from '../FormatUtils';

describe('FormatUtils - formatDateToMedium', () => {
  test('Format date properly with en-US as default locale', () => {
    const result = FormatUtils.formatDateToMedium(new Date('2023-06-01T00:00:00'));
    expect(result).toMatchInlineSnapshot('"Jun 1, 2023"');
  });

  test('Accepts custom locale', () => {
    const result = FormatUtils.formatDateToMedium(new Date('2023-06-01T00:00:00'), 'pt-BR');
    expect(result).toMatchInlineSnapshot('"1 de jun. de 2023"');
  });
});

describe('FormatUtils - createProfileUrl', () => {
  test("Return a link to user's profile on Github", () => {
    const username = 'test';
    const result = FormatUtils.createProfileUrl(username);
    expect(result).contains(GITHUB_URL);
    expect(result).contains(username);
  });
});

describe('FormatUtils - createTwitterUrl', () => {
  test('Return null if username is not present', () => {
    const result = FormatUtils.createTwitterUrl(null);
    expect(result).toBeNull();
  });

  test("Return a link to user's profile on Twitter", () => {
    const username = 'test';
    const result = FormatUtils.createTwitterUrl(username);
    expect(result).contains(TWITTER_URL);
    expect(result).contains(username);
  });
});

describe('FormatUtils - createWebsiteUrl', () => {
  test('Return null if website is not present', () => {
    const result = FormatUtils.createWebsiteUrl(null);
    expect(result).toBeNull();
  });

  test('Returns null if its not a valid URL', () => {
    const website = 'not-a-url';
    const result = FormatUtils.createWebsiteUrl(website);

    expect(result).toBeNull();
  });

  test('Returns a URL string when website is a valid URL', () => {
    const website = 'https://validurl.com';
    const result = FormatUtils.createWebsiteUrl(website);

    expect(result).contains(website);
  });
});
