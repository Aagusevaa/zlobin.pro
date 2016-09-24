import ru from './locale/ru';
import en from './locale/en';

const resources = {
  ru,
  en
};

export const RU = 'ru';
export const EN = 'en';

export default class Locale {
  constructor() {
    this.defaultLocale = 'en';
    this.locales = resources[this.defaultLocale];
  }

  setLocale(locale) {
    this.locales = resources[locale];
  }

  get(str) {
    return this.locales[str];
  }
}
