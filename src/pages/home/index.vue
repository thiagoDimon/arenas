<template>
  <div class="home-page">
    <v-tabs v-model="tabActive" bg-color="white" dark grow>
      <v-tab value="1">Tab 1</v-tab>
      <v-tab value="2">Tab 2</v-tab>
      <v-tab value="3">Tab 3</v-tab>
    </v-tabs>
    <v-tabs-window v-model="tabActive">
      <v-tabs-window-item value="1">
        <ProximasPartidas />
      </v-tabs-window-item>
      <v-tabs-window-item value="2">
        <div style="background-color: blue;">Content for Tab 2</div>
      </v-tabs-window-item>
      <v-tabs-window-item value="3">
        <div style="background-color: yellow;">Content for Tab 3</div>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script setup>
  import ProximasPartidas from './ProximasPartidas.vue'
  const tabActive = ref(0)
</script>

<style lang="scss" scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
}

</style>
