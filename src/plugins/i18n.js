import { createI18n } from 'vue-i18n'

const messages = {
  pt: {
    login: 'Login',
  },
  en: {
    login: 'Login',
  },
  es: {
    login: 'Login',
  },
}

const i18n = createI18n({
  locale: 'pt',
  fallbackLocale: 'en',
  legacy: false,
  messages,
})

export default i18n
