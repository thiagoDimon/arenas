import { defineStore } from 'pinia'
import axios from '@/services/axios'

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    loading: false,
  }),
  actions: {
    async buscarPartidas () {
      try {
        // TODO: Buscar por id do usuário
        this.loading = true
        const { data } = await axios.get('/partidas')
        return data || []
      } finally {
        this.loading = false
      }
    },
  },
})
