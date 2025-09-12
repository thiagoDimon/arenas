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
