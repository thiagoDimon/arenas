<template>
  <div class="pa-6" style="min-height: 100vh;">
    <arn-loader :loading="loading" />

    <div v-if="minhasPartidas.length > 0" class="overflow-y-auto">
      <template v-for="match in minhasPartidas" :key="match.id">
        <arn-card class="mt-4">
          <template #header>
            <v-row class="pa-4" no-gutters>
              <v-col class="arena-titulo-4" cols="11" sm="6">
                <div class="d-flex flex-column">
                  <span>{{ match.title }}</span>
                </div>
              </v-col>
              <v-col class="align-justify-center" cols="1" sm="3">
                <v-chip v-if="smAndUp" class="align-justify-center w-100 rounded-lg" :color="getStatusColor(match.status)" variant="flat">
                  <span>{{ getStatusDescription(match.status) }}</span>
                </v-chip>
                <div v-else>
                  <v-icon :color="getStatusColor(match.status)" size="small">mdi-circle</v-icon>
                </div>
              </v-col>
              <v-col class="horario-partida arena-texto-3" cols="12" sm="3" style="color: #5f5f5f">
                <v-icon size="large">mdi-calendar-outline</v-icon>
                <span>{{ getFormattedDate(match.date, match.time) }}</span>
              </v-col>
            </v-row>
          </template>
          <template #content>
            <div class="d-flex flex-row pa-1 align-center">
              <arn-icon color="#5f5f5f" icon="jogadores" />
              <span class="ml-2">{{ `${match.currentPlayers}/${match.maxPlayers} ${$t('jogadores')}` }}</span>
            </div>
            <v-progress-linear color="#32ae3b" height="4px" :max="match.maxPlayers" :model-value="match.currentPlayers" />
          </template>
          <template #actions>
            <v-row no-gutters>
              <v-col class="pa-2" :cols="match.status === 'X' || match.status === 'F' ? 6 : 4" :sm="match.status === 'X' || match.status === 'F' ? 6 : 4">
                <arn-button
                  class="w-100"
                  :flat="true"
                  :outlined="true"
                  text-color="#051005"
                  @click="abrirDetalhesPartida(match)"
                >
                  <span>{{ $t('detalhes') }}</span>
                </arn-button>
              </v-col>
              <v-col class="pa-2" :cols="match.status === 'X' || match.status === 'F' ? 6 : 4" :sm="match.status === 'X' || match.status === 'F' ? 6 : 4">
                <arn-button
                  bg-color="#1976D2"
                  class="w-100"
                  :desabilitado="match.status === 'X' || match.status === 'F'"
                  :flat="true"
                  @click="gerenciarJogadores(match)"
                >
                  <span>{{ $t('gerenciarJogadores') }}</span>
                </arn-button>
              </v-col>
              <v-col v-if="match.status !== 'X' && match.status !== 'F'" class="pa-2" cols="12" sm="4">
                <arn-button
                  v-if="!isMatchPastScheduledTime(match)"
                  bg-color="#E53935"
                  class="w-100"
                  :flat="true"
                  @click="cancelarPartida(match)"
                >
                  <span>{{ $t('cancelarPartida') }}</span>
                </arn-button>
                <arn-button
                  v-else
                  bg-color="#32AE3B"
                  class="w-100"
                  :flat="true"
                  @click="finalizarPartida(match)"
                >
                  <span>{{ $t('finalizarPartida') }}</span>
                </arn-button>
              </v-col>
            </v-row>
          </template>
        </arn-card>
      </template>
    </div>
    <div v-else class="text-center pa-8">
      <v-icon color="grey" size="64">mdi-soccer-field</v-icon>
      <h3 class="mt-4">{{ $t('nenhumaPartidaCriada') }}</h3>
      <p class="text-grey">{{ $t('voceAindaNaoCriouPartidas') }}</p>
    </div>

    <arn-match-details-modal
      v-model="showDetailsModal"
      :match="selectedMatch"
      :show-remove-button="false"
    />

    <arn-match-players-modal
      v-model="showPlayersModal"
      :match="selectedMatch"
      @remove-player="removerJogador"
      @update-positions="atualizarPosicoes"
    />

    <arn-confirm-modal
      v-model="showCancelModal"
      cancel-text="Não"
      confirm-color="#E53935"
      confirm-text="Sim, cancelar"
      header-color="#E53935"
      icon="mdi-alert-circle-outline"
      :message="$t('confirmarCancelamentoPartida')"
      :title="$t('atencao')"
      @confirm="confirmarCancelamento"
    />

    <arn-confirm-modal
      v-model="showFinalizeModal"
      cancel-text="Não"
      confirm-color="#32AE3B"
      confirm-text="Sim, finalizar"
      header-color="#32AE3B"
      icon="mdi-check-circle-outline"
      :message="$t('confirmarFinalizacaoPartida')"
      :title="$t('atencao')"
      @confirm="confirmarFinalizacao"
    />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useDisplay } from 'vuetify'
  import ArnConfirmModal from '@/components/modals/ArnConfirmModal.vue'
  import ArnMatchDetailsModal from '@/components/modals/ArnMatchDetailsModal.vue'
  import ArnMatchPlayersModal from '@/components/modals/ArnMatchPlayersModal.vue'
  import { useMatchStore, useUserStore } from '@/stores'
  import matchStatusEnum from '@/util/enums/matchStatus.js'
  import { getFormattedDate } from '@/util/functions'

  const { smAndUp } = useDisplay()
  const matchStore = useMatchStore()
  const userStore = useUserStore()

  const minhasPartidas = ref([])
  const loading = ref(false)
  const showDetailsModal = ref(false)
  const showPlayersModal = ref(false)
  const showCancelModal = ref(false)
  const showFinalizeModal = ref(false)
  const selectedMatch = ref(null)
  const matchToCancel = ref(null)
  const matchToFinalize = ref(null)

  onMounted(async () => {
    await carregarMinhasPartidas()
  })

  function isMatchPastScheduledTime (match) {
    if (!match.date || !match.time) return false

    // Parse da data e hora da partida
    const [year, month, day] = match.date.split('-')
    const [hours, minutes] = match.time.split(':')
    const matchDateTime = new Date(year, month - 1, day, hours, minutes)

    // Comparar com data/hora atual
    const now = new Date()
    return now > matchDateTime
  }

  async function carregarMinhasPartidas () {
    try {
      loading.value = true
      minhasPartidas.value = await matchStore.getMyCreatedMatches(userStore.user.id)
    } finally {
      loading.value = false
    }
  }

  function getStatusDescription (status) {
    const item = matchStatusEnum.lista.find(item => item.valor === status)
    return item ? item.chave : status
  }

  function getStatusColor (status) {
    const item = matchStatusEnum.lista.find(item => item.valor === status)
    return item ? item.color : '#grey'
  }

  function abrirDetalhesPartida (match) {
    selectedMatch.value = match
    showDetailsModal.value = true
  }

  async function gerenciarJogadores (match) {
    selectedMatch.value = match
    // Buscar detalhes completos da partida incluindo jogadores e posições
    const partidaCompleta = await matchStore.getMatchWithPlayers(match.id)
    selectedMatch.value = partidaCompleta
    showPlayersModal.value = true
  }

  async function atualizarPosicoes (dados) {
    try {
      loading.value = true
      await matchStore.updatePlayerPositions(dados)
      await carregarMinhasPartidas()
    } finally {
      loading.value = false
    }
  }

  async function removerJogador (jogadorId) {
    try {
      loading.value = true
      await matchStore.removePlayerFromMatch(selectedMatch.value.id, jogadorId)
      await carregarMinhasPartidas()
      // Atualizar a modal
      const partidaAtualizada = await matchStore.getMatchWithPlayers(selectedMatch.value.id)
      selectedMatch.value = partidaAtualizada
    } finally {
      loading.value = false
    }
  }

  function cancelarPartida (match) {
    matchToCancel.value = match
    showCancelModal.value = true
  }

  async function confirmarCancelamento () {
    try {
      loading.value = true
      await matchStore.cancelMatch(matchToCancel.value.id, userStore.user.id)
      await carregarMinhasPartidas()
      matchToCancel.value = null
    } finally {
      loading.value = false
    }
  }

  function finalizarPartida (match) {
    matchToFinalize.value = match
    showFinalizeModal.value = true
  }

  async function confirmarFinalizacao () {
    try {
      loading.value = true
      await matchStore.finalizeMatch(matchToFinalize.value.id, userStore.user.id)
      await carregarMinhasPartidas()
      matchToFinalize.value = null
    } finally {
      loading.value = false
    }
  }
</script>
