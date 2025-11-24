export function createENUM (obj) {
  const ENUM = Object.freeze({ ...obj })

  const lista = Object.entries(ENUM).map(([key, value]) => ({ key, ...value }))

  function getChave (value) {
    const found = lista.find(item => item.valor === value)
    return found ? found.chave : null
  }

  return {
    ...ENUM,
    lista,
    getChave,
  }
}
