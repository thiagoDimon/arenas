<template>
  <div class="calendario-page pa-3 mb-2" color="white">
    <arn-loader :loading="calendarStore.loading" />
    <v-sheet class="legenda-status d-flex flex-wrap align-center pa-3 mb-2" color="white">
      <span class="text-subtitle-2 mr-4" style="color: #1B5E20; font-weight: 600;">{{ $t('legenda') }}:</span>
      <v-chip
        class="ma-1"
        color="blue"
        label
        size="small"
      >
        {{ $t('statusAgendada') }}
      </v-chip>
      <v-chip
        class="ma-1"
        color="green"
        label
        size="small"
      >
        {{ $t('statusFinalizada') }}
      </v-chip>
      <v-chip
        class="ma-1"
        color="red"
        label
        size="small"
      >
        {{ $t('statusCancelada') }}
      </v-chip>
    </v-sheet>
    <v-sheet>
      <v-calendar
        color="#1B5E20"
        :event-color="getEventColor"
        :events="matches"
        locale="en-US"
        :show-week="false"
        type="month"
        :weekdays="[0, 1, 2, 3, 4, 5, 6]"
        @change="loadMatches"
        @click:event="abrirDetalhesPartida"
      />
    </v-sheet>
    <match-modal
      v-model="showModal"
      :partida="matchSelected"
    />
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useCalendarStore } from '@/stores'
  // import StatusColorENUM from '@/util/enums/statusColors.js'
  import MatchModal from './MatchModal.vue'

  const calendarStore = useCalendarStore()

  const showModal = ref(false)
  const matchSelected = ref(null)
  const matches = ref([])

  // const statusColors = StatusColorENUM.lista.map(status => ({
  //   [status.chave]: status.color,
  // }))

  onMounted(async () => {
    matches.value = await calendarStore.buscarPartidas(userStore.user.id)
  })

  // async function loadMatches () {
  //   try {
  //     const partidasRetorno = await calendarStore.buscarPartidas()
  //     matches.value = partidasRetorno.map(partida => ({
  //       ...partida,
  //       id: partida.id, // Não é necessário, já vai ter no destruct acima
  //       title: partida.titulo, // Não é necessário, já vai ter no destruct acima
  //       start: new Date(partida.dataHora), // TODO: avaliar se assim vai ser o formato correto de data
  //       end: new Date(new Date(partida.dataHora).getTime() + 2 * 60 * 60 * 1000), // TODO: criar coluna no BD para fim da partida
  //       color: statusColors[partida.status] || 'grey',
  //       status: partida.status, // Não é necessário, já vai ter no destruct acima
  //       // TODO: partidaData não é necessário, basta apenas fazer lá no inicio o destruct, ...partida
  //       partidaData: partida, // Guarda os dados completos da partida
  //     }))
  //   } catch (error) {
  //     console.error('Erro ao carregar partidas:', error)
  //   }
  // }

  function getEventColor (event) {
    return event.color
  }

  function abrirDetalhesPartida ({ event }) {
    matchSelected.value = event.partidaData
    showModal.value = true
  }
</script>

<style scoped lang="scss">
.calendario-page {
  background-color: #ffffff !important;
  border: 1px solid #e8f5e9;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(27, 94, 32, 0.05);
  min-height: 100%;
}

.controles-calendario {
  background-color: #ffffff !important;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(27, 94, 32, 0.1);
  margin-bottom: 16px;
  border: 1px solid #e8f5e9;
}

.legenda-status {
  background-color: #ffffff !important;
  border: 1px solid #e8f5e9;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(27, 94, 32, 0.05);
  position: absolute;
  right: 36px;
  top: 34px;
  z-index: 10;
}

.calendario-container {
  background-color: #ffffff !important;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(27, 94, 32, 0.1);
  overflow: hidden;
}

.btn-nav {
  color: #1B5E20 !important;

  &:hover {
    background-color: #e8f5e9 !important;
  }
}

.select-calendario {
  :deep(.v-field--variant-outlined) {
    .v-field__outline {
      color: #1B5E20;
    }
  }

  :deep(.v-field--focused) {
    .v-field__outline {
      color: #1B5E20;
    }
  }

  :deep(.v-label) {
    color: #1B5E20;
  }
}

// Estilos do Calendário
:deep(.v-calendar) {
  --v-calendar-event-height: 20px;
  background-color: #ffffff !important;
}

:deep(.v-calendar-header) {
  background-color: #ffffff !important;
  color: #1B5E20 !important;
}

:deep(.v-calendar-weekly) {
  background-color: #ffffff !important;
}

:deep(.v-calendar-weekly__head) {
  background-color: #ffffff !important;
  border-bottom: 2px solid #1B5E20 !important;
}

:deep(.v-calendar-weekly__day-label) {
  color: #1B5E20 !important;
  font-weight: 600;
  background-color: #ffffff !important;
}

:deep(.v-calendar-weekly__week) {
  background-color: #ffffff !important;
}

:deep(.v-calendar-weekly__day) {
  border-color: #e8f5e9 !important;
  background-color: #ffffff !important;
}

:deep(.v-calendar-day) {
  transition: background-color 0.2s ease;
  background-color: #ffffff !important;

  &:hover {
    background-color: #f1f8e9 !important;
  }
}

:deep(.v-calendar-day__day) {
  background-color: #ffffff !important;
}

:deep(.v-calendar-monthly) {
  background-color: #ffffff !important;
}

:deep(.v-calendar-monthly__day) {
  border-color: #e8f5e9 !important;
  background-color: #ffffff !important;
}

:deep(.v-calendar-monthly__day-label) {
  color: #333333 !important;
}

:deep(.v-calendar-daily) {
  background-color: #ffffff !important;
}

:deep(.v-calendar-daily__head) {
  background-color: #ffffff !important;
  border-bottom: 2px solid #1B5E20 !important;
}

:deep(.v-calendar-daily__day) {
  background-color: #ffffff !important;
}

// Eventos
:deep(.v-calendar-event) {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
  height: 20px;
  font-size: 12px;
  padding: 2px 4px;

  &:hover {
    opacity: 0.85;
    transform: scale(1.02);
    box-shadow: 0 2px 4px rgba(27, 94, 32, 0.25);
  }
}

// Botão TODAY
:deep(.v-btn) {
  background-color: #ffffff !important;
  color: #1B5E20 !important;

  &:hover {
    background-color: #e8f5e9 !important;
  }
}

:deep(.v-chip) {
  font-weight: 500;
}

// Números dos dias
:deep(.v-calendar-weekly__day-month) {
  color: #666666 !important;
}

// Dia atual
:deep(.v-calendar-day--today) {
  .v-calendar-day__day {
    background-color: #e8f5e9 !important;
    border: 2px solid #1B5E20 !important;
  }
}

@media screen and (max-width: 600px) {
  .calendario {
    padding: 16px;
  }

  .controles-calendario {
    padding: 8px !important;
  }

  .legenda-status {
    padding: 12px !important;
  }
}

</style>
