import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useLoginStore = defineStore('login', {
  state: () => ({
    user: null,
  }),
  actions: {
    async login (email, password) {
      try {
        return await axios.post('/user/login', { email, password })
      } catch (error) {
        const error_ = error.response && error.response.status === 401 ? new Error('E-mail ou senha incorretos.') : new Error('Falha ao realizar login. Tente novamente mais tarde.')
        throw error_
      }
    },
    loginGoogle () {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9090'
      return `${apiUrl}/oauth2/authorization/google`
    },
    async logout () {
      try {
        await axios.post('/user/logout')
        localStorage.removeItem('accessToken')
        this.user = null
      } catch (error) {
        console.error('Erro ao realizar logout:', error)
      }
    },
  },
})
