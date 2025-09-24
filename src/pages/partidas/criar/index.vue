<template>
  <div class="proximas-partidas">
    <arn-card>
      <template #header>
        <v-row class="pa-4" no-gutters>
          <v-col class="align-start" cols="1" sm="3">
            <arn-icon color="#5f5f5f" icon="jogadores" />
          </v-col>
          <v-col class="arena-titulo-4" cols="11" sm="6">
            <div class="d-flex flex-column">
              <span>{{ $t("criarPartidas.informacoesBasicas.titulo") }}</span>
              <span class="arena-texto-2" style="color: #5f5f5f">{{ $t("criarPartidas.informacoesBasicas.detalhes") }}</span>
            </div>
          </v-col>
        </v-row>
      </template>
      <template #content>
        <span>{{ $t("criarPartidas.informacoesBasicas.tituloPartida") }}</span>
        <v-text-field
          v-model="tituloPartida"
          class="mb-4"
          color="primary-color-300"
          hide-details
          :placeholder= "$t('criarPartidas.informacoesBasicas.partidaExemplo')"
          variant="outlined"
        />
        <span>{{ $t("criarPartidas.informacoesBasicas.tituloNumeroJogadores") }}</span>
        <v-text-field
          v-model="maximoJogadores"
          class="mb-4"
          color="primary-color-300"
          hide-details
          :placeholder="0"
          variant="outlined"
        />
        <span>{{ $t("criarPartidas.informacoesBasicas.tituloDescricao") }}</span>
        <v-text-field
          v-model="partidaDescricao"
          class="mb-4"
          color="primary-color-300"
          hide-details
          :placeholder="$t('criarPartidas.informacoesBasicas.descricaoExemplo')"
          variant="outlined"
        />
      </template>
      <template #actions>
      </template>
    </arn-card>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useDisplay } from 'vuetify'
  const { smAndUp } = useDisplay()

  const tituloPartida = ref('')
  const maximoJogadores = ref('')
  const partidaDescricao = ref('')

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
