<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
//
</script>

<style>
body {
  font-family: 'Roboto', Arial, sans-serif;
  background-color: #ffffff;
  margin: 0;
}

#app {
  height: 100%;
  width: 100%;
}

.arena-titulo-1 {
  font-size: 48px;
  font-weight: bold;
}

.arena-titulo-2 {
  font-size: 36px;
  font-weight: bold;
}

.arena-titulo-3 {
  font-size: 24px;
  font-weight: bold;
}

.align-justify-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
