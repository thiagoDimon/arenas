import axios from '@/services/axios'

/**
 * Faz o refresh do accessToken usando o refresh-token (cookie httpOnly).
 * Salva o novo accessToken no localStorage, se obtido.
 * @returns {Promise<string>} Novo accessToken
 * @throws {Error} Se não for possível renovar o token
 */
export async function refreshToken () {
  try {
    const response = await axios.get('/auth/refresh-token')
    if (response?.data?.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken)
      return response.data.accessToken
    } else {
      throw new Error('Não foi possível renovar o token.')
    }
  } catch {
    throw new Error('Falha ao renovar o token.')
  }
}
