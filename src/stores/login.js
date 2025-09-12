import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useLoginStore = defineStore('login', {
  state: () => ({
    user: null,
  }),
  actions: {
    async login (email, password) {
      try {
        await axios.post('/user/login', { email, password })
      } catch (error) {
        console.error('Falha no login:', error)
        throw error
      }
    },
    loginGoogle () {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9090'
      return `${apiUrl}/oauth2/authorization/google`
    },
  },
})
