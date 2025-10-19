import { createENUM } from './createENUM.js'

const ENUM = createENUM({
  INICIANTE: { valor: 'I', chave: 'iniciante' },
  INTERMEDIARIO: { valor: 'M', chave: 'intermediario' },
  AVANCADO: { valor: 'A', chave: 'avancado' },
})

export default ENUM
