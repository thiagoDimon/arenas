import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { pt } from 'vuetify/locale'
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

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'system',
    themes: {
      light: {
        colors,
      },
      dark: {
        colors,
      },
    },
  },
  locale: {
    locale: 'pt',
    messages: { pt },
  },
})
