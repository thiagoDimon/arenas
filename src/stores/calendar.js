import { defineStore } from 'pinia'
import axios from '@/services/axios'

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    loading: false,
  }),
  actions: {
    async buscarPartidas (userId) {
      try {
        this.loading = true
        const { data } = await axios.get(`/match/calendario/${userId}`)
        return data || []
      } catch (error) {
        console.error('Erro ao buscar partidas:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
