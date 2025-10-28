import { defineStore } from 'pinia'
import axios from '@/services/axios'

export const useMatchStore = defineStore('match', {
  state: () => ({}),
  actions: {
    async saveMatch (partida) {
      try {
        const partidaApi = {
            matchData: partida.data + 'T' + partida.horario + ':00.000+02:00',
            text: partida.titulo,
            maxPlayers: partida.maximoJogadores,
            description: partida.descricao,
            creatorUserId: 1, //TODO fix this
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

        console.log(partidaApi);

        const response = await axios.post('/match',  partidaApi )
        return response.status == 200
      } catch {
        throw new Error('mensagemPartidaErro')
      }
    },
  },
})
