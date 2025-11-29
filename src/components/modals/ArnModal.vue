<template>
  <v-dialog
    v-model="isOpen"
    :max-width="maxWidth"
    :persistent="persistent"
    scrollable
  >
    <v-card class="arn-modal">
      <v-card-title class="arn-modal__header">
        <div class="arn-modal__title">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <v-btn
          icon="mdi-close"
          size="small"
          variant="text"
          @click="handleCancel"
        />
      </v-card-title>
      <v-divider />
      <v-card-text class="arn-modal__body">
        <slot />
      </v-card-text>
      <v-card-actions class="arn-modal__actions">
        <v-spacer />
        <arn-button
          v-if="showCancel"
          :border-color="cancelBorderColor"
          class="arn-modal__action"
          :flat="true"
          :outlined="true"
          :text-color="cancelTextColor"
          @click="handleCancel"
        >
          <span>{{ $t(cancelLabel) }}</span>
        </arn-button>

        <arn-button
          :bg-color="confirmColor"
          class="arn-modal__action"
          :desabilitado="confirmDisabled"
          :flat="confirmFlat"
          :outlined="confirmOutlined"
          :text-color="confirmTextColor"
          @click="handleConfirm"
        >
          <span>{{ $t(confirmLabel) }}</span>
        </arn-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { computed } from 'vue'
  import ArnButton from '@/components/buttons/ArnButton.vue'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    maxWidth: {
      type: String,
      default: '520px',
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    confirmLabel: {
      type: String,
      default: 'confirmar',
    },
    cancelLabel: {
      type: String,
      default: 'cancelar',
    },
    confirmColor: {
      type: String,
      default: '#1B5E20',
    },
    confirmTextColor: {
      type: String,
      default: '#ffffff',
    },
    confirmFlat: {
      type: Boolean,
      default: false,
    },
    confirmOutlined: {
      type: Boolean,
      default: false,
    },
    cancelBorderColor: {
      type: String,
      default: '#d9d9d9',
    },
    cancelTextColor: {
      type: String,
      default: '#051005',
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    confirmDisabled: {
      type: Boolean,
      default: false,
    },
    closeOnConfirm: {
      type: Boolean,
      default: true,
    },
    closeOnCancel: {
      type: Boolean,
      default: true,
    },
  })

  const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

  const isOpen = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
  })

  function handleCancel () {
    emit('cancel')
    if (props.closeOnCancel) {
      isOpen.value = false
    }
  }

  function handleConfirm () {
    emit('confirm')
    if (props.closeOnConfirm) {
      isOpen.value = false
    }
  }
</script>

<style scoped>
.arn-modal__header {
  background-color: #1b5e20;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
}

.arn-modal__title {
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.3;
}

.arn-modal__body {
  padding: 24px;
}

.arn-modal__actions {
  padding: 16px 24px 24px;
  justify-content: flex-end;
  gap: 12px;
}

.arn-modal__action {
  min-width: 120px;
}
</style>
