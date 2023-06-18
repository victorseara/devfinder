export const GITHUB_URL = 'https://github.com/';
export const TWITTER_URL = 'https://twitter.com/';
export const WEBSITE_PROTOCOL = 'https';

export default class FormatUtils {
  static formatDateToMedium(date: Date, locale: string | string[] = 'en-US') {
    return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date);
  }

  static createProfileUrl(username: string) {
    return GITHUB_URL + username;
  }

  static createTwitterUrl(username: string | null) {
    if (!username) return null;
    return TWITTER_URL + username;
  }

  static createWebsiteUrl(website: string | null) {
    if (!website) return null;
    try {
      const url = new URL(website);
      return url.toString();
    } catch {
      return null;
    }
  }
}
