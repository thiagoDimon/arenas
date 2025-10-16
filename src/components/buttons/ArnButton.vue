<template>
  <button :class="classe" :disabled="desabilitado" :style="estilos" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup>
  import { computed } from 'vue'
  import { useDisplay } from 'vuetify'

  defineEmits(['click'])

  const { smAndDown } = useDisplay()

  const props = defineProps({
    bgColor: {
      type: String,
      default: '#1b5e20',
    },
    size: {
      type: String,
      default: 'md',
    },
    flat: {
      type: Boolean,
      default: false,
    },
    radius: {
      type: String,
      default: '8px',
    },
    textColor: {
      type: String,
      default: '#ffffff',
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    borderColor: {
      type: String,
      default: '#d9d9d9',
    },
    desabilitado: {
      type: Boolean,
      default: false,
    },
  })

  const classe = ref(smAndDown ? 'md' : props.size)

  const estilos = computed(() => {
    const styles = {}
    if (!props.flat) {
      styles.boxShadow = '0px 2px 4px rgba(0,0,0,0.14), 0px 4px 5px rgba(0,0,0,0.12), 0px 1px 10px rgba(0,0,0,0.2)'
    }
    if (!props.outlined) {
      styles.backgroundColor = props.bgColor
    }
    if (props.outlined) {
      styles.border = '2px solid'
      styles.borderColor = props.borderColor
      styles.backgroundColor = 'transparent'
    }
    styles.borderRadius = props.radius
    styles.color = props.textColor
    return styles
  })
</script>

<style scoped>
button {
  transition: all 0.25s ease;
  font-weight: 500;
}

button:hover {
  filter: brightness(1.1);
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
  box-shadow: none;
}

.xs {
  font-size: 10px;
  height: 20px;
  padding-left: 8px;
  padding-right: 8px;
  letter-spacing: 0.8px;
}

.sm {
  font-size: 12px;
  height: 28px;
  padding-left: 12px;
  padding-right: 12px;
  letter-spacing: 1px;
}

.md {
  font-size: 14px;
  height: 36px;
  padding-left: 16px;
  padding-right: 16px;
  letter-spacing: 1.25px;
}

.lg {
  font-size: 16px;
  height: 44px;
  padding-left: 20px;
  padding-right: 20px;
  letter-spacing: 1.4px;
}

.xl {
  font-size: 18px;
  height: 52px;
  padding-left: 24px;
  padding-right: 24px;
  letter-spacing: 1.6px;
}
</style>
