<template>
  <div class="proximas-partidas">
    <arn-card>
      <template #header>
        <v-row class="pa-4" no-gutters>
          <v-col class="arena-titulo-4" cols="11" sm="6">
            <div class="d-flex flex-column">
              <span>Joguinho na quinta</span>
              <span class="arena-texto-2" style="color: #5f5f5f">Criado por João Silva</span>
            </div>
          </v-col>
          <v-col class="align-justify-center" cols="1" sm="3">
            <v-chip v-if="smAndUp" class="align-justify-center w-100 rounded-lg" color="primary-color-100" variant="flat">
              <span>Confirmada</span>
            </v-chip>
            <div v-else>
              <v-icon color="#32ae3b" size="small">mdi-circle</v-icon>
            </div>
          </v-col>
          <v-col class="horario-partida arena-texto-2" cols="12" sm="3" style="color: #5f5f5f">
            <v-icon size="large">mdi-calendar-outline</v-icon>
            <span>17/01/2025 às 19:00</span>
          </v-col>
        </v-row>
      </template>
      <template #content>
        <div class="d-flex flex-row pa-1 align-center">
          <arn-icon color="#5f5f5f" icon="jogadores" />
          <span class="ml-2">6/14 jogadores</span>
        </div>
        <v-progress-linear color="#32ae3b" height="4px" model-value="40" />
      </template>
      <template #actions>
        <v-row no-gutters>
          <v-col class="pa-2" cols="12" sm="4">
            <arn-button bg-color="#E53935" class="w-100 text-capitalize" :flat="true">
              <span>{{ $t('removerParticipacao') }}</span>
            </arn-button>
          </v-col>
          <v-col class="pa-2" cols="12" sm="4">
            <arn-button
              class="w-100"
              :flat="true"
              :outlined="true"
              text-color="#051005"
            >
              <span>{{ $t('detalhes') }}</span>
            </arn-button>
          </v-col>
          <v-col class="pa-2" cols="12" sm="4">
            <arn-button class="w-100" :flat="true">
              <span>{{ $t('participar') }}</span>
            </arn-button>
          </v-col>
        </v-row>
      </template>
    </arn-card>
  </div>
</template>

<script setup>
  import { useDisplay } from 'vuetify'
  const { smAndUp } = useDisplay()
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
