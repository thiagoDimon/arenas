<template>
  <v-container class="w-100 h-100 d-flex flex-row ga-2">
    <v-btn @click="changeLanguage('pt')">
      Botão PT
    </v-btn>
    <v-btn @click="changeLanguage('en')">
      Botão EN
    </v-btn>
    <v-btn @click="changeLanguage('es')">
      Botão ES
    </v-btn>
  </v-container>
</template>

<script setup>
  import { changeLanguage } from '@/util/functions'

</script>
