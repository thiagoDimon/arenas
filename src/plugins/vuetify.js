import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VCalendar } from 'vuetify/labs/VCalendar'
import { VMaskInput } from 'vuetify/labs/VMaskInput'
import { en, es, pt } from 'vuetify/locale'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const colors = {
  'primary': '#1B5E20',
  'secondary': '#FFD54F',
  'tertiary': '#B00020',
  'primary-color-100': '#32AE3B',
  'primary-color-200': '#27872E',
  'primary-color-300': '#1B5E20',
  'primary-color-400': '#103713',
  'primary-color-500': '#051005',
  'secondary-color-100': '#FFEDB2',
  'secondary-color-200': '#FFE180',
  'secondary-color-300': '#FFD54F',
  'secondary-color-400': '#FFC81A',
  'secondary-color-500': '#E5AF00',
}

export function criarVuetify (locale = 'pt') {
  return createVuetify({
    components: {
      ...components,
      VCalendar,
      VMaskInput,
    },
    directives,
    locale: {
      locale: String(locale),
      fallback: 'en',
      messages: { pt, en, es },
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors,
        },
        dark: {
          colors,
        },
      },
    },
  })
}
