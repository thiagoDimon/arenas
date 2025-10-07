import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useLoginStore = defineStore('login', {
  state: () => ({
    user: null,
  }),
  actions: {
    async login (email, password) {
      try {
        const { data } = await axios.post('/auth/login', { email, password })
        return data.accessToken || ''
      } catch {
        throw new Error('mensagemUsuarioSenhaInvalido')
      }
    },
    loginGoogle () {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://arenas-backend.gustavotbett.com.br'
      return `${apiUrl}/oauth2/authorization/google`
    },
    async logout () {
      try {
        await axios.post('/auth/logout')
        localStorage.removeItem('accessToken')
        this.user = null
      } catch (error) {
        console.error('Erro ao realizar logout:', error)
      }
    },
  },
})
