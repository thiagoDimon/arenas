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
        @click:event="openEvent"
      />
    </v-sheet>

    <v-menu
      v-model="selectedOpen"
      :activator="selectedElement"
      :close-on-content-click="false"
      location="end"
      offset="10"
    >
      <v-card
        v-if="selectedEvent"
        color="white"
        elevation="8"
        max-width="400px"
        min-width="350px"
      >
        <v-toolbar
          :color="selectedEvent.color"
          dark
        >
          <v-toolbar-title>{{ selectedEvent.name || selectedEvent.title }}</v-toolbar-title>
          <v-spacer />
          <v-btn
            icon
            @click="selectedOpen = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="pt-4">
          <v-list class="bg-transparent" density="compact">
            <v-list-item>
              <template #prepend>
                <v-icon color="#1B5E20">mdi-clock-start</v-icon>
              </template>
              <v-list-item-title class="text-subtitle-2 font-weight-bold">Início</v-list-item-title>
              <v-list-item-subtitle>{{ formatDateTime(selectedEvent.start) }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <template #prepend>
                <v-icon color="#1B5E20">mdi-clock-end</v-icon>
              </template>
              <v-list-item-title class="text-subtitle-2 font-weight-bold">Término</v-list-item-title>
              <v-list-item-subtitle>{{ formatDateTime(selectedEvent.end) }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item v-if="selectedEvent.statusText">
              <template #prepend>
                <v-icon color="#1B5E20">mdi-information</v-icon>
              </template>
              <v-list-item-title class="text-subtitle-2 font-weight-bold">Status</v-list-item-title>
              <v-list-item-subtitle>
                <v-chip
                  :color="selectedEvent.color"
                  label
                  size="small"
                >
                  {{ selectedEvent.status }}
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item v-if="selectedEvent.details">
              <template #prepend>
                <v-icon color="#1B5E20">mdi-text</v-icon>
              </template>
              <v-list-item-title class="text-subtitle-2 font-weight-bold">Detalhes</v-list-item-title>
              <v-list-item-subtitle class="text-wrap">
                {{ selectedEvent.details.descricao || 'Sem descrição' }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions class="px-4 pb-4">
          <v-spacer />
          <v-btn
            color="#1B5E20"
            variant="text"
            @click="selectedOpen = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useCalendarStore, useUserStore } from '@/stores'
  import StatusColorENUM from '@/util/enums/statusColors.js'

  const calendarStore = useCalendarStore()

  const selectedOpen = ref(false)
  const selectedEvent = ref(null)
  const selectedElement = ref(null)
  const matches = ref([])
  const userStore = useUserStore()

  const statusColors = StatusColorENUM.lista.reduce((acc, status) => {
    acc[status.chave] = status.color
    return acc
  }, {})

  onMounted(async () => {
    await loadMatches()
  })

  async function loadMatches () {
    const partidas = await calendarStore.buscarPartidas(userStore.user.id)
    matches.value = partidas.map(partida => {
      const dataHora = new Date(partida.dataHora)
      const horario = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

      return {
        title: `${horario} - ${partida.titulo}`,
        name: partida.titulo,
        start: dataHora,
        end: new Date(dataHora.getTime() + 2 * 60 * 60 * 1000),
        color: statusColors[partida.status] || 'grey',
        status: partida.status,
        statusText: StatusColorENUM.lista.find(s => s.chave === partida.status)?.valor || partida.status,
        details: partida,
      }
    })
  }

  function getEventColor (event) {
    return event.color
  }

  function openEvent (nativeEvent, { event }) {
    const open = () => {
      selectedEvent.value = event
      selectedElement.value = nativeEvent.target
      requestAnimationFrame(() => requestAnimationFrame(() => selectedOpen.value = true))
    }

    if (selectedOpen.value) {
      selectedOpen.value = false
      requestAnimationFrame(() => requestAnimationFrame(() => open()))
    } else {
      open()
    }

    nativeEvent.stopPropagation()
  }

  function formatDateTime (date) {
    if (!date) return '-'
    return new Date(date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
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

:deep(.v-chip .v-chip__content) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.v-toolbar-title .v-toolbar-title__placeholder) {
  width: 250px;
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
