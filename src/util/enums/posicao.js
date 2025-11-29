import { createENUM } from './createENUM.js'

const ENUM = createENUM({
  GOLEIRO: { valor: 'GOL', chave: 'goleiro' },
  ZAGUEIRO: { valor: 'ZAG', chave: 'zagueiro' },
  LATERAL_DIREITO: { valor: 'LD', chave: 'lateralDireito' },
  LATERAL_ESQUERDO: { valor: 'LE', chave: 'lateralEsquerdo' },
  VOLANTE: { valor: 'VOL', chave: 'volante' },
  MEIA: { valor: 'MEI', chave: 'meia' },
  ATACANTE: { valor: 'ATA', chave: 'atacante' },
  PONTA_DIREITA: { valor: 'PD', chave: 'pontaDireita' },
  PONTA_ESQUERDA: { valor: 'PE', chave: 'pontaEsquerda' },
})

export default ENUM
