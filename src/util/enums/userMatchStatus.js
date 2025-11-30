import { createENUM } from './createENUM.js'

const ENUM = createENUM({
  CONFIRMADO: { valor: 'C', chave: 'Confirmado', color: '#32AE3B' },
  SOLICITADO: { valor: 'S', chave: 'Solicitado', color: '#006affff' },
  RECUSADO: { valor: 'R', chave: 'Recusado', color: '#CB1E1A' },
})

export default ENUM
