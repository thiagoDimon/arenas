<template>
  <div class="pa-6" style="min-height: 100vh;">
    <div class="mb-6">
      <arn-card>
        <template #header>
          <v-row class="pa-4">
            <v-col cols="12">
              <div class="d-flex flex-row ga-2 align-center">
                <arn-icon color="#5f5f5f" icon="jogadores" size="28" />
                <span>{{ $t("informacoesBasicas") }}</span>
              </div>
              <div class="arena-texto-3" style="color: #5f5f5f">{{ $t("definaDetalhesPartida") }}</div>
            </v-col>
          </v-row>
        </template>
        <template #content>
          <v-row>
            <v-col cols="12" sm="6">
              <div>
                <span>{{ $t("tituloPartida") }}</span>
                <span style="color: #B00020"> *</span>
              </div>
              <v-text-field
                v-model="partida.titulo"
                clearable
                color="primary-color-300"
                density="comfortable"
                hide-details
                :placeholder="$t('exemploPeladaQuinta')"
                required
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <div>
                <span>{{ $t("maximoJogadores") }}</span>
                <span style="color: #B00020"> *</span>
              </div>
              <v-text-field
                v-model="partida.maximoJogadores"
                clearable
                color="primary-color-300"
                density="comfortable"
                hide-details
                :hide-spin-buttons="true"
                placeholder="0"
                type="number"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <span>{{ $t("descricao") }}</span>
              <v-textarea
                v-model="partida.descricao"
                class="mb-4"
                color="primary-color-300"
                density="comfortable"
                hide-details
                :placeholder="$t('adicioneDetalhesPartida')"
                rows="2"
                variant="outlined"
              />
            </v-col>
          </v-row>
        </template>
      </arn-card>
    </div>
    <div class="mb-6">
      <arn-card>
        <template #header>
          <v-row class="pa-4">
            <v-col cols="12">
              <div class="d-flex flex-row ga-2 align-center">
                <arn-icon color="#5f5f5f" icon="localizacao" size="28" />
                <span>{{ $t("local") }}</span>
              </div>
              <div class="arena-texto-3" style="color: #5f5f5f">{{ $t("ondeSeraRealizadaPartida") }}</div>
            </v-col>
          </v-row>
        </template>
        <template #content>
          <v-row>
            <v-col cols="12" sm="6">
              <div>
                <span>{{ $t("nomeLocal") }}</span>
                <span style="color: #B00020"> *</span>
              </div>
              <v-text-field
                v-model="partida.nomeLocal"
                clearable
                color="primary-color-300"
                density="comfortable"
                hide-details
                :placeholder="$t('exemploArenaCentral')"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <div>
                <span>{{ $t("endereco") }}</span>
                <span style="color: #B00020"> *</span>
              </div>
              <v-text-field
                v-model="partida.endereco"
                clearable
                color="primary-color-300"
                density="comfortable"
                hide-details
                :placeholder="$t('exemploEndereco')"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <span>{{ $t("pontoReferencia") }}</span>
              <v-text-field
                v-model="partida.pontoReferencia"
                clearable
                color="primary-color-300"
                density="comfortable"
                hide-details
                :placeholder="$t('exProximoAoShopping')"
                variant="outlined"
              />
            </v-col>
          </v-row>
        </template>
      </arn-card>
    </div>
    <div class="mb-6">
      <arn-card>
        <template #header>
          <v-row class="pa-4">
            <v-col cols="12" sm="6">
              <div class="d-flex flex-row ga-2 align-center">
                <v-icon color="#5f5f5f" icon="mdi-calendar" size="28" />
                <span>{{ $t("dataHorario") }}</span>
              </div>
              <div class="arena-texto-3" style="color: #5f5f5f">{{ $t("quandoOcorrePartida") }}</div>
            </v-col>
            <v-col v-if="smAndUp" cols="6">
              <div class="d-flex align-justify-start">
                <v-checkbox
                  v-model="partida.recorrente"
                  class="text-capitalize"
                  color="primary-color-300"
                  hide-details
                  :label="$t('partidaRecorrente')"
                />
              </div>
            </v-col>
          </v-row>
        </template>
        <template #content>
          <v-row>
            <v-col cols="12" sm="6">
              <div>
                <span>{{ $t("data") }}</span>
                <span style="color: #B00020"> *</span>
              </div>
              <arn-date-picker :model-value="partida.data" @update:model-value="partida.data = $event" />
            </v-col>
            <v-col cols="12" sm="6">
              <div>
                <span>{{ $t("horario") }}</span>
                <span style="color: #B00020"> *</span>
              </div>
              <arn-time-picker :model-value="partida.horario" @update:model-value="partida.horario = $event" />
            </v-col>
            <v-col v-if="!smAndUp" class="pa-0" cols="12">
              <div class="d-flex align-justify-start">
                <v-checkbox
                  v-model="partida.recorrente"
                  class="text-capitalize"
                  color="primary-color-300"
                  hide-details
                  :label="$t('partidaRecorrente')"
                />
              </div>
            </v-col>
          </v-row>
        </template>
      </arn-card>
    </div>
    <div class="mb-6">
      <arn-card>
        <template #header>
          <v-row class="pa-4">
            <v-col cols="12" sm="6">
              <div class="d-flex flex-row ga-2 align-center">
                <arn-icon color="#5f5f5f" icon="engrenagem" size="28" />
                <span>{{ $t("configuracoesAdicionais") }}</span>
              </div>
              <div class="arena-texto-3" style="color: #5f5f5f">{{ $t("personalizeSuaPartida") }}</div>
            </v-col>
            <v-col v-if="smAndUp" cols="6">
              <div class="d-flex align-justify-start">
                <v-checkbox
                  v-model="partida.privada"
                  class="text-capitalize"
                  color="primary-color-300"
                  hide-details
                  :label="$t('somenteConvidados')"
                />
              </div>
            </v-col>
          </v-row>
        </template>
        <template #content>
          <v-row>
            <v-col cols="12" sm="6">
              <div>
                <span>{{ $t("valorPessoa") }}</span>
                <span style="color: #B00020"> *</span>
              </div>
              <v-mask-input
                v-model="partida.valorPessoa"
                color="primary-color-300"
                density="comfortable"
                hide-details
                :mask="$t('mascaraDinheiro')"
                :placeholder="$t('mascaraDinheiroPlaceholder')"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <div>
                <span>{{ $t("nivel") }}</span>
                <span style="color: #B00020"> *</span>
              </div>
              <v-select
                v-model="partida.nivel"
                bg-color="white"
                clearable
                color="primary-color-300"
                density="comfortable"
                hide-details
                item-title="descricao"
                :items="listaNiveis"
                :menu-props="{ contentClass: '' }"
                :placeholder="$t('selecioneNivel')"
                variant="outlined"
              />
            </v-col>
            <v-col v-if="!smAndUp" class="pa-0" cols="12">
              <div class="d-flex align-justify-start">
                <v-checkbox
                  v-model="partida.privada"
                  class="text-capitalize"
                  color="primary-color-300"
                  hide-details
                  :label="$t('somenteConvidados')"
                />
              </div>
            </v-col>
          </v-row>
        </template>
      </arn-card>
    </div>
    <div class="d-flex justify-end ga-4">
      <arn-button
        bg-color="#E53935"
        :flat="true"
        radius="12px"
        size="lg"
        @click="cancelar()"
      >
        <span>{{ $t('cancelar') }}</span>
      </arn-button>
      <arn-button
        bg-color="#32AE3B"
        :flat="true"
        radius="12px"
        size="lg"
        @click="criarPartida()"
      >
        <span>{{ $t('criarPartida') }}</span>
      </arn-button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useDisplay } from 'vuetify'
  import NivelENUM from '@/utils/enums/nivel.js'

  const { smAndUp } = useDisplay()
  const { t } = useI18n()

  const listaNiveis = NivelENUM.lista.map(nivel => ({
    valor: nivel.valor,
    chave: nivel.chave,
    descricao: t(nivel.chave),
  }))

  const partida = ref({
    titulo: '',
    maximoJogadores: '',
    descricao: '',
    nomeLocal: '',
    endereco: '',
    pontoReferencia: '',
    recorrente: false,
    data: '',
    horario: '',
    privada: false,
    valorPessoa: '',
    nivel: null,
  })

  function criarPartida () {
    console.log('Criar partida', partida.value)
  }

  function cancelar () {
    partida.value = {
      titulo: '',
      maximoJogadores: '',
      descricao: '',
      nomeLocal: '',
      endereco: '',
      pontoReferencia: '',
      recorrente: false,
      data: '',
      horario: '',
      privada: false,
      valorPessoa: '',
      nivel: null,
    }
  }

</script>
