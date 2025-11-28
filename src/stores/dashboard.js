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
    async listarSolicitacoesPendentes (creatorUserId) {
      try {
        this.loading = true
        const { data } = await axios.get(`/match/solicitacoes/${creatorUserId}`)
        return data || []
      } catch (error) {
        throw new Error('Erro ao listar solicitações pendentes', error)
      } finally {
        this.loading = false
      }
    },
    async responderSolicitacao (userMatchId, aceitar, creatorUserId) {
      try {
        const response = await axios.patch('/match/solicitacoes/responder', {
          userMatchId,
          aceitar,
          creatorUserId,
        })
        return response.status === 200
      } catch (error) {
        console.error('Erro ao responder solicitação:', error)
        throw error
      }
    },
  },
})
