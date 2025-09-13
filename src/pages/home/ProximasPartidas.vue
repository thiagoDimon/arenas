<template>
  <div class="proximas-partidas">
    <v-card
      border="sm"
      color="#ffffff"
      elevation="2"
      rounded="lg"
      variant="elevated"
    >
      <v-card-item>
        <v-card-title>Joguinho na quinta</v-card-title>
        <v-card-subtitle>Criado por João Silva</v-card-subtitle>
        <v-card-text>
          <div class="d-flex flex-row pa-1 align-center">
            <arn-icon color="#5f5f5f" icon="jogadores" />
            <span class="ml-2">6/14 jogadores</span>
          </div>
          <v-progress-linear color="#32ae3b" height="4px" model-value="40" />
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between w-100">
          <arn-button bg-color="#E53935" class="w-33 text-uppercase" :flat="true">
            <span>Remover Participação</span>
          </arn-button>
          <arn-button class="w-33 text-uppercase" :flat="true" :outlined="true" text-color="#051005">
            <span>Detalhes</span>
          </arn-button>
          <arn-button class="w-33 text-uppercase" :flat="true">
            <span>Participar</span>
          </arn-button>
        </v-card-actions>
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup>
</script>

<style>
.proximas-partidas {
  background-color: #ffffff;
  height: 100vh;
  padding: 24px;
}
</style>
