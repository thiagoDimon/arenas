import { defineStore } from 'pinia'
import axios from '@/services/axios'

export const useMatchStore = defineStore('match', {
  state: () => ({}),
  actions: {
    async saveMatch (partida, userId) {
      const [day, month, year] = partida.data.split('/')
      const formatedDate = `${year}-${month}-${day}`

      const partidaApi = {
        matchData: formatedDate + 'T' + partida.horario + ':00.000+02:00',
        text: partida.titulo,
        maxPlayers: partida.maximoJogadores,
        description: partida.descricao,
        creatorUserId: userId,
        matchParameterDto: {
          userValue: partida.valorPessoa,
          matchLevel: partida.nivel,
          privateMatch: partida.privada,
          notifyUser: false,
          reocuringMatch: partida.recorrente,
        },
        localMatchDto: {
          localName: partida.nomeLocal,
          localZipCode: partida.cep,
          localStreet: partida.rua,
          localNumber: partida.numeroLocal,
          localComplement: partida.complemento,
          localCity: partida.cidade,
          localState: partida.estado,
          localNeighborhood: partida.bairro,
        },
      }

      const response = await axios.post('/match', partidaApi)

      return response.status == 200
    },
    async searchMatches (filters) {
      const { data } = await axios.post('/match/search', filters)
      return data || []
    },
    async requestToJoinMatch (match, userId) {
      const joinMatch = {
        userId,
        matchId: match.id,
        rolePlayer: match.userPosition,
        userMatchStatus: match.userMatchStatus,
      }
      await axios.post('/user-match', joinMatch)
    },
    async leaveMatch (matchId, userId) {
      try {
        const response = await axios.delete('/match/leave', {
          data: {
            matchId,
            userId,
          },
        })
        return response.status === 200
      } catch (error) {
        console.error('Erro ao remover participação:', error)
        throw error
      }
    },
    async getMyCreatedMatches (userId) {
      try {
        const { data } = await axios.get(`/match/created/${userId}`)
        return data || []
      } catch (error) {
        console.error('Erro ao buscar partidas criadas:', error)
        throw error
      }
    },
    async getMatchWithPlayers (matchId) {
      try {
        const { data } = await axios.get(`/match/${matchId}/players`)
        return data
      } catch (error) {
        console.error('Erro ao buscar detalhes da partida:', error)
        throw error
      }
    },
    async updatePlayerPositions (dados) {
      try {
        const response = await axios.put(`/match/${dados.matchId}/positions`, {
          positions: dados.positions,
        })
        return response.status === 200
      } catch (error) {
        console.error('Erro ao atualizar posições:', error)
        throw error
      }
    },
    async removePlayerFromMatch (matchId, playerId) {
      try {
        const response = await axios.delete(`/match/${matchId}/player/${playerId}`)
        return response.status === 200
      } catch (error) {
        console.error('Erro ao remover jogador:', error)
        throw error
      }
    },
    async cancelMatch (matchId, userId) {
      try {
        const response = await axios.put(`/match/${matchId}/cancel`, {
          creatorUserId: userId,
        })
        return response.status === 200
      } catch (error) {
        console.error('Erro ao cancelar partida:', error)
        throw error
      }
    },
    async finalizeMatch (matchId, userId) {
      try {
        const response = await axios.put(`/match/${matchId}/finalize`, {
          creatorUserId: userId,
        })
        return response.status === 200
      } catch (error) {
        console.error('Erro ao finalizar partida:', error)
        throw error
      }
    },
  },
})
