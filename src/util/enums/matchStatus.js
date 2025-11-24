import { createENUM } from './createENUM.js'

const ENUM = createENUM({
  CONFIRMADA: { valor: 'A', chave: 'Confirmada', color: '#32AE3B' },
  FINALIZADA: { valor: 'F', chave: 'Finalizada', color: '#FF9800' },
  CANCELADA: { valor: 'C', chave: 'Cancelada', color: '#CB1E1A' },
})

export default ENUM
