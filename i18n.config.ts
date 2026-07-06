import en from './i18n/locales/en.json'
import es from './i18n/locales/es.json'
import am from './i18n/locales/am.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en,
    es,
    am,
  },
}))
