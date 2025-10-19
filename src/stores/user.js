import { defineStore } from 'pinia'
import axios from '@/services/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    async getMe () {
      this.user = (await axios.get('/user/me')).data
    },
  },
})
