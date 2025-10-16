export function createENUM (obj) {
  const ENUM = Object.freeze({ ...obj })

  const lista = Object.entries(ENUM).map(([key, value]) => ({ key, ...value }))

  function getChave (value) {
    return lista.find(item => item.valor === value).chave
  }

  return {
    ...ENUM,
    lista,
    getChave,
  }
}
