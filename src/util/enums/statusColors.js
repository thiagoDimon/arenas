import { createENUM } from './createENUM.js'

const ENUM = createENUM({
  CONFIRMADA: { valor: 'A', chave: 'CONFIRMADA', color: 'primary-color-300' },
  FINALIZADA: { valor: 'F', chave: 'FINALIZADA', color: 'primary-color-500' },
  CANCELADA: { valor: 'C', chave: 'CANCELADA', color: 'tertiary' },
})

export default ENUM
