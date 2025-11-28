<template>
  <div class="pa-6" style="min-height: 100vh;">
    <arn-loader :loading="loading" />
    <arn-card>
      <template #header>
        <v-row class="pa-4">
          <v-col cols="12" sm="8">
            <div class="d-flex flex-row ga-2 align-center">
              <v-icon color="#5f5f5f" icon="mdi-magnify" size="28" />
              <span>{{ $t("buscarFiltrar") }}</span>
            </div>
            <div class="arena-texto-3" style="color: #5f5f5f">{{ $t("encontrePartida") }}</div>
          </v-col>
          <v-col v-if="!smAndDown" class="d-flex justify-end align-center ga-3" cols="4">
            <arn-button bg-color="#E53935" :flat="true" @click="limparFiltros()">
              <span>{{ $t("limparFiltros") }}</span>
            </arn-button>
            <arn-button bg-color="#32AE3B" :flat="true" @click="buscarPartidas()">
              <span>{{ $t("pesquisar") }}</span>
            </arn-button>
          </v-col>
        </v-row>
      </template>
      <template #content>
        <v-row class="">
          <v-col cols="12" sm="8">
            <v-text-field
              v-model="filtros.title"
              clearable
              color="primary-color-300"
              density="comfortable"
              hide-details
              :placeholder="$t('tituloPartida')"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              v-model="filtros.status"
              bg-color="white"
              clearable
              color="primary-color-300"
              density="comfortable"
              hide-details
              item-title="descricao"
              item-value="valor"
              :items="listaStatus"
              :placeholder="$t('status')"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="filtros.localName"
              clearable
              color="primary-color-300"
              density="comfortable"
              hide-details
              :placeholder="$t('local')"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="filtros.city"
              clearable
              color="primary-color-300"
              density="comfortable"
              hide-details
              :placeholder="$t('cidade')"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-mask-input
              v-model="filtros.zipCode"
              color="primary-color-300"
              density="comfortable"
              hide-details
              :mask="$t('mascaraCep')"
              :placeholder="$t('cep')"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <arn-date-picker :model-value="filtros.date" :placeholder="$t('data')" @update:model-value="filtros.date = $event" />
          </v-col>
          <v-col cols="12" sm="6">
            <arn-time-picker :model-value="filtros.time" :placeholder="$t('horario')" @update:model-value="filtros.time = $event" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-mask-input
              v-model="filtros.userValue"
              color="primary-color-300"
              density="comfortable"
              hide-details
              :mask="$t('mascaraDinheiro')"
              :placeholder="$t('valorPessoa')"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="filtros.matchLevel"
              bg-color="white"
              clearable
              color="primary-color-300"
              density="comfortable"
              hide-details
              item-title="descricao"
              item-value="valor"
              :items="listaNiveis"
              :placeholder="$t('nivel')"
              variant="outlined"
            />
          </v-col>
        </v-row>
      </template>
      <template v-if="smAndDown" #actions>
        <v-row>
          <v-col class="d-flex justify-end pa-5 ga-3" cols="12">
            <arn-button bg-color="#E53935" :flat="true" @click="limparFiltros()">
              <span>{{ $t("limparFiltros") }}</span>
            </arn-button>
            <arn-button bg-color="#32AE3B" :flat="true" @click="buscarPartidas()">
              <span>{{ $t("pesquisar") }}</span>
            </arn-button>
          </v-col>
        </v-row>
      </template>
    </arn-card>
    <div v-if="listaPartidas.length > 0" class="overflow-y-auto">
      <template v-for="match in listaPartidas" :key="match.id">
        <arn-card class="mt-4">
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
                  class="w-100"
                  :flat="true"
                  :outlined="true"
                  text-color="#051005"
                  @click="abrirDetalhesPartida(match)"
                >
                  <span>{{ $t('detalhes') }}</span>
                </arn-button>
              </v-col>
              <v-col class="pa-2" cols="12" sm="6">
                <arn-button
                  class="w-100 text-capitalize"
                  :desabilitado="match.currentPlayers >= match.maxPlayers"
                  :flat="true"
                  @click="solicitarParticipacao(match)"
                >
                  <span>{{ $t('participar') }}</span>
                </arn-button>
              </v-col>
            </v-row>
          </template>
        </arn-card>
      </template>
    </div>
    <div v-else class="text-center pa-8">
      <v-icon color="grey" size="64">mdi-soccer-field</v-icon>
      <h3 class="mt-4">{{ $t('todasPartidas') }}</h3>
      <p class="text-grey">{{ $t('exploreTodasPartidas') }}</p>
    </div>

    <arn-match-details-modal
      v-model="showDetailsModal"
      :match="selectedMatch"
      :show-remove-button="false"
    />
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import { useDisplay } from 'vuetify'
  import ArnMatchDetailsModal from '@/components/modals/ArnMatchDetailsModal.vue'
  import { useMatchStore } from '@/stores'
  import NivelENUM from '@/util/enums/nivel.js'
  import userMatchStatusEnum from '@/util/enums/userMatchStatus.js'
  import { getFormattedDate, isValidUserName } from '@/util/functions'

  const { smAndDown, smAndUp } = useDisplay()
  const { t } = useI18n()
  const matchStore = useMatchStore()

  const listaPartidas = ref([])
  const loading = ref(false)
  const showDetailsModal = ref(false)
  const selectedMatch = ref(null)

  const listaStatus = userMatchStatusEnum.lista.map(status => ({
    valor: status.valor,
    chave: status.chave,
    descricao: t(status.chave),
  }))

  const listaNiveis = NivelENUM.lista.map(nivel => ({
    valor: nivel.valor,
    chave: nivel.chave.toUpperCase(),
    descricao: t(nivel.chave),
  }))

  const filtros = ref({
    title: null,
    status: null,
    localName: null,
    city: null,
    zipCode: null,
    date: null,
    time: null,
    userValue: null,
    matchLevel: null,
  })

  function limparFiltros () {
    filtros.value = {
      title: null,
      status: null,
      localName: null,
      city: null,
      zipCode: null,
      date: null,
      time: null,
      userValue: null,
      matchLevel: null,
    }
  }

  async function buscarPartidas () {
    try {
      loading.value = true
      listaPartidas.value = await matchStore.searchMatches(filtros.value)
    } finally {
      loading.value = false
    }
  }

  function getStatusDescription (status) {
    const chave = userMatchStatusEnum.getChave(status)
    return chave ? t(chave) : status
  }

  function getStatusColor (status) {
    const item = userMatchStatusEnum.lista.find(item => item.valor === status)
    return item ? item.color : 'primary-color-100'
  }

  async function solicitarParticipacao (match) {
    await matchStore.requestToJoinMatch(match.id)
  }

  function abrirDetalhesPartida (match) {
    selectedMatch.value = match
    showDetailsModal.value = true
  }

</script>
