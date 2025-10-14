import { defineStore } from 'pinia'
import axios from '@/services/axios'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    loading: false,
    proximasPartidas: [],
    solicitacoes: [],
    historico: [],
  }),
  actions: {
    async listarProximasPartidas (userId) {
      try {
        this.loading = true
        const { data } = await axios.get(`/dashboard/next-matches/${userId}`)
        return data || []
      } catch (error) {
        throw new Error('Erro ao listar próximas partidas', error)
      } finally {
        this.loading = false
      }
    },
  },
})
