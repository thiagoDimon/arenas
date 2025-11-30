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

            <v-list-item v-if="getFullAddress(selectedEvent.details)">
              <template #prepend>
                <v-icon :color="selectedEvent.color">mdi-map-marker</v-icon>
              </template>
              <v-list-item-title class="text-subtitle-2 font-weight-bold">Local</v-list-item-title>
            </v-list-item>
          </v-list>

          <div v-if="getFullAddress(selectedEvent.details)" class="px-4 pb-2">
            <p class="mb-1 text-body-2">{{ getFullAddress(selectedEvent.details) }}</p>

            <div class="mt-3">
              <iframe
                allowfullscreen
                class="google-maps-iframe"
                frameborder="0"
                height="200"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                :src="getGoogleMapsEmbedUrl(selectedEvent.details)"
                width="100%"
              />
              <v-btn
                block
                class="mt-2"
                :color="selectedEvent.color"
                :href="getGoogleMapsDirectionsUrl(selectedEvent.details)"
                prepend-icon="mdi-navigation"
                size="small"
                target="_blank"
                variant="tonal"
              >
                Abrir no Maps
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useDisplay } from 'vuetify'
  import { useCalendarStore, useUserStore } from '@/stores'
  import matchStatusEnum from '@/util/enums/userMatchStatus.js'

  const calendarStore = useCalendarStore()
  const { mdAndUp } = useDisplay()

  const selectedOpen = ref(false)
  const selectedEvent = ref(null)
  const selectedElement = ref(null)
  const matches = ref([])
  const userStore = useUserStore()

  const statusColors = matchStatusEnum.lista.reduce((acc, status) => {
    acc[status.valor] = status.color
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
        status: matchStatusEnum.lista.find(s => s.valor == partida.status)?.chave || partida.status,
        statusText: matchStatusEnum.lista.find(s => s.valor == partida.status)?.chave || partida.status,
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

  function getFullAddress (match) {
    if (!match) return ''

    if (match.local) {
      return match.local.replace(/\s*\(\d+\)\s*$/, '')
    }

    if (match.endereco) {
      const parts = [
        match.endereco,
        match.numero,
        match.complemento,
      ].filter(Boolean)
      return parts.join(', ')
    }

    return ''
  }

  function getGoogleMapsEmbedUrl (match) {
    const address = match.local
      ? match.local.replace(/\s*\(\d+\)\s*$/, '') + ', Brasil'
      : [match.endereco, match.numero, match.bairro, match.cidade, match.estado, 'Brasil'].filter(Boolean).join(', ')

    const encodedAddress = encodeURIComponent(address)
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''

    if (!apiKey) {
      return `https://maps.google.com/maps?q=${encodedAddress}&output=embed`
    }

    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}`
  }

  function getGoogleMapsDirectionsUrl (match) {
    const address = match.local
      ? match.local.replace(/\s*\(\d+\)\s*$/, '') + ', Brasil'
      : [match.endereco, match.numero, match.bairro, match.cidade, match.estado, 'Brasil'].filter(Boolean).join(', ')

    const encodedAddress = encodeURIComponent(address)
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
  }
</script>

<style scoped lang="scss">
  @import url('@/styles/calendar.scss');

  .google-maps-iframe {
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
