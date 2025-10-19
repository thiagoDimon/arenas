import router from '@/router'
import pinia from '@/stores'
import i18n from './i18n'
import vuetify from './vuetify'

export function registerPlugins (app) {
  i18n.global.locale.value = localStorage.getItem('language') ?? navigator.language.slice(0, 2)

  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(i18n)
}
