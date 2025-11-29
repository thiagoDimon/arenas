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
  },
})
