import { defineStore } from 'pinia'
import axios from '@/services/axios'

export const useMatchStore = defineStore('match', {
  state: () => ({}),
  actions: {
    async saveMatch (partida, userId) {
      try {
        const [day, month, year] = partida.data.split("/");
        const formatedDate = `${year}-${month}-${day}`;

        const partidaApi = {
            matchData: formatedDate + 'T' + partida.horario + ':00.000+02:00',
            text: partida.titulo,
            maxPlayers: partida.maximoJogadores,
            description: partida.descricao,
            creatorUserId: userId,
            matchParameterDto: {
                user_value: partida.valorPessoa,
                match_level: partida.nivel,
                privateMatch: partida.privada,
                notifyUser: false, //TODO fix this
                reocuringMatch: partida.recorrente
            },
            localMatchDto: {
                localName: partida.nomeLocal,
                localZipCode: partida.cep,
                localStreet: partida.rua,
                localNumber: partida.numeroLocal,
                localComplement: partida.complemento,
                localCity: partida.cidade,
                localState: partida.estado,
                localNeighborhood: partida.bairro
            }
        }

        const token = localStorage.getItem('accessToken')

        const response = await axios.post('/match',  partidaApi,  {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        return response.status == 200

      } catch(error) {
        throw new Error('mensagemPartidaErro', error)
      }
    },
  },
})
