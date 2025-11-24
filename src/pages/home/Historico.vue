<template>
  <div class="historico">
    <arn-loader :loading="dashboardStore.loading" />
    <div v-if="matchHistory.length > 0">
      <template v-for="match in matchHistory" :key="match.id">
        <arn-card class="mb-4">
          <template #header>
            <v-row class="pa-4" no-gutters>
              <v-col class="arena-titulo-4" cols="12" sm="6">
                <div class="d-flex flex-column">
                  <span>{{ match.title }}</span>
                  <span v-if="isValidUserName(match.createUserName)" class="arena-texto-3" style="color: #5f5f5f">{{ $t('criadoPor', { nomeUsuario: match.createUserName }) }}</span>
                </div>
              </v-col>
              <v-col class="align-justify-center" cols="12" sm="3">
                <v-chip v-if="smAndUp" class="align-justify-center w-100 rounded-lg" color="grey" variant="flat">
                  <span>{{ $t('finalizada') }}</span>
                </v-chip>
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
          </template>
          <template #actions>
            <v-row no-gutters>
              <v-col class="pa-2" cols="12">
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
      <v-icon color="grey" size="64">mdi-history</v-icon>
      <h3 class="mt-4">{{ $t('nenhumHistoricoDisponivel') }}</h3>
      <p class="text-grey">{{ $t('mensagemHistorico') }}</p>
    </div>

    <arn-match-details-modal
      v-model="showDetailsModal"
      :match="selectedMatch"
      :show-remove-button="false"
    />
  </div>
</template>

<script setup>
  import { useDisplay } from 'vuetify'
  import ArnMatchDetailsModal from '@/components/modals/ArnMatchDetailsModal.vue'
  import { useDashboardStore } from '@/stores'
  import { getFormattedDate, isValidUserName } from '@/util/functions'

  const { smAndUp } = useDisplay()
  const dashboardStore = useDashboardStore()
  const matchHistory = ref([])
  const showDetailsModal = ref(false)
  const selectedMatch = ref(null)

  onMounted(async () => {
    matchHistory.value = []
  })

  function openDetailsModal (match) {
    selectedMatch.value = match
    showDetailsModal.value = true
  }
</script>

<style>
.historico {
  background-color: #ffffff;
  min-height: 100vh;
  padding: 24px;
}
</style>
