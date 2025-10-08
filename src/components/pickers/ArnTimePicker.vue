<template>
  <v-text-field
    append-inner-icon="mdi-clock-outline"
    color="primary-color-300"
    hide-details
    readonly
    variant="outlined"
    @click="abrirPicker()"
    @click:append="abrirPicker()"
  />
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="selecionaHorario"
        class="picker-overlay"
        @click.self="fecharPicker()"
      >
        <v-time-picker format="24hr" />
      </div>
    </transition>
  </teleport>
</template>

<script setup>
  import { ref } from 'vue'

  const selecionaHorario = ref(false)
  const horario = ref(null)

  function abrirPicker () {
    selecionaHorario.value = true
  }

  function fecharPicker () {
    selecionaHorario.value = false
  }
</script>

<style scoped lang="scss">
.picker-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

:deep(.v-field__input) {
  cursor: pointer;
}
</style>
