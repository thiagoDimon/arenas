import { createI18n } from 'vue-i18n'

const messages = {
  pt: {
    entrar: 'Entrar',
    arenas: 'Arenas',
    usuario: 'Usuário',
    senha: 'Senha',
    entrarComGoogle: 'Entrar com Google',
    naoTemConta: 'Não tem uma conta? Registre-se aqui',
    lembreMe: 'Lembre-me',
    mensagemUsuarioSenhaNaoInformado: 'Usuário ou senha não informados',
    atencao: 'Atenção',
  },
  en: {
    entrar: 'Login',
    arenas: 'Arenas',
    usuario: 'User',
    senha: 'Password',
    entrarComGoogle: 'Login with Google',
    naoTemConta: 'Don\'t have an account? Sign up here',
    lembreMe: 'Remember me',
    mensagemUsuarioSenhaNaoInformado: 'Username or password not provided',
    atencao: 'Attention',
  },
  es: {
    entrar: 'Iniciar',
    arenas: 'Arenas',
    usuario: 'Usuario',
    senha: 'Contraseña',
    entrarComGoogle: 'Iniciar con Google',
    naoTemConta: '¿No tienes una cuenta? Regístrate aquí',
    lembreMe: 'Recuérdame',
    mensagemUsuarioSenhaNaoInformado: 'Usuario o contraseña no informados',
    atencao: 'Atención',
  },
}

const i18n = createI18n({
  locale: 'pt',
  fallbackLocale: 'en',
  legacy: false,
  messages,
})

export default i18n
