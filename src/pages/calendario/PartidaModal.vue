<template>
  <v-dialog
    v-model="showDialog"
    max-width="400"
    persistent
  >
    <v-card v-if="partida">
      <v-card-title class="d-flex align-center pa-4">
        <span class="text-h6">{{ $t('detalhesPartida') }}</span>
        <v-spacer />
        <v-btn
          icon
          size="small"
          variant="text"
          @click="fechar"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-card-text class="pa-4">
        <div class="mb-3">
          <div class="text-subtitle-2 text-medium-emphasis mb-1">
            {{ $t('status') }}
          </div>
          <v-chip
            :color="getStatusColor(partida.status)"
            label
            size="small"
          >
            {{ getStatusLabel(partida.status) }}
          </v-chip>
        </div>

        <div class="mb-3">
          <div class="text-subtitle-2 text-medium-emphasis mb-1">
            {{ $t('data') }}
          </div>
          <div class="text-body-1">
            {{ formatarData(partida.dataHora) }}
          </div>
        </div>

        <div class="mb-3">
          <div class="text-subtitle-2 text-medium-emphasis mb-1">
            {{ $t('horario') }}
          </div>
          <div class="text-body-1">
            {{ formatarHorario(partida.dataHora) }}
          </div>
        </div>

        <div v-if="partida.local" class="mb-3">
          <div class="text-subtitle-2 text-medium-emphasis mb-1">
            {{ $t('local') }}
          </div>
          <div class="text-body-1">
            {{ partida.local }}
          </div>
        </div>

        <div v-if="partida.participantes" class="mb-3">
          <div class="text-subtitle-2 text-medium-emphasis mb-1">
            {{ $t('participantes') }}
          </div>
          <div class="text-body-1">
            {{ partida.participantes }}
          </div>
        </div>
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn
          color="primary"
          variant="flat"
          @click="fechar"
        >
          {{ $t('fechar') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t: $t } = useI18n()

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
    partida: {
      type: Object,
      default: null,
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const showDialog = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
  })

  function getStatusColor (status) {
    const colors = {
      AGENDADA: 'blue',
      FINALIZADA: 'green',
      CANCELADA: 'red',
    }
    return colors[status] || 'grey'
  }

  function getStatusLabel (status) {
    const labels = {
      AGENDADA: 'statusAgendada',
      FINALIZADA: 'statusFinalizada',
      CANCELADA: 'statusCancelada',
    }
    return labels[status] ? $t(labels[status]) : status
  }

  function formatarData (dataHora) {
    if (!dataHora) return ''
    const data = new Date(dataHora)
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  function formatarHorario (dataHora) {
    if (!dataHora) return ''
    const data = new Date(dataHora)
    return data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  function fechar () {
    showDialog.value = false
  }
</script>

<style scoped lang="scss">
.v-card-title {
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.v-card-text {
  background-color: #ffffff;

  .mb-3 {
    .text-subtitle-2 {
      color: #5f5f5f;
      font-weight: 500;
      margin-bottom: 4px;
    }

    .text-body-1 {
      color: #051005;
      font-weight: 400;
    }
  }
}

.v-card-actions {
  background-color: #f5f5f5;
  border-top: 1px solid #e0e0e0;
}

:deep(.v-chip) {
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

:deep(.v-dialog > .v-overlay__content > .v-card) {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
}
</style>
