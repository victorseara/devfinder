export default class DateUtils {
  static format(date: Date, options: Intl.DateTimeFormatOptions, locale?: string) {
    return new Intl.DateTimeFormat(locale, options).format(date);
  }
}
