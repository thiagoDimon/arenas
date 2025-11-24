<template>
  <div class="solicitacoes">
    <arn-loader :loading="dashboardStore.loading" />
    <div v-if="pendingRequests.length > 0">
      <template v-for="request in pendingRequests" :key="request.userMatchId">
        <arn-card class="mb-4">
          <template #header>
            <v-row class="pa-4" no-gutters>
              <v-col class="arena-titulo-4" cols="11" sm="6">
                <div class="d-flex flex-column">
                  <span>{{ request.matchTitle }}</span>
                  <span v-if="isValidUserName(`${request.userFirstName} ${request.userLastName}`)" class="arena-texto-3" style="color: #5f5f5f">
                    {{ $t('solicitacaoDe', { nome: `${request.userFirstName} ${request.userLastName}` }) }}
                  </span>
                  <span v-else class="arena-texto-3" style="color: #5f5f5f">
                    {{ $t('solicitacaoDe', { nome: request.userEmail }) }}
                  </span>
                </div>
              </v-col>
              <v-col class="align-justify-center" cols="1" sm="3">
                <v-chip v-if="smAndUp" class="align-justify-center w-100 rounded-lg" color="orange" variant="flat">
                  <span>{{ $t('pendente') }}</span>
                </v-chip>
                <div v-else>
                  <v-icon color="orange" size="small">mdi-clock-outline</v-icon>
                </div>
              </v-col>
              <v-col class="horario-partida arena-texto-3" cols="12" sm="3" style="color: #5f5f5f">
                <v-icon size="large">mdi-calendar-outline</v-icon>
                <span>{{ formatDateTime(request.matchDate) }}</span>
              </v-col>
            </v-row>
          </template>
          <template #content>
            <div class="d-flex flex-row pa-1 align-center gap-4">
              <v-avatar size="40">
                <v-img v-if="request.userProfilePic" :src="`data:image/jpeg;base64,${request.userProfilePic}`" />
                <v-icon v-else>mdi-account</v-icon>
              </v-avatar>
              <div class="d-flex flex-column flex-grow-1">
                <span v-if="isValidUserName(`${request.userFirstName} ${request.userLastName}`)" class="font-weight-medium">
                  {{ request.userFirstName }} {{ request.userLastName }}
                </span>
                <span class="text-caption" style="color: #5f5f5f">{{ request.userEmail }}</span>
              </div>
              <div v-if="request.rolePlayer" class="d-flex align-center">
                <v-icon class="mr-1" color="#1B5E20" size="small">mdi-soccer</v-icon>
                <span class="text-body-2">{{ request.rolePlayer }}</span>
              </div>
            </div>
          </template>
          <template #actions>
            <v-row no-gutters>
              <v-col class="pa-2" cols="12" sm="6">
                <arn-button
                  bg-color="#E53935"
                  class="w-100 text-capitalize"
                  :flat="true"
                  @click="handleRejectRequest(request)"
                >
                  <span>{{ $t('recusar') }}</span>
                </arn-button>
              </v-col>
              <v-col class="pa-2" cols="12" sm="6">
                <arn-button
                  bg-color="#32AE3B"
                  class="w-100 text-capitalize"
                  :flat="true"
                  @click="handleAcceptRequest(request)"
                >
                  <span>{{ $t('aceitar') }}</span>
                </arn-button>
              </v-col>
            </v-row>
          </template>
        </arn-card>
      </template>
    </div>
    <div v-else class="text-center pa-8">
      <v-icon color="grey" size="64">mdi-account-clock</v-icon>
      <h3 class="mt-4">{{ $t('nenhumaSolicitacaoPendente') }}</h3>
      <p class="text-grey">{{ $t('mensagemSolicitacoes') }}</p>
    </div>

    <!-- Modal de Confirmação -->
    <v-dialog v-model="showConfirmDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 pa-4" :style="`background-color: ${confirmAction === 'aceitar' ? '#32AE3B' : '#E53935'}; color: white;`">
          <v-icon class="mr-2" color="white">{{ confirmAction === 'aceitar' ? 'mdi-check-circle' : 'mdi-close-circle' }}</v-icon>
          {{ confirmAction === 'aceitar' ? $t('aceitarSolicitacao') : $t('recusarSolicitacao') }}
        </v-card-title>
        <v-card-text class="pa-6">
          <p class="text-body-1">
            {{ confirmAction === 'aceitar' ? $t('mensagemAceitarSolicitacao') : $t('mensagemRecusarSolicitacao') }}
          </p>
          <p v-if="requestToRespond" class="mt-3">
            <strong v-if="isValidUserName(`${requestToRespond.userFirstName} ${requestToRespond.userLastName}`)">{{ requestToRespond.userFirstName }} {{ requestToRespond.userLastName }}</strong>
            <strong v-else>{{ requestToRespond.userEmail }}</strong>
            <br>
            <span class="text-caption">{{ requestToRespond.matchTitle }}</span>
          </p>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn color="grey" variant="text" @click="cancelConfirm">
            {{ $t('cancelar') }}
          </v-btn>
          <v-btn :color="confirmAction === 'aceitar' ? '#32AE3B' : '#E53935'" variant="flat" @click="confirmResponse">
            {{ $t('confirmar') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
  import { useDisplay } from 'vuetify'
  import { useDashboardStore, useUserStore } from '@/stores'
  import { isValidUserName } from '@/util/functions'

  const { smAndUp } = useDisplay()
  const dashboardStore = useDashboardStore()
  const userStore = useUserStore()
  const pendingRequests = ref([])
  const showConfirmDialog = ref(false)
  const requestToRespond = ref(null)
  const confirmAction = ref('aceitar')
  const resolveConfirm = ref(null)

  onMounted(async () => {
    await loadRequests()
  })

  async function loadRequests () {
    try {
      pendingRequests.value = await dashboardStore.listarSolicitacoesPendentes(userStore.user.id)
    } catch (error) {
      console.error('Erro ao carregar solicitações:', error)
    }
  }

  function formatDateTime (dateString) {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  async function handleAcceptRequest (request) {
    requestToRespond.value = request
    confirmAction.value = 'aceitar'
    showConfirmDialog.value = true

    const confirmed = await new Promise(resolve => {
      resolveConfirm.value = resolve
    })

    if (!confirmed) {
      requestToRespond.value = null
      return
    }

    try {
      await dashboardStore.responderSolicitacao(request.userMatchId, true, userStore.user.id)
      await loadRequests()
      console.log('Solicitação aceita com sucesso')
    } catch (error) {
      console.error('Erro ao aceitar solicitação:', error)
      alert('Não foi possível aceitar a solicitação. Tente novamente.')
    } finally {
      requestToRespond.value = null
    }
  }

  async function handleRejectRequest (request) {
    requestToRespond.value = request
    confirmAction.value = 'recusar'
    showConfirmDialog.value = true

    const confirmed = await new Promise(resolve => {
      resolveConfirm.value = resolve
    })

    if (!confirmed) {
      requestToRespond.value = null
      return
    }

    try {
      await dashboardStore.responderSolicitacao(request.userMatchId, false, userStore.user.id)
      await loadRequests()
      console.log('Solicitação recusada com sucesso')
    } catch (error) {
      console.error('Erro ao recusar solicitação:', error)
      alert('Não foi possível recusar a solicitação. Tente novamente.')
    } finally {
      requestToRespond.value = null
    }
  }

  function confirmResponse () {
    showConfirmDialog.value = false
    if (resolveConfirm.value) {
      resolveConfirm.value(true)
      resolveConfirm.value = null
    }
  }

  function cancelConfirm () {
    showConfirmDialog.value = false
    if (resolveConfirm.value) {
      resolveConfirm.value(false)
      resolveConfirm.value = null
    }
  }
</script>

<style>
.solicitacoes {
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

.gap-4 {
  gap: 16px;
}
</style>
