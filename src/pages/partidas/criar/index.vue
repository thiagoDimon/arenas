<template>
  <div class="proximas-partidas">
    <div class="cards">
      <arn-card>
        <template #header>
          <v-row class="pa-4">
            <v-col class="align-justify-center" cols="1" sm="1">
              <arn-icon color="#5f5f5f" icon="jogadores" />
            </v-col>
            <v-col class="arena-titulo-4" cols="1" sm="6">
              <div class="d-flex flex-column">
                <span>{{ $t("criarPartidas.informacoesBasicas.titulo") }}</span>
                <span class="arena-texto-2" style="color: #5f5f5f">{{ $t("criarPartidas.informacoesBasicas.detalhes") }}</span>
              </div>
            </v-col>
          </v-row>
        </template>
        <template #content>
          <v-row >
            <v-col>
              <span>{{ $t("criarPartidas.informacoesBasicas.tituloPartida") }}</span>
              <v-text-field
                v-model="formulario.tituloPartida"
                class="mb-4"
                color="primary-color-300"
                hide-details
                :placeholder= "$t('criarPartidas.informacoesBasicas.partidaExemplo')"
                variant="outlined"
              />
            </v-col>
            <v-col>
              <span>{{ $t("criarPartidas.informacoesBasicas.tituloNumeroJogadores") }}</span>
              <v-text-field
                v-model="formulario.maximoJogadores"
                class="mb-4"
                color="primary-color-300"
                hide-details
                :placeholder="0"
                variant="outlined"
                type="number"
              />
            </v-col>
          </v-row>
          <span>{{ $t("criarPartidas.informacoesBasicas.tituloDescricao") }}</span>
          <v-textarea
            v-model="formulario.partidaDescricao"
            class="mb-4"
            color="primary-color-300"
            hide-details
            :placeholder="$t('criarPartidas.informacoesBasicas.descricaoExemplo')"
            variant="outlined"
            rows="2"
          />
        </template>
      </arn-card>
    </div>
    <div class="cards">
      <arn-card>
        <template #header>
          <v-row class="pa-4">
            <v-col class="align-justify-center" cols="1" sm="1">
              <arn-icon color="#5f5f5f" icon="localizacao" />
            </v-col>
            <v-col class="arena-titulo-4" cols="1" sm="6">
              <div class="d-flex flex-column">
                <span>{{ $t("criarPartidas.local.titulo") }}</span>
                <span class="arena-texto-2" style="color: #5f5f5f">{{ $t("criarPartidas.local.detalhes") }}</span>
              </div>
            </v-col>
          </v-row>
        </template>
        <template #content>
          <v-row >
            <v-col>
              <span>{{ $t("criarPartidas.local.tituloNomelLocal") }}</span>
              <v-text-field
                v-model="formulario.nomeLocal"
                class="mb-4"
                color="primary-color-300"
                hide-details
                :placeholder= "$t('criarPartidas.local.nomeLocalExemplo')"
                variant="outlined"
              />
            </v-col>
            <v-col>
              <span>{{ $t("criarPartidas.local.tituloEndereco") }}</span>
              <v-text-field
                v-model="formulario.endereco"
                class="mb-4"
                color="primary-color-300"
                hide-details
                :placeholder= "$t('criarPartidas.local.enderecoExemplo')"
                variant="outlined"
              />
            </v-col>
          </v-row>
          <span>{{ $t("criarPartidas.local.tituloPontoRefencia") }}</span>
          <v-text-field
            v-model="formulario.pontoReferencia"
            class="mb-4"
            color="primary-color-300"
            hide-details
            :placeholder= "$t('criarPartidas.local.pontoRefenciaExemplo')"
            variant="outlined"
          />
        </template>
      </arn-card>
    </div>
    <div class="cards">
      <arn-card>
        <template #header>
          <v-row class="pa-4">
            <v-col class="align-justify-center" cols="1" sm="1">
              <arn-icon color="#5f5f5f" icon="calendario" />
            </v-col>
            <v-col class="arena-titulo-4" cols="1" sm="6">
              <div class="d-flex flex-column">
                <span>{{ $t("criarPartidas.data.titulo") }}</span>
                <span class="arena-texto-2" style="color: #5f5f5f">{{ $t("criarPartidas.data.detalhes") }}</span>
              </div>
            </v-col>
          </v-row>
        </template>
        <template #content>
          <v-row >
            <v-col>
              <span>{{ $t("criarPartidas.data.tituloData") }}</span>
              <v-text-field
                v-model="formulario.data"
                class="mb-4"
                color="primary-color-300"
                hide-details
                :placeholder= "$t('criarPartidas.local.nomeLocalExemplo')"
                variant="outlined"
                type="date"
              />
            </v-col>
            <v-col>
              <span>{{ $t("criarPartidas.data.tituloHorario") }}</span>
              <v-text-field
                v-model="formulario.horario"
                class="mb-4"
                color="primary-color-300"
                hide-details
                :placeholder= "$t('criarPartidas.local.enderecoExemplo')"
                variant="outlined"
                type="time"
              />
            </v-col>
          </v-row>
        </template>
      </arn-card>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useDisplay } from 'vuetify'
  const { smAndUp } = useDisplay()

  const formulario = ref({
    tituloPartida: '',
    maximoJogadores: '',
    partidaDescricao: '',
    nomeLocal: '',
    endereco: '',
    pontoReferencia: '',
    partidaRecorrente: false,
    data: '',
    horario: '',
    partidaPrivada: false,
    valorPorPessoa: '',
    nivel: ''
  })

</script>

<style>
.proximas-partidas {
  background-color: #ffffff;
  min-height: 100vh;
  padding: 24px;
}

.cards {
  padding-bottom: 20px
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
