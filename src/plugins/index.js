import router from '@/router'
import pinia from '@/stores'
import i18n from './i18n'
import vuetify from './vuetify'

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(i18n)
}
