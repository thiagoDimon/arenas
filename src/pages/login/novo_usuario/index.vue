<template>
  <v-container class="conteudo-login" fluid>
    <v-card
      class="d-flex flex-column pa-4"
      color="#ffffff"
      rounded="xl"
      width="400"
    >
      <v-card-title class="arena-titulo-1">
        <div class="align-justify-center ga-4">
          <arn-icon color="#E5AF00" icon="arena" size="60" />
          <div class="pt-4">{{ $t('arenas') }}</div>
        </div>
      </v-card-title>
      <v-card-text>
        <v-form ref="formRef" autocomplete="on" @submit.prevent="registrar">
          <v-text-field
            v-model="email"
            autocomplete="email"
            class="mb-4"
            color="primary-color-300"
            hide-details="auto"
            :label="$t('email')"
            :rules="emailRules"
            type="email"
            variant="outlined"
          />
          <v-text-field
            v-model="password"
            autocomplete="new-password"
            color="primary-color-300"
            hide-details="auto"
            :label="$t('senha')"
            :rules="passwordRules"
            type="password"
            variant="outlined"
          />
          <v-divider class="my-7" />
          <v-btn
            block
            class="rounded-xl mb-4"
            color="primary-color-300"
            height="50"
            :loading="isSubmitting"
            type="submit"
          >
            {{ $t('registrar') }}
          </v-btn>
          <div class="registrar text-primary" @click="voltarParaLogin">
            {{ $t('jaPossuiConta') }}
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <v-dialog v-model="exibeDialogSucesso" max-width="420">
      <v-card>
        <v-card-title class="text-h6">{{ $t('tituloCadastroSucesso') }}</v-card-title>
        <v-card-text>{{ $t('mensagemCadastroSucesso') }}</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary-color-300" variant="flat" @click="voltarParaLogin">
            {{ $t('voltarParaLogin') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="exibeDialogErro" max-width="420">
      <v-card>
        <v-card-title class="text-h6">{{ $t('tituloCadastroErro') }}</v-card-title>
        <v-card-text>{{ mensagemErroDialog }}</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" variant="flat" @click="fecharDialogErro">
            {{ $t('cancelar') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'
  import apiClient from '@/services/axios'

  const router = useRouter()
  const { t } = useI18n()

  const formRef = ref(null)
  const email = ref('')
  const password = ref('')
  const isSubmitting = ref(false)
  const exibeDialogSucesso = ref(false)
  const exibeDialogErro = ref(false)
  const mensagemErroDialog = ref('')

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const emailRules = [
    value => !!value || t('mensagemEmailObrigatorio'),
    value => emailPattern.test(value) || t('mensagemEmailInvalido'),
  ]

  const passwordRules = [
    value => !!value || t('mensagemSenhaObrigatoria'),
    value => value?.length >= 6 || t('mensagemSenhaMinCaracteres'),
  ]

  async function registrar () {
    const { valid } = await formRef.value.validate()
    if (!valid) return

    isSubmitting.value = true
    mensagemErroDialog.value = ''

    try {
      await apiClient.post('/user', {
        email: email.value,
        password: password.value,
      })

      email.value = ''
      password.value = ''
      formRef.value?.resetValidation()
      exibeDialogSucesso.value = true
    } catch (error) {
      const status = error.response?.status
      const backendMessage = typeof error.response?.data?.message === 'string'
        ? error.response.data.message
        : ''

      mensagemErroDialog.value = status === 409
        ? t('mensagemEmailJaCadastrado')
        : backendMessage || t('mensagemCadastroFalha')

      exibeDialogErro.value = true
    } finally {
      isSubmitting.value = false
    }
  }

  function voltarParaLogin () {
    exibeDialogSucesso.value = false
    router.push({ name: 'Login' })
  }

  function fecharDialogErro () {
    exibeDialogErro.value = false
  }
</script>

<style scoped>
.conteudo-login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100% !important;
  height: 100% !important;
  background: url('/campo.jpg') no-repeat center center fixed;
  background-size: cover;
}

.registrar {
  cursor: pointer;
  text-decoration: underline;
  text-align: center;
  padding: 8px;
}
</style>
