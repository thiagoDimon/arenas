<template>
  <v-overlay :model-value="loading">
    <div class="loader">
      <v-progress-circular color="primary" indeterminate :size="50" />
      <div class="arena-titulo-3 mt-4" style="color: #000000;">
        {{ $t('carregando') }}
      </div>
    </div>
  </v-overlay>
</template>

<script setup>

  defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
  })

</script>

<style lang="scss" scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
</style>
