import { createENUM } from './createENUM.js'

const ENUM = createENUM({
  CONFIRMADA: { valor: 'A', chave: 'confirmada' },
  FINALIZADA: { valor: 'F', chave: 'finalizada' },
  CANCELADA: { valor: 'C', chave: 'cancelada' },
})

export default ENUM
