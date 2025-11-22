import { createENUM } from './createENUM.js'

const ENUM = createENUM({
  CONFIRMADA: { valor: 'A', chave: 'confirmada', color: '#32AE3B' },
  FINALIZADA: { valor: 'F', chave: 'finalizada', color: '#2196F3' },
  CANCELADA: { valor: 'C', chave: 'cancelada', color: '#CB1E1A' },
})

export default ENUM
