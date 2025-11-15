import { defineStore } from 'pinia'
import axios from '@/services/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    async getMe () {
      this.user = (await axios.get('/user/me')).data
      return this.user
    },
    async getUserById (id) {
      const response = await axios.get(`/user/${id}`)
      return response.data
    },
    async updateUser (id, userData) {
      const response = await axios.put(`/user/${id}`, userData)
      if (this.user && this.user.id === id) {
        await this.getMe()
      }
      return response.data
    },
    async getProfilePicture (id) {
      const response = await axios.get(`/user/getProfilePicture/${id}`)
      return response.data
    },
    clearUser () {
      this.user = null
    },
  },
})
