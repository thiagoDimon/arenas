<template>
  <v-dialog v-model="isOpen" max-width="800px" persistent scrollable>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center pa-4" style="background-color: #1B5E20; color: white;">
        <span class="text-h5">{{ $t('detalhesPartida') }}</span>
        <v-btn icon="mdi-close" size="small" variant="text" @click="close" />
      </v-card-title>

      <v-card-text class="pa-6">
        <arn-loader :loading="loading" />

        <!-- Data e Horário -->
        <div class="info-section mb-4">
          <div class="d-flex align-center mb-2">
            <v-icon class="mr-2" color="#1B5E20">mdi-calendar-outline</v-icon>
            <span class="font-weight-bold">{{ $t('dataHorario') }}:</span>
          </div>
          <span class="ml-8">{{ getFormattedDate(match.date, match.time) }}</span>
        </div>

        <div v-if="isValidUserName(match.createUserName)" class="info-section mb-4">
          <div class="d-flex align-center mb-2">
            <v-icon class="mr-2" color="#1B5E20">mdi-account</v-icon>
            <span class="font-weight-bold">{{ $t('criadoPor', { nomeUsuario: '' }) }}:</span>
          </div>
          <span class="ml-8">{{ match.createUserName }}</span>
        </div>

        <!-- Jogadores -->
        <div class="info-section mb-4">
          <div class="d-flex align-center mb-2">
            <arn-icon class="mr-2" color="#1B5E20" icon="jogadores" />
            <span class="font-weight-bold">{{ $t('jogadores') }}:</span>
          </div>
          <div class="ml-8">
            <span>{{ `${match.currentPlayers}/${match.maxPlayers} ${$t('jogadores')}` }}</span>
            <v-progress-linear
              class="mt-2"
              color="#32ae3b"
              height="6px"
              :max="match.maxPlayers"
              :model-value="match.currentPlayers"
            />
          </div>
        </div>

        <!-- Nível -->
        <div v-if="match.level" class="info-section mb-4">
          <div class="d-flex align-center mb-2">
            <v-icon class="mr-2" color="#1B5E20">mdi-chart-line</v-icon>
            <span class="font-weight-bold">{{ $t('nivel') }}:</span>
          </div>
          <span class="ml-8">{{ match.level }}</span>
        </div>

        <!-- Valor -->
        <div v-if="match.value" class="info-section mb-4">
          <div class="d-flex align-center mb-2">
            <v-icon class="mr-2" color="#1B5E20">mdi-currency-usd</v-icon>
            <span class="font-weight-bold">{{ $t('valor') }}:</span>
          </div>
          <span class="ml-8">R$ {{ match.value }}</span>
        </div>

        <!-- Descrição -->
        <div v-if="match.description" class="info-section mb-4">
          <div class="d-flex align-center mb-2">
            <v-icon class="mr-2" color="#1B5E20">mdi-text</v-icon>
            <span class="font-weight-bold">{{ $t('descricao') }}:</span>
          </div>
          <p class="ml-8 text-justify">{{ match.description }}</p>
        </div>

        <v-divider class="mb-4" />

        <!-- Local -->
        <div class="info-section">
          <div class="d-flex align-center mb-2">
            <v-icon class="mr-2" color="#1B5E20">mdi-map-marker</v-icon>
            <span class="font-weight-bold">{{ $t('local') }}:</span>
          </div>
          <div class="ml-8">
            <p v-if="match.localName" class="mb-1 font-weight-medium">{{ match.localName }}</p>
            <p v-if="getFullAddress(match)" class="mb-1">{{ getFullAddress(match) }}</p>
            <p v-if="match.localNeighborhood || match.localCity" class="mb-1">
              {{ match.localNeighborhood }}{{ match.localNeighborhood && match.localCity ? ', ' : '' }}{{ match.localCity }} - {{ match.localState }}
            </p>
            <p v-if="match.localZipCode" class="text-grey">CEP: {{ formatZipCode(match.localZipCode) }}</p>

            <div v-if="getFullAddress(match)" class="mt-4">
              <iframe
                allowfullscreen
                class="google-maps-iframe"
                frameborder="0"
                height="300"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                :src="getGoogleMapsEmbedUrl(match)"
                width="100%"
              />
              <v-btn
                class="mt-2"
                color="#1B5E20"
                :href="getGoogleMapsDirectionsUrl(match)"
                prepend-icon="mdi-navigation"
                size="small"
                target="_blank"
                variant="tonal"
              >
                {{ $t('abrirNoMaps') }}
              </v-btn>
            </div>
          </div>
        </div>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-spacer />
        <arn-button
          v-if="showRemoveButton"
          bg-color="#E53935"
          class="mr-2"
          :flat="true"
          @click="handleRemove"
        >
          <span>{{ $t('removerParticipacao') }}</span>
        </arn-button>
        <arn-button
          :flat="true"
          :outlined="true"
          text-color="#051005"
          @click="close"
        >
          <span>{{ $t('fechar') }}</span>
        </arn-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import matchStatusEnum from '@/util/enums/matchStatus'
  import { getFormattedDate, isValidUserName } from '@/util/functions'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
    match: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showRemoveButton: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits(['update:modelValue', 'remove'])

  const { t } = useI18n()

  const isOpen = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
  })

  function close () {
    isOpen.value = false
  }

  function handleRemove () {
    emit('remove', props.match)
    close()
  }

  function getStatusDescription (status) {
    const item = matchStatusEnum.lista.find(item => item.valor === status)
    return item ? item.chave : status
  }

  function getFullAddress (match) {
    if (!match.localStreet) return ''

    const parts = [
      match.localStreet,
      match.localNumber,
      match.localComplement,
    ].filter(Boolean)

    return parts.join(', ')
  }

  function formatZipCode (zipCode) {
    if (!zipCode) return ''
    const cleaned = zipCode.replace(/\D/g, '')
    if (cleaned.length === 8) {
      return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`
    }
    return zipCode
  }

  function getGoogleMapsEmbedUrl (match) {
    const address = [
      match.localStreet,
      match.localNumber,
      match.localNeighborhood,
      match.localCity,
      match.localState,
      'Brasil',
    ].filter(Boolean).join(', ')

    const encodedAddress = encodeURIComponent(address)
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''

    if (!apiKey) {
      return `https://maps.google.com/maps?q=${encodedAddress}&output=embed`
    }

    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}`
  }

  function getGoogleMapsDirectionsUrl (match) {
    const address = [
      match.localStreet,
      match.localNumber,
      match.localNeighborhood,
      match.localCity,
      match.localState,
      'Brasil',
    ].filter(Boolean).join(', ')

    const encodedAddress = encodeURIComponent(address)
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
  }
</script>

<style scoped>
.info-section {
  line-height: 1.6;
}

.text-justify {
  text-align: justify;
}

.google-maps-iframe {
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
