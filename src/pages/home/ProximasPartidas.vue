<template>
  <div class="proximas-partidas">
    <arn-loader :loading="dashboardStore.loading" />
    <div v-if="nextMatches.length > 0">
      <template v-for="match in nextMatches" :key="match.id">
        <arn-card class="mb-4">
          <template #header>
            <v-row class="pa-4" no-gutters>
              <v-col class="arena-titulo-4" cols="11" sm="6">
                <div class="d-flex flex-column">
                  <span>{{ match.title }}</span>
                  <span v-if="isValidUserName(match.createUserName)" class="arena-texto-3" style="color: #5f5f5f">{{ $t('criadoPor', { nomeUsuario: match.createUserName }) }}</span>
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
              <v-col class="pa-2" cols="12" sm="6">
                <arn-button
                  bg-color="#E53935"
                  class="w-100 text-capitalize"
                  :desabilitado="match.createUserId == userStore.user.id"
                  :flat="true"
                  @click="handleRemoveParticipation(match)"
                >
                  <span>{{ $t('removerParticipacao') }}</span>
                </arn-button>
              </v-col>
              <v-col class="pa-2" cols="12" sm="6">
                <arn-button
                  class="w-100"
                  :flat="true"
                  :outlined="true"
                  text-color="#051005"
                  @click="openDetailsModal(match)"
                >
                  <span>{{ $t('detalhes') }}</span>
                </arn-button>
              </v-col>
            </v-row>
          </template>
        </arn-card>
      </template>
    </div>
    <div v-else class="text-center pa-8">
      <v-icon color="grey" size="64">mdi-soccer</v-icon>
      <h3 class="mt-4">{{ $t('nenhumaPartidaAgendada') }}</h3>
      <p class="text-grey">{{ $t('mensagemProximasPartidas') }}</p>
    </div>

    <arn-match-details-modal
      v-model="showDetailsModal"
      :match="selectedMatch"
      :show-remove-button="selectedMatch && selectedMatch.createUserId !== userStore.user.id"
      @remove="handleRemoveParticipation"
    />

    <v-dialog v-model="showConfirmDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 pa-4" style="background-color: #E53935; color: white;">
          <v-icon class="mr-2" color="white">mdi-alert-circle</v-icon>
          {{ $t('confirmarRemocao') }}
        </v-card-title>
        <v-card-text class="pa-6">
          <p class="text-body-1">{{ $t('mensagemConfirmarRemocao') }}</p>
          <p v-if="matchToRemove" class="mt-3 font-weight-bold">{{ matchToRemove.title }}</p>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn color="grey" variant="text" @click="cancelRemove">
            {{ $t('cancelar') }}
          </v-btn>
          <v-btn color="#E53935" variant="flat" @click="confirmRemove">
            {{ $t('confirmar') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import { useDisplay } from 'vuetify'
  import ArnMatchDetailsModal from '@/components/modals/ArnMatchDetailsModal.vue'
  import { useDashboardStore, useMatchStore, useUserStore } from '@/stores'
  import userMatchStatusEnum from '@/util/enums/userMatchStatus'
  import { getFormattedDate, isValidUserName } from '@/util/functions'

  const { t } = useI18n()
  const { smAndUp } = useDisplay()
  const dashboardStore = useDashboardStore()
  const matchStore = useMatchStore()
  const userStore = useUserStore()
  const nextMatches = ref([])
  const showDetailsModal = ref(false)
  const selectedMatch = ref(null)
  const showConfirmDialog = ref(false)
  const matchToRemove = ref(null)
  const resolveRemove = ref(null)

  onMounted(async () => {
    nextMatches.value = await dashboardStore.listarProximasPartidas(userStore.user.id)
  })

  function getStatusDescription (status) {
    const chave = userMatchStatusEnum.getChave(status)
    return chave ? t(chave) : status
  }

  function getStatusColor (status) {
    const item = userMatchStatusEnum.lista.find(item => item.valor === status)
    return item ? item.color : 'primary-color-100'
  }

  function openDetailsModal (match) {
    selectedMatch.value = match
    showDetailsModal.value = true
  }

  async function handleRemoveParticipation (match) {
    matchToRemove.value = match
    showConfirmDialog.value = true

    const confirmed = await new Promise(resolve => {
      resolveRemove.value = resolve
    })

    if (!confirmed) {
      matchToRemove.value = null
      return
    }

    try {
      await matchStore.leaveMatch(match.id, userStore.user.id)

      nextMatches.value = nextMatches.value.filter(m => m.id !== match.id)

      showDetailsModal.value = false

      console.log('Participação removida com sucesso')
    } catch (error) {
      console.error('Erro ao remover participação:', error)
      alert('Não foi possível remover a participação. Tente novamente.')
    } finally {
      matchToRemove.value = null
    }
  }

  function confirmRemove () {
    showConfirmDialog.value = false
    if (resolveRemove.value) {
      resolveRemove.value(true)
      resolveRemove.value = null
    }
  }

  function cancelRemove () {
    showConfirmDialog.value = false
    if (resolveRemove.value) {
      resolveRemove.value(false)
      resolveRemove.value = null
    }
  }

</script>

<style>
.proximas-partidas {
  background-color: #ffffff;
  min-height: 100vh;
  padding: 24px;
}

.horario-partida {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  gap: 8px;
  @media screen and (max-width: 600px) {
    justify-content: flex-start;
    margin-top: 8px;
    font-size: 14px;
  }
}
</style>
