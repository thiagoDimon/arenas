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
                  <span class="arena-texto-3" style="color: #5f5f5f">{{ $t('criadoPor', { nomeUsuario: match.createUserName }) }}</span>
                </div>
              </v-col>
              <v-col class="align-justify-center" cols="1" sm="3">
                <v-chip v-if="smAndUp" class="align-justify-center w-100 rounded-lg" color="primary-color-100" variant="flat">
                  <span>{{ getStatusDescription(match.status) }}</span>
                </v-chip>
                <div v-else>
                  <v-icon color="#32ae3b" size="small">mdi-circle</v-icon>
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
                <arn-button bg-color="#E53935" class="w-100 text-capitalize" :desabilitado="match.createUserId == userStore.user.id" :flat="true">
                  <span>{{ $t('removerParticipacao') }}</span>
                </arn-button>
              </v-col>
              <v-col class="pa-2" cols="12" sm="6">
                <arn-button
                  class="w-100"
                  :flat="true"
                  :outlined="true"
                  text-color="#051005"
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
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import { useDisplay } from 'vuetify'
  import { useDashboardStore, useUserStore } from '@/stores'
  import statusPartidaENUM from '@/util/enums/statusPartida'
  import { getFormattedDate } from '@/util/functions'

  const { t } = useI18n()
  const { smAndUp } = useDisplay()
  const dashboardStore = useDashboardStore()
  const userStore = useUserStore()
  const nextMatches = ref([])

  onMounted(async () => {
    nextMatches.value = await dashboardStore.listarProximasPartidas(userStore.user.id)
  })

  function getStatusDescription (status) {
    return t(statusPartidaENUM.getChave(status))
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
