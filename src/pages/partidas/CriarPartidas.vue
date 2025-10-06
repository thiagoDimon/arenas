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
                <span class="arena-texto-2" style="color: #5f5f5f">{{ $t("definaDetalhesPartida") }}</span>
              </div>
            </v-col>
          </v-row>
        </template>
        <template #content>
          <v-row>
            <v-col>
              <span>{{ $t("titulo") }}</span>
              <v-text-field
                v-model="tituloDaPartida"
                class="mb-4"
                color="primary-color-300"
                hide-details
                :placeholder="$t('exemploPeladaQuinta')"
                variant="outlined"
              />
            </v-col>
            <v-col>
              <span>{{ $t("maximoJogadores") }}</span>
              <v-text-field
                v-model="partida.maximoJogadores"
                class="mb-4"
                color="primary-color-300"
                hide-details
                :placeholder="0"
                type="number"
                variant="outlined"
              />
            </v-col>
          </v-row>
          <span>{{ $t("descricaoOpcional") }}</span>
          <v-textarea
            v-model="partida.descricao"
            class="mb-4"
            color="primary-color-300"
            hide-details
            :placeholder="$t('adicioneDetalhesPartida')"
            rows="2"
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
              <arn-icon color="#5f5f5f" icon="localizacao" />
            </v-col>
            <v-col class="arena-titulo-4" cols="1" sm="6">
              <div class="d-flex flex-column">
                <span>{{ $t("local") }}</span>
                <span class="arena-texto-2" style="color: #5f5f5f">{{ $t("ondeSeraRealizadaPartida") }}</span>
              </div>
            </v-col>
          </v-row>
        </template>
        <template #content>
          <v-row>
            <v-col>
              <span>{{ $t("nomeLocal") }}</span>
              <v-text-field
                v-model="nomeLocal"
                class="mb-4"
                color="primary-color-300"
                hide-details
                :placeholder="$t('exemploArenaCentral')"
                variant="outlined"
              />
            </v-col>
            <v-col>
              <span>{{ $t("local") }}</span>
              <v-text-field
                v-model="partida.endereco"
                class="mb-4"
                color="primary-color-300"
                hide-details
                :placeholder="$t('ruaNumeroBairro')"
                variant="outlined"
              />
            </v-col>
          </v-row>
          <span>{{ $t("localReferencia") }}</span>
          <v-text-field
            v-model="pontoReferenciaOpicional"
            class="mb-4"
            color="primary-color-300"
            hide-details
            :placeholder="$t('exProximoAoShopping')"
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
                <span>{{ $t("dataHorario") }}</span>
                <span class="arena-texto-2" style="color: #5f5f5f">{{ $t("quandoOcorrePartida") }}</span>
              </div>
            </v-col>
            <v-col>
              <div class="d-flex align-justify-start">
                <v-checkbox
                  v-model="partida.recorrente"
                  class="d-flex justify-end"
                  color="primary-color-300"
                  hide-details
                  :label="$t('recorrente')"
                />
              </div>
            </v-col>
          </v-row>
        </template>
        <template #content>
          <v-row>
            <v-col>
              <span>{{ $t("data") }}</span>
              <v-text-field
                v-model="partida.data"
                class="mb-4"
                color="primary-color-300"
                hide-details
                type="date"
                variant="outlined"
              />
            </v-col>
            <v-col>
              <span>{{ $t("horario") }}</span>
              <v-text-field
                v-model="partida.horario"
                class="mb-4"
                color="primary-color-300"
                hide-details
                type="time"
                variant="outlined"
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
                  v-model="partida.privada"
                  class="d-flex justify-end"
                  color="primary-color-300"
                  hide-details
                  :label="$t('privada')"
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
