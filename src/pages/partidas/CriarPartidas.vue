<template>
  <div class="pa-6" style="min-height: 100vh;">
    <div class="mb-6">
      <arn-card>
        <template #header>
          <v-row class="pa-4">
            <v-col cols="12">
              <div class="d-flex flex-row ga-2 align-center">
                <arn-icon color="#5f5f5f" icon="jogadores" size="28" />
                <span>{{ $t("informacoesBasicas") }}</span>
              </div>
              <div class="arena-texto-3" style="color: #5f5f5f">{{ $t("definaDetalhesPartida") }}</div>
            </v-col>
          </v-row>
        </template>
        <template #content>
          <v-row>
            <v-col cols="12" sm="6">
              <div>
                <span>{{ $t("tituloPartida") }}</span>
                <span style="color: #B00020"> *</span>
              </div>
              <v-text-field
                v-model="partida.titulo"
                clearable
                color="primary-color-300"
                density="comfortable"
                hide-details
                :placeholder="$t('exemploPeladaQuinta')"
                required
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <div>
                <span>{{ $t("maximoJogadores") }}</span>
                <span style="color: #B00020"> *</span>
              </div>
              <v-text-field
                v-model="partida.maximoJogadores"
                clearable
                color="primary-color-300"
                density="comfortable"
                hide-details
                :hide-spin-buttons="true"
                placeholder="0"
                type="number"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <span>{{ $t("descricao") }}</span>
              <v-textarea
                v-model="partida.descricao"
                class="mb-4"
                color="primary-color-300"
                density="comfortable"
                hide-details
                :placeholder="$t('adicioneDetalhesPartida')"
                rows="2"
                variant="outlined"
              />
            </v-col>
          </v-row>
        </template>
      </arn-card>
    </div>
    <div class="mb-6">
      <arn-card>
        <template #header>
          <v-row class="pa-4">
            <v-col cols="12">
              <div class="d-flex flex-row ga-2 align-center">
                <arn-icon color="#5f5f5f" icon="localizacao" size="28" />
                <span>{{ $t("local") }}</span>
              </div>
              <div class="arena-texto-3" style="color: #5f5f5f">{{ $t("ondeSeraRealizadaPartida") }}</div>
            </v-col>
          </v-row>
        </template>
        <template #content>
          <v-row>
            <v-col cols="12" sm="6">
              <div>
                <span>{{ $t("nomeLocal") }}</span>
                <span style="color: #B00020"> *</span>
              </div>
              <v-text-field
                v-model="partida.nomeLocal"
                clearable
                color="primary-color-300"
                density="comfortable"
                hide-details
                :placeholder="$t('exemploArenaCentral')"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <div>
                <span>{{ $t("cep") }}</span>
                <span style="color: #B00020"> *</span>
              </div>
              <v-mask-input
                v-model="partida.cep"
                color="primary-color-300"
                density="comfortable"
                hide-details
                :mask="$t('mascaraCep')"
                :placeholder="$t('mascaraCepPlaceholder')"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <div>
                <span>{{ $t("cidade") }}</span>
                <span style="color: #B00020"> *</span>
              </div>
              <v-text-field
                v-model="partida.cidade"
                clearable
                color="primary-color-300"
                density="comfortable"
                hide-details
                :placeholder="$t('exemploCidade')"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <div>
                <span>{{ $t("estado") }}</span>
                <span style="color: #B00020"> *</span>
              </div>
              <v-select
                v-model="partida.estado"
                bg-color="white"
                clearable
                color="primary-color-300"
                density="comfortable"
                hide-details
                item-title="descricao"
                :items="listEstados"
                :menu-props="{ contentClass: '' }"
                :placeholder="$t('selecioneEstado')"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <div>
                <span>{{ $t("rua") }}</span>
                <span style="color: #B00020"> *</span>
              </div>
              <v-text-field
                v-model="partida.rua"
                clearable
                color="primary-color-300"
                density="comfortable"
                hide-details
                :placeholder="$t('ruaExemplo')"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <div>
                <span>{{ $t("bairro") }}</span>
                <span style="color: #B00020"> *</span>
              </div>
              <v-text-field
                v-model="partida.bairro"
                clearable
                color="primary-color-300"
                density="comfortable"
                hide-details
                :placeholder="$t('exemploBairro')"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <div>
                <span>{{ $t("numero") }}</span>
                <span style="color: #B00020"> *</span>
              </div>
              <v-text-field
                v-model="partida.numeroLocal"
                clearable
                color="primary-color-300"
                density="comfortable"
                hide-details
                placeholder="123"
                :hide-spin-buttons="true"
                type="number"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <span>{{ $t("complemento") }}</span>
              <v-textarea
                v-model="partida.complemento"
                class="mb-4"
                color="primary-color-300"
                density="comfortable"
                hide-details
                :placeholder="$t('exProximoAoShopping')"
                rows="2"
                variant="outlined"
              />
            </v-col>
          </v-row>
        </template>
      </arn-card>
    </div>
    <div class="mb-6">
      <arn-card>
        <template #header>
          <v-row class="pa-4">
            <v-col cols="12" sm="6">
              <div class="d-flex flex-row ga-2 align-center">
                <v-icon color="#5f5f5f" icon="mdi-calendar" size="28" />
                <span>{{ $t("dataHorario") }}</span>
              </div>
              <div class="arena-texto-3" style="color: #5f5f5f">{{ $t("quandoOcorrePartida") }}</div>
            </v-col>
            <v-col v-if="smAndUp" cols="6">
              <div class="d-flex align-justify-start">
                <v-checkbox
                  v-model="partida.recorrente"
                  class="text-capitalize"
                  color="primary-color-300"
                  hide-details
                  :label="$t('partidaRecorrente')"
                />
              </div>
            </v-col>
          </v-row>
        </template>
        <template #content>
          <v-row>
            <v-col cols="12" sm="6">
              <div>
                <span>{{ $t("data") }}</span>
                <span style="color: #B00020"> *</span>
              </div>
              <arn-date-picker :model-value="partida.data" @update:model-value="partida.data = $event" />
            </v-col>
            <v-col cols="12" sm="6">
              <div>
                <span>{{ $t("horario") }}</span>
                <span style="color: #B00020"> *</span>
              </div>
              <arn-time-picker :model-value="partida.horario" @update:model-value="partida.horario = $event" />
            </v-col>
            <v-col v-if="!smAndUp" class="pa-0" cols="12">
              <div class="d-flex align-justify-start">
                <v-checkbox
                  v-model="partida.recorrente"
                  class="text-capitalize"
                  color="primary-color-300"
                  hide-details
                  :label="$t('partidaRecorrente')"
                />
              </div>
            </v-col>
          </v-row>
        </template>
      </arn-card>
    </div>
    <div class="mb-6">
      <arn-card>
        <template #header>
          <v-row class="pa-4">
            <v-col cols="12" sm="6">
              <div class="d-flex flex-row ga-2 align-center">
                <arn-icon color="#5f5f5f" icon="engrenagem" size="28" />
                <span>{{ $t("configuracoesAdicionais") }}</span>
              </div>
              <div class="arena-texto-3" style="color: #5f5f5f">{{ $t("personalizeSuaPartida") }}</div>
            </v-col>
            <v-col v-if="smAndUp" cols="6">
              <div class="d-flex align-justify-start">
                <v-checkbox
                  v-model="partida.privada"
                  class="text-capitalize"
                  color="primary-color-300"
                  hide-details
                  :label="$t('somenteConvidados')"
                />
              </div>
            </v-col>
          </v-row>
        </template>
        <template #content>
          <v-row>
            <v-col cols="12" sm="6">
              <div>
                <span>{{ $t("valorPessoa") }}</span>
                <span style="color: #B00020"> *</span>
              </div>
              <v-mask-input
                v-model="partida.valorPessoa"
                color="primary-color-300"
                density="comfortable"
                hide-details
                :mask="$t('mascaraDinheiro')"
                :placeholder="$t('mascaraDinheiroPlaceholder')"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <div>
                <span>{{ $t("nivel") }}</span>
                <span style="color: #B00020"> *</span>
              </div>
              <v-select
                v-model="partida.nivel"
                bg-color="white"
                clearable
                color="primary-color-300"
                density="comfortable"
                hide-details
                item-title="descricao"
                :items="listaNiveis"
                :menu-props="{ contentClass: '' }"
                :placeholder="$t('selecioneNivel')"
                variant="outlined"
              />
            </v-col>
            <v-col v-if="!smAndUp" class="pa-0" cols="12">
              <div class="d-flex align-justify-start">
                <v-checkbox
                  v-model="partida.privada"
                  class="text-capitalize"
                  color="primary-color-300"
                  hide-details
                  :label="$t('somenteConvidados')"
                />
              </div>
            </v-col>
          </v-row>
        </template>
      </arn-card>
    </div>
    <div class="d-flex justify-end ga-4">
      <arn-button
        bg-color="#E53935"
        :flat="true"
        radius="12px"
        size="lg"
        @click="cancelar()"
      >
        <span>{{ $t('cancelar') }}</span>
      </arn-button>
      <arn-button
        bg-color="#32AE3B"
        :flat="true"
        radius="12px"
        size="lg"
        @click="criarPartida()"
      >
        <span>{{ $t('criarPartida') }}</span>
      </arn-button>
    </div>
  </div>

  <v-dialog v-model="showDialogError" max-width="420">
    <v-card>
      <v-card-title class="text-h6">{{ $t('tituloCadastroErro') }}</v-card-title>
      <v-card-text>{{ errorMessage }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn class="rounded-xl px-6" color="error" variant="flat" @click="closeErrorDialog">
          {{ $t('cancelar') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useDisplay } from 'vuetify'
  import { useMatchStore } from '@/stores/match'
  import NivelENUM from '@/util/enums/nivel.js'
  import EstadoENUM from '@/util/enums/state.js'

  const { smAndUp } = useDisplay()
  const { t } = useI18n()
  const matchStore = useMatchStore()

  const isSubmitting = ref(false)
  const showDialogError = ref(false)
  const errorMessage = ref('')

  const listaNiveis = NivelENUM.lista.map(nivel => ({
    valor: nivel.valor,
    chave: nivel.chave,
    descricao: t(nivel.chave),
  }))

  const listEstados = EstadoENUM.lista.map(estado => ({
    valor: estado.valor,
    chave: estado.chave,
    descricao: t(estado.chave),
  }))

  const partida = ref({
    titulo: '',
    maximoJogadores: '',
    descricao: '',
    recorrente: false,
    data: '',
    horario: '',
    privada: false,
    valorPessoa: '',
    nivel: null,
    nomeLocal: '',
    cep: '',
    rua: '',
    numeroLocal: '',
    complemento: null,
    cidade: '',
    estado: null,
    bairro: ''
  })

  async function criarPartida () {
    isSubmitting.value = true

    try {
      await matchStore.saveMatch(partida.value);
    } catch (error) {
      const backendMessage = typeof error.response?.data?.message === 'string'
        ? error.response.data.message
        : ''

      errorMessage.value = backendMessage || t('mensagemPartidaErro')

      showDialogError.value = true
    } finally {
      isSubmitting.value = false
    }
  }

  function closeErrorDialog() {
    showDialogError.value = false
  }

  function cancelar () {
    partida.value = {
      titulo: '',
      maximoJogadores: '',
      descricao: '',
      pontoReferencia: '',
      recorrente: false,
      data: '',
      horario: '',
      privada: false,
      valorPessoa: '',
      nivel: 'INICIANTE',
      nomeLocal: '',
      cep: '',
      rua: '',
      complemento: null,
      cidade: '',
      estado: '',
      bairro: ''
    }
  }

</script>
