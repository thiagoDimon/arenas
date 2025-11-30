<template>
  <v-dialog v-model="isOpen" max-width="500px" persistent>
    <v-card>
      <v-card-title class="d-flex align-center pa-4" :style="`background-color: ${headerColor}; color: white;`">
        <v-icon class="mr-2" size="28">{{ icon }}</v-icon>
        <span class="text-h6">{{ title }}</span>
      </v-card-title>

      <v-card-text class="pa-6">
        <p class="text-body-1">{{ message }}</p>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-spacer />
        <arn-button
          :flat="true"
          :outlined="true"
          text-color="#051005"
          @click="cancel"
        >
          <span>{{ cancelText }}</span>
        </arn-button>
        <arn-button
          :bg-color="confirmColor"
          :flat="true"
          @click="confirm"
        >
          <span>{{ confirmText }}</span>
        </arn-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Confirmação',
    },
    message: {
      type: String,
      required: true,
    },
    confirmText: {
      type: String,
      default: 'Confirmar',
    },
    cancelText: {
      type: String,
      default: 'Cancelar',
    },
    confirmColor: {
      type: String,
      default: '#E53935',
    },
    headerColor: {
      type: String,
      default: '#1B5E20',
    },
    icon: {
      type: String,
      default: 'mdi-help-circle-outline',
    },
  })

  const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

  const isOpen = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
  })

  function confirm () {
    emit('confirm')
    isOpen.value = false
  }

  function cancel () {
    emit('cancel')
    isOpen.value = false
  }
</script>
