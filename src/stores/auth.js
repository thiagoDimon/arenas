import { defineStore } from 'pinia'
import axios from '@/services/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    logado: false,
    token: '',
  }),
  actions: {
    async criarUsuario (payload) {
      await axios.post('/user', {
        email: payload.email,
        password: payload.password,
      })
    },
  },
})
