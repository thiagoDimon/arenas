<template>
  <v-app>
    <template v-if="!logado || route.name === 'Login' || route.name === 'Redirect'">
      <router-view />
    </template>
    <template v-else>
      <LayoutSidebar>
        <router-view />
      </LayoutSidebar>
    </template>
  </v-app>
</template>

<script setup>
  import LayoutSidebar from '@/layouts/index.vue'
  import { useAuthStore } from '@/stores/auth'

  const route = useRoute()
  const authStore = useAuthStore()
  const logado = computed(() => authStore.logado)
</script>

<style>
body {
  font-family: 'Roboto', Arial, sans-serif;
  background-color: #ffffff;
  margin: 0;
}

* {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}

*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

*::-webkit-scrollbar-track {
  background: #f1f1f1;
}

*::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
  transition: background 0.2s ease;
}

*::-webkit-scrollbar-thumb:hover {
  background: #555;
}

#app {
  height: 100%;
  width: 100%;
}

.arena-titulo-1 {
  font-size: 48px;
  font-weight: bold;
  color: #0A0A0A;
}

.arena-titulo-2 {
  font-size: 36px;
  font-weight: bold;
  color: #0A0A0A;
}

.arena-titulo-3 {
  font-size: 24px;
  font-weight: bold;
  color: #0A0A0A;
}

.arena-titulo-4 {
  font-size: 20px;
  font-weight: normal;
  color: #0A0A0A;
}

.arena-texto-1 {
  font-size: 18px;
  color: #0A0A0A;
}

.arena-texto-2 {
  font-size: 16px;
  color: #0A0A0A;
}

.arena-texto-3 {
  font-size: 14px;
  color: #0A0A0A;
}

.align-justify-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
