import { createENUM } from './createENUM.js'

const ENUM = createENUM({
  CONFIRMADO: { valor: 'A', chave: 'confirmado', color: '#32AE3B' },
  SOLICITADO: { valor: 'S', chave: 'solicitado', color: '#FF9800' },
  CONVITE_ENVIADO: { valor: 'C', chave: 'conviteEnviado', color: '#2196F3' },
  RECUSADO: { valor: 'R', chave: 'recusado', color: '#CB1E1A' },
})

export default ENUM
