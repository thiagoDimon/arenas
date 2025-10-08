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
              <span>{{ $t("data") }}</span>
              <arn-date-picker :model-value="partida.data" @update:model-value="partida.data = $event" />
            </v-col>
            <v-col cols="12" sm="6">
              <span>{{ $t("horario") }}</span>
              <arn-time-picker />
            </v-col>
            <v-col v-if="!smAndUp" cols="12">
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
            <v-col class="align-justify-center" cols="1" sm="1">
              <arn-icon color="#5f5f5f" icon="engrenagem" />
            </v-col>
            <v-col class="arena-titulo-4" cols="1" sm="6">
              <div class="d-flex flex-column">
                <span>{{ $t("configuracoesAdicionais") }}</span>
                <span class="arena-texto-3" style="color: #5f5f5f">{{ $t("personalizeSuaPartida") }}</span>
              </div>
            </v-col>
            <v-col>
              <div class="d-flex align-justify-start">
                <v-checkbox
                  v-model="partida.privada"
                  class="d-flex justify-end"
                  color="primary-color-300"
                  hide-details
                  :label="$t('partidaPrivada')"
                />
              </div>
            </v-col>
          </v-row>
        </template>
        <template #content>
          <v-row>
            <v-col>
              <span>{{ $t("valorPorPessoa") }}</span>
              <v-text-field
                v-model="partida.valorPorPessoa"
                class="mb-4"
                color="primary-color-300"
                hide-details
                type="number"
                variant="outlined"
              />
            </v-col>
            <v-col>
              <span>{{ $t("nivel") }}</span>
              <v-text-field
                v-model="partida.nivel"
                class="mb-4"
                color="primary-color-300"
                hide-details
                :placeholder="$t('selecioneNivel')"
                variant="outlined"
              />
            </v-col>
          </v-row>
        </template>
      </arn-card>
    </div>
    <div>
      <v-row justify="end">
        <v-col class="align-justify-center" cols="1" sm="2">
          <v-btn color="tertiary" rounded="lg">{{ $t("cancelar") }}</v-btn>
        </v-col>
        <v-col class="align-justify-center" cols="1" sm="2">
          <v-btn color="primary-color-100" rounded="lg">{{ $t("criarPartida") }}</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useDisplay } from 'vuetify'

  const { smAndUp } = useDisplay()

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
    valorPorPessoa: '',
    nivel: '',
  })

</script>

<style>
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
