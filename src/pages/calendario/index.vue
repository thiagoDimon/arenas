<template>
  <div class="calendario-page pa-3 mb-2" color="white">
    <arn-loader :loading="calendarStore.loading" />
    <v-sheet>
      <v-calendar
        :events="matches"
        :hide-week-number="true"
        :interval-format="formatInterval"
        :view-mode="mdAndUp ? 'month' : 'week'"
        weekday-format="long"
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
        <v-toolbar :color="selectedEvent.color" dark>
          <v-toolbar-title>{{ selectedEvent.name || selectedEvent.title }}</v-toolbar-title>
          <v-spacer />
          <template #append>
            <v-btn class="mr-2" density="comfortable" icon @click="selectedOpen = false">
              <v-icon :color="selectedEvent.color">mdi-close</v-icon>
            </v-btn>
          </template>
        </v-toolbar>

        <v-card-text class="pt-4">
          <v-list class="bg-transparent" density="compact">
            <v-list-item>
              <template #prepend>
                <v-icon :color="selectedEvent.color">mdi-clock-start</v-icon>
              </template>
              <v-list-item-title class="text-subtitle-2 font-weight-bold">Início</v-list-item-title>
              <v-list-item-subtitle>{{ formatDateTime(selectedEvent.start) }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <template #prepend>
                <v-icon :color="selectedEvent.color">mdi-clock-end</v-icon>
              </template>
              <v-list-item-title class="text-subtitle-2 font-weight-bold">Término</v-list-item-title>
              <v-list-item-subtitle>{{ formatDateTime(selectedEvent.end) }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item v-if="selectedEvent.statusText">
              <template #prepend>
                <v-icon :color="selectedEvent.color">mdi-information</v-icon>
              </template>
              <v-list-item-title class="text-subtitle-2 font-weight-bold">Status</v-list-item-title>
              <v-list-item-subtitle>
                <v-chip :color="selectedEvent.color" label size="small">
                  {{ selectedEvent.status }}
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item v-if="selectedEvent.details">
              <template #prepend>
                <v-icon :color="selectedEvent.color">mdi-text</v-icon>
              </template>
              <v-list-item-title class="text-subtitle-2 font-weight-bold">Detalhes</v-list-item-title>
              <v-list-item-subtitle class="text-wrap">
                {{ selectedEvent.details.descricao || 'Sem descrição' }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useDisplay } from 'vuetify'
  import { useCalendarStore, useUserStore } from '@/stores'
  import StatusPartidaENUM from '@/util/enums/statusPartida.js'

  const calendarStore = useCalendarStore()
  const { mdAndUp } = useDisplay()

  const selectedOpen = ref(false)
  const selectedEvent = ref(null)
  const selectedElement = ref(null)
  const matches = ref([])
  const userStore = useUserStore()

  const statusColors = StatusPartidaENUM.lista.reduce((acc, status) => {
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
        color: statusColors[partida.status.toLowerCase()] || 'grey',
        status: partida.status,
        statusText: StatusPartidaENUM.lista.find(s => s.chave === partida.status)?.valor || partida.status,
        details: partida,
      }
    })
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

  function formatInterval (interval) {
    const date = interval.start
    const h = date.getHours()

    const hour12 = h % 12 === 0 ? 12 : h % 12
    const suffix = h < 12 ? 'AM' : 'PM'

    return `${hour12} ${suffix}`
  }
</script>

<style scoped lang="scss">
  @import url('@/styles/calendar.scss');
</style>
