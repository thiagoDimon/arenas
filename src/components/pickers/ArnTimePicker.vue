<template>
  <v-text-field
    append-inner-icon="mdi-clock-outline"
    color="primary-color-300"
    density="comfortable"
    hide-details
    :model-value="modelValue"
    placeholder="hh:mm"
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
        <v-time-picker
          bg-color="#f2f2f2"
          color="primary-color-300"
          elevation="10"
          format="24hr"
          :model-value="horarioPicker"
          rounded="lg"
          @update:model-value="updateModelValue"
        >
          <template #actions>
            <div class="d-flex justify-end ga-4 w-100">
              <arn-button bg-color="#B00020" :flat="true" @click="cancelar()">
                <span>{{ $t('cancelar') }}</span>
              </arn-button>
              <arn-button bg-color="#32AE3B" :flat="true" @click="fecharPicker()">
                <span>{{ $t('salvar') }}</span>
              </arn-button>
            </div>
          </template>
        </v-time-picker>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
  import { ref } from 'vue'

  defineProps({
    modelValue: {
      type: String,
      required: false,
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const selecionaHorario = ref(false)
  const horarioPicker = ref(null)

  function abrirPicker () {
    selecionaHorario.value = true
  }

  function fecharPicker () {
    selecionaHorario.value = false
  }

  function updateModelValue (value) {
    horarioPicker.value = value
    emit('update:modelValue', value)
  }

  function cancelar () {
    horarioPicker.value = ''
    emit('update:modelValue', '')
    fecharPicker()
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

:deep(.v-picker-title) {
  background-color: #1B5E20 !important;
  color: #fff !important;
}

:deep(.v-time-picker__title) {
  font-size: 18px;
  letter-spacing: 1.3px;
  font-weight: 500;
  text-transform: lowercase;
}

:deep(.v-time-picker__title)::first-letter {
  text-transform: uppercase !important;
}

:deep(.v-picker__header) {
  margin-top: 12px !important;
}

:deep(.v-time-picker-clock) {
  background-color: #CDCDCD !important;
  color: #000000 !important;
}

:deep(.v-time-picker-clock__item--active) {
  background-color: #1B5E20 !important;
}

:deep(.v-time-picker-clock__hand ) {
  background-color: #1B5E20 !important;
}

:deep(.v-time-picker-clock__hand )::after {
  background-color: #1B5E20 !important;
}

:deep(.v-time-picker-clock__hand )::before {
  background-color: #1B5E20 !important;
  border-color: #1B5E20 !important;
}

</style>
