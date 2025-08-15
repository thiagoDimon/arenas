import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'system',
    themes: {
      light: {
        colors: {
          primary: '#1B5E20', // Defina sua cor primária aqui
          secondary: '#FFD54F', // Defina sua cor secundária aqui
        },
      },
      dark: {
        colors: {
          primary: '#1B5E20',
          secondary: '#FFD54F',
        },
      },
    },
  },
})
