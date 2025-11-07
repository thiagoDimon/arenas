<template>
  <div class="pa-6" style="min-height: 100vh;">
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
              v-model="filtros.titulo"
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
              v-model="filtros.nomeLocal"
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
              v-model="filtros.cidade"
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
              v-model="filtros.cep"
              color="primary-color-300"
              density="comfortable"
              hide-details
              :mask="$t('mascaraCep')"
              :placeholder="$t('cep')"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <arn-date-picker :model-value="filtros.data" :placeholder="$t('data')" @update:model-value="filtros.data = $event" />
          </v-col>
          <v-col cols="12" sm="6">
            <arn-time-picker :model-value="filtros.horario" :placeholder="$t('horario')" @update:model-value="filtros.horario = $event" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-mask-input
              v-model="filtros.valorPessoa"
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
              v-model="filtros.nivel"
              bg-color="white"
              clearable
              color="primary-color-300"
              density="comfortable"
              hide-details
              item-title="descricao"
              item-value="chave"
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
    <div v-if="listaPartidas.length > 0">
      Partidas aqui
    </div>
    <div v-else class="text-center pa-8">
      <v-icon color="grey" size="64">mdi-soccer-field</v-icon>
      <h3 class="mt-4">{{ $t('todasPartidas') }}</h3>
      <p class="text-grey">{{ $t('exploreTodasPartidas') }}</p>
    </div>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import { useDisplay } from 'vuetify'
  import NivelENUM from '@/util/enums/nivel.js'
  import StatusPartidaENUM from '@/util/enums/statusPartida.js'

  const { smAndDown } = useDisplay()
  const { t } = useI18n()

  const listaPartidas = ref([])

  const listaStatus = StatusPartidaENUM.lista.map(status => ({
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
    titulo: null,
    status: null,
    nomeLocal: null,
    cidade: null,
    cep: null,
    horario: null,
    data: null,
    valorPessoa: null,
    nivel: null,
  })

  function limparFiltros () {
    filtros.value = {
      titulo: null,
      status: null,
      nomeLocal: null,
      cidade: null,
      cep: null,
      horario: null,
      data: null,
      valorPessoa: null,
      nivel: null,
    }
  }

  function buscarPartidas () {
    console.log('filtros', filtros.value)
  }

</script>
