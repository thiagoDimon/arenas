import { createI18n } from 'vue-i18n'

const messages = {
  pt: {
    entrar: 'Entrar',
    arenas: 'Arenas',
    usuario: 'Usuário',
    senha: 'Senha',
    entrarComGoogle: 'Entrar com Google',
  },
  en: {
    entrar: 'Login',
    arenas: 'Arenas',
    usuario: 'User',
    senha: 'Password',
    entrarComGoogle: 'Login with Google',
  },
  es: {
    entrar: 'Iniciar',
    arenas: 'Arenas',
    usuario: 'Usuario',
    senha: 'Contraseña',
    entrarComGoogle: 'Iniciar con Google',
  },
}

const i18n = createI18n({
  locale: 'pt',
  fallbackLocale: 'en',
  legacy: false,
  messages,
})

export default i18n
