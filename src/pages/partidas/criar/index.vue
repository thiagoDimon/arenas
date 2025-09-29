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
                <span>{{ $t("informacoesBasicas") }}</span>
                <span class="arena-texto-2" style="color: #5f5f5f">{{ $t("definaOsDetalhesPrincipaisDaSuaPartida") }}</span>
              </div>
            </v-col>
          </v-row>
        </template>
        <template #content>
          <v-row >
            <v-col>
              <span>{{ $t("tituloDaPartida") }}</span>
              <v-text-field
                v-model="tituloDaPartida"
                class="mb-4"
                color="primary-color-300"
                hide-details
                :placeholder= "$t('exPeladaQuinta')"
                variant="outlined"
              />
            </v-col>
            <v-col>
              <span>{{ $t("maximoDeJogadores") }}</span>
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
          <span>{{ $t("descricaoOpcional") }}</span>
          <v-textarea
            v-model="formulario.partidaDescricao"
            class="mb-4"
            color="primary-color-300"
            hide-details
            :placeholder="$t('adicioneDetalhesSobreAPartida')"
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
                <span>{{ $t("local") }}</span>
                <span class="arena-texto-2" style="color: #5f5f5f">{{ $t("ondeSeraRealizadaAPartida") }}</span>
              </div>
            </v-col>
          </v-row>
        </template>
        <template #content>
          <v-row >
            <v-col>
              <span>{{ $t("nomeDoLocal") }}</span>
              <v-text-field
                v-model="nomeDoLocal"
                class="mb-4"
                color="primary-color-300"
                hide-details
                :placeholder= "$t('exArenaCentral')"
                variant="outlined"
              />
            </v-col>
            <v-col>
              <span>{{ $t("local") }}</span>
              <v-text-field
                v-model="formulario.endereco"
                class="mb-4"
                color="primary-color-300"
                hide-details
                :placeholder= "$t('ruaNumeroBairro')"
                variant="outlined"
              />
            </v-col>
          </v-row>
          <span>{{ $t("criarPartidas.local.tituloPontoRefencia") }}</span>
          <v-text-field
            v-model="pontoReferenciaOpicional"
            class="mb-4"
            color="primary-color-300"
            hide-details
            :placeholder= "$t('exProximoAoShopping')"
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
                <span>{{ $t("dataEHorario") }}</span>
                <span class="arena-texto-2" style="color: #5f5f5f">{{ $t("quandoSeraAPartida") }}</span>
              </div>
            </v-col>
            <v-col>
              <div class="d-flex align-justify-start">
                <v-checkbox
                  v-model="formulario.partidaRecorrente"
                  class="d-flex justify-end"
                  color="primary-color-300"
                  hide-details
                  :label="$t('partidaRecorrente')"
                />
              </div>
            </v-col>
          </v-row>
        </template>
        <template #content>
          <v-row >
            <v-col>
              <span>{{ $t("data") }}</span>
              <v-text-field
                v-model="formulario.data"
                class="mb-4"
                color="primary-color-300"
                hide-details
                variant="outlined"
                type="date"
              />
            </v-col>
            <v-col>
              <span>{{ $t("horario") }}</span>
              <v-text-field
                v-model="formulario.horario"
                class="mb-4"
                color="primary-color-300"
                hide-details
                variant="outlined"
                type="time"
              />
            </v-col>
          </v-row>
        </template>
      </arn-card>
    </div>
    <div class="cards">
      <arn-card>
        <template #header>
          <v-row class="pa-4">
            <v-col class="align-justify-center" cols="1" sm="1">
              <arn-icon color="#5f5f5f" icon="engrenagem" />
            </v-col>
            <v-col class="arena-titulo-4" cols="1" sm="6">
              <div class="d-flex flex-column">
                <span>{{ $t("configuracoesAdicionais") }}</span>
                <span class="arena-texto-2" style="color: #5f5f5f">{{ $t("personalizeSuaPartida") }}</span>
              </div>
            </v-col>
            <v-col>
              <div class="d-flex align-justify-start">
                <v-checkbox
                  v-model="formulario.partidaPrivada"
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
          <v-row >
            <v-col>
              <span>{{ $t("valorPorPessoa") }}</span>
              <v-text-field
                v-model="formulario.valorPorPessoa"
                class="mb-4"
                color="primary-color-300"
                hide-details
                variant="outlined"
                type="number"
              />
            </v-col>
            <v-col>
              <span>{{ $t("nivel") }}</span>
              <v-text-field
                v-model="formulario.nivel"
                class="mb-4"
                color="primary-color-300"
                hide-details
                :placeholder= "$t('selecioneONivel')"
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
