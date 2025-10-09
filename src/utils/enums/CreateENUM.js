export function createENUM (obj) {
  const ENUM = Object.freeze({ ...obj })

  const lista = Object.entries(ENUM).map(([key, value]) => ({ key, ...value }))

  function getByChave (chave) {
    return lista.find(item => item.chave === chave)
  }

  return {
    ...ENUM,
    lista,
    getByChave,
  }
}
