<template>
  <transition name="slide-fade">
    <v-alert
      class="arena-alerta mt-4"
      :color="color"
      :density="density"
      :icon="icon"
      :location="location"
      :model-value="modelValue"
      :position="position"
      :text="text"
      :title="title"
      :type="type"
    />
  </transition>
</template>

<script setup name="arn-alerta">
  import { watch } from 'vue'

  const { duration, modelValue } = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
    color: {
      type: String,
      default: 'primary-color-300',
    },
    density: {
      type: String,
      default: 'comfortable',
    },
    icon: {
      type: String,
    },
    location: {
      type: String,
      default: 'top center',
    },
    position: {
      type: String,
      default: 'fixed',
    },
    text: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'warning',
    },
    duration: {
      type: Number,
      default: 5000,
    },
  })

  const emit = defineEmits(['update:modelValue'])

  watch(
    () => modelValue,
    novoValor => {
      if (novoValor) {
        setTimeout(() => {
          emit('update:modelValue', false)
        }, duration)
      }
    },
  )
</script>

<style scoped lang="scss">
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.35s ease, opacity 0.35s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.arena-alerta {
  position: fixed;
  top: 20px;
  left: 0;
  z-index: 9999;
  width: 400px;
  @media (max-width: 600px) {
    width: 90%;
  }
}

:deep(.v-alert__content),
:deep(.v-alert__title),
:deep(.v-alert__prepend) {
  color: white !important;
}
</style>
