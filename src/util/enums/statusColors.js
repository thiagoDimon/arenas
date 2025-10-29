import { createENUM } from './createENUM.js'

const ENUM = createENUM({
  CONFIRMADA: { valor: 'A', chave: 'CONFIRMADA', color: 'blue' },
  FINALIZADA: { valor: 'F', chave: 'FINALIZADA', color: 'green' },
  CANCELADA: { valor: 'C', chave: 'CANCELADA', color: 'red' },
})

export default ENUM
