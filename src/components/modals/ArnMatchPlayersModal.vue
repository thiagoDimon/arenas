<template>
  <v-dialog v-model="isOpen" max-width="900px" persistent>
    <v-card>
      <v-card-title class="d-flex align-center pa-4" style="background-color: #32AE3B; color: white;">
        <v-icon class="mr-2" color="white" size="large">mdi-account-group</v-icon>
        <span class="text-h5">{{ match?.title }}</span>
        <v-spacer />
        <v-btn icon="mdi-close" size="small" variant="text" @click="close" />
      </v-card-title>

      <v-card-text class="pa-6">

        <!-- Lista de Todos os Jogadores -->
        <div class="mb-4">
          <h4 class="text-h6 mb-3 d-flex align-center">
            <v-icon class="mr-2" color="#1B5E20">mdi-account-group</v-icon>
            {{ $t('jogadores') }} ({{ match.players?.length || 0 }}/{{ match.maxPlayers }})
          </h4>

          <v-list v-if="match.players && match.players.length > 0" class="bg-grey-lighten-5 rounded">
            <v-list-item
              v-for="jogador in todosJogadoresComPosicao"
              :key="jogador.id"
              class="mb-1"
            >
              <template #prepend>
                <v-avatar :color="jogador.posicao ? '#32AE3B' : '#9E9E9E'" size="40">
                  <v-icon color="white">mdi-account</v-icon>
                </v-avatar>
              </template>

              <v-list-item-title>
                {{ jogador.email }}
              </v-list-item-title>

              <template #append>
                <div class="d-flex align-center ga-2">
                  <v-chip
                    v-if="jogador.posicao"
                    color="#32AE3B"
                    label
                    size="small"
                    variant="flat"
                  >
                    <v-icon class="mr-1" size="small">mdi-shield-account</v-icon>
                    {{ jogador.posicaoLabel }}
                  </v-chip>
                  <v-chip
                    v-else
                    color="#9E9E9E"
                    label
                    size="small"
                    variant="flat"
                  >
                    {{ $t('semPosicao') }}
                  </v-chip>
                  <v-btn
                    color="error"
                    icon="mdi-delete"
                    size="small"
                    variant="text"
                    @click="abrirModalRemoverJogador(jogador)"
                  />
                </div>
              </template>
            </v-list-item>
          </v-list>

          <div v-else class="text-center pa-8 text-grey">
            <v-icon color="grey" size="48">mdi-account-off</v-icon>
            <p class="mt-2">{{ $t('nenhumJogadorNaPartida') }}</p>
          </div>
        </div>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-spacer />
        <arn-button
          bg-color="#32AE3B"
          :flat="true"
          @click="salvarPosicoes"
        >
          <span>{{ $t('salvar') }}</span>
        </arn-button>
        <arn-button
          :flat="true"
          :outlined="true"
          text-color="#051005"
          @click="close"
        >
          <span>{{ $t('fechar') }}</span>
        </arn-button>
      </v-card-actions>
    </v-card>

    <!-- Modal de confirmação para remover jogador -->
    <arn-confirm-modal
      v-model="showRemovePlayerModal"
      cancel-text="Não"
      confirm-color="#E53935"
      confirm-text="Sim, remover"
      header-color="#E53935"
      icon="mdi-account-remove-outline"
      :message="$t('confirmarRemoverJogador', { nome: playerToRemove?.nome || '' })"
      :title="$t('atencao')"
      @confirm="confirmarRemocaoJogador"
    />

  </v-dialog>
</template>

<script setup>
  import { computed, ref, watch } from 'vue'
  import ArnConfirmModal from '@/components/modals/ArnConfirmModal.vue'
  import matchStatusEnum from '@/util/enums/matchStatus.js'
  import { getFormattedDate } from '@/util/functions'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
    match: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits(['update:modelValue', 'update-positions', 'remove-player'])

  const isOpen = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
  })

  const posicoes = ref({
    GOL: null,
    LD: null,
    ZAG1: null,
    ZAG2: null,
    LE: null,
    VOL: null,
    MC1: null,
    MC2: null,
    ATA1: null,
    ATA2: null,
    ATA3: null,
  })

  const showRemovePlayerModal = ref(false)
  const playerToRemove = ref(null)

  const todosJogadoresComPosicao = computed(() => {
    if (!props.match?.players) return []

    const posicoesMap = {
      GOL: 'Goleiro',
      LD: 'Lateral Direito',
      ZAG1: 'Zagueiro 1',
      ZAG2: 'Zagueiro 2',
      LE: 'Lateral Esquerdo',
      VOL: 'Volante',
      MC1: 'Meio-Campo 1',
      MC2: 'Meio-Campo 2',
      ATA1: 'Atacante 1',
      ATA2: 'Atacante 2',
      ATA3: 'Atacante 3',
    }

    return props.match.players.map(jogador => {
      const posicaoEncontrada = Object.entries(posicoes.value).find(
        ([, j]) => j?.id === jogador.id,
      )

      return {
        ...jogador,
        posicao: posicaoEncontrada ? posicaoEncontrada[0] : null,
        posicaoLabel: posicaoEncontrada ? posicoesMap[posicaoEncontrada[0]] : null,
      }
    }).sort((a, b) => {
      if (a.posicao && !b.posicao) return -1
      if (!a.posicao && b.posicao) return 1
      if (a.posicao && b.posicao) {
        const ordem = ['GOL', 'LD', 'ZAG1', 'ZAG2', 'LE', 'VOL', 'MC1', 'MC2', 'ATA1', 'ATA2', 'ATA3']
        return ordem.indexOf(a.posicao) - ordem.indexOf(b.posicao)
      }
      return a.nome.localeCompare(b.nome)
    })
  })

  watch(() => props.match, newMatch => {
    if (newMatch?.positions) {
      posicoes.value = { ...newMatch.positions }
    }
  }, { immediate: true })

  function close () {
    isOpen.value = false
  }

  function getStatusDescription (status) {
    const item = matchStatusEnum.lista.find(item => item.valor === status)
    return item ? item.chave : status
  }

  function abrirModalRemoverJogador (jogador) {
    playerToRemove.value = jogador
    showRemovePlayerModal.value = true
  }

  function confirmarRemocaoJogador () {
    if (playerToRemove.value) {
      emit('remove-player', playerToRemove.value.id)
      playerToRemove.value = null
    }
  }

  function salvarPosicoes () {
    const dados = {
      matchId: props.match.id,
      positions: posicoes.value,
    }
    emit('update-positions', dados)
    close()
  }
</script>

<style scoped>
@media (max-width: 768px) {
  .player-slot {
    min-width: 60px;
    min-height: 60px;
  }
}
</style>
