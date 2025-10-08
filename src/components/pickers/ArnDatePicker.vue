<template>
  <div>
    <v-text-field
      append-inner-icon="mdi-calendar-outline"
      color="primary-color-300"
      density="comfortable"
      hide-details
      :model-value="dataFormatada"
      readonly
      variant="outlined"
      @click="abrirPicker()"
      @click:append="abrirPicker()"
    />
    {{ modelValue }}
    <teleport to="body">
      <transition name="fade">
        <div
          v-if="selecionaData"
          class="picker-overlay"
          @click.self="fecharPicker()"
        >
          <v-date-picker
            bg-color="#f2f2f2"
            color="primary-color-300"
            elevation="10"
            hide-title
            :model-value="modelValue"
            show-adjacent-months
            @update:model-value="updateModelValue"
          />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
  import { format, parse } from 'date-fns'
  import { computed, ref } from 'vue'

  const props = defineProps({
    modelValue: {
      type: String,
      required: false,
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const selecionaData = ref(false)
  const data = ref(null)

  function abrirPicker () {
    selecionaData.value = true
  }

  function fecharPicker () {
    selecionaData.value = false
  }

  function updateModelValue (value) {
    data.value = value
    emit('update:modelValue', dataFormatada.value)
    fecharPicker()
  }

  const dataFormatada = computed(() => {
    if (!data.value) return ''
    return format(new Date(data.value), 'dd/MM/yyyy')
  })

  watch(() => props.modelValue, newValue => {
    console.log(newValue)
    data.value = parse(newValue, 'dd/MM/yyyy', new Date())
  })

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

:deep(.v-date-picker-header) {
  display: none;
}

:deep(.v-picker-title) {
  font-size: 18px;
  letter-spacing: 1.3px;
  font-weight: 500;
  text-transform: lowercase;
}

:deep(.v-date-picker__title)::first-letter {
  text-transform: uppercase !important;
}

:deep(.v-date-picker-month__day) {
  button {
    font-weight: 400;
  }
}

:deep(.v-date-picker-month__weekday) {
  color: #1B5E20;
  font-weight: 500;
}

:deep(.v-date-picker-controls > .v-btn > .v-btn__content) {
  display: inline-block;
}

:deep(.v-date-picker-controls > .v-btn > .v-btn__content)::first-letter {
  text-transform: uppercase !important;
}

:deep(.v-date-picker-months__content > .v-btn > .v-btn__content) {
  display: inline-block;
}

:deep(.v-date-picker-months__content > .v-btn > .v-btn__content)::first-letter {
  text-transform: uppercase !important;
}

:deep(.v-date-picker-years__content > .v-btn > .v-btn__content) {
  font-weight: 400;
}

:deep(.v-picker.v-sheet) {
  border-radius: 8px;
}
</style>
