import { createENUM } from './createENUM.js'

const ENUM = createENUM({
  CONFIRMADA: { valor: 'A', chave: 'confirmada', color: 'primary-color-300' },
  FINALIZADA: { valor: 'F', chave: 'finalizada', color: 'primary-color-500' },
  CANCELADA: { valor: 'C', chave: 'cancelada', color: 'tertiary' },
})

export default ENUM
