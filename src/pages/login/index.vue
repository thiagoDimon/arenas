<template>
  <v-container class="conteudo-login" fluid>
    <arn-alerta
      v-model="exibeAlertaNaoInformado"
      class="mt-4"
      color="secondary-color-300"
      density="comfortable"
      location="top center"
      position="fixed"
      :text="$t('mensagemUsuarioSenhaNaoInformado')"
      :title="$t('atencao')"
      type="warning"
    />
    <arn-alerta
      v-if="mensagemErroLogin"
      v-model="exibeErroLogin"
      class="mt-4"
      closable
      color="error"
      density="comfortable"
      location="top center"
      position="fixed"
      :text="$t(mensagemErroLogin)"
      :title="$t('erro')"
      type="error"
    >
      <template #action>
        <v-btn icon size="small" @click="exibeErroLogin = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </arn-alerta>
    <v-card
      class="d-flex flex-column pa-4"
      color="#ffffff"
      height="480"
      rounded="xl"
      width="400"
    >
      <v-card-title class="arena-titulo-1">
        <div class="align-justify-center ga-4">
          <arn-icon color="#E5AF00" icon="arena" size="60" />
          <div class="pt-4">{{ $t("arenas") }}</div>
        </div>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="username"
            class="mb-4"
            color="primary-color-300"
            hide-details
            :label="$t('usuario')"
            variant="outlined"
          />
          <v-text-field
            v-model="password"
            color="primary-color-300"
            hide-details
            :label="$t('senha')"
            type="password"
            variant="outlined"
          />
          <v-checkbox
            v-model="lembreMe"
            class="d-flex justify-end"
            color="primary-color-300"
            hide-details
            label="Lembre-me"
          />
          <v-btn
            block
            class="rounded-xl mb-4"
            color="primary-color-300"
            height="50"
            @click="realizarLogin()"
          >
            {{ $t("entrar") }}
          </v-btn>
          <v-btn
            block
            class="rounded-xl mb-2"
            color="#000000"
            height="50"
            :href="loginStore.loginGoogle()"
            variant="outlined"
          >
            <div class="d-flex align-center">
              <arn-icon icon="google" />
              <div class="ps-4">{{ $t("entrarComGoogle") }}</div>
            </div>
          </v-btn>
          <div class="registrar text-primary">
            {{ $t("naoTemConta") }}
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from '@/services/axios'
  import { useAuthStore, useLoginStore } from '@/stores'

  const loginStore = useLoginStore()
  const authStore = useAuthStore()

  const router = useRouter()

  const username = ref('')
  const password = ref('')
  const lembreMe = ref(false)
  const exibeAlertaNaoInformado = ref(false)
  const exibeErroLogin = ref(false)
  const mensagemErroLogin = ref('')

  onMounted(async () => {
    try {
      const token = localStorage.getItem('accessToken')
      if (!token) return
      await axios.get('/user/me')
      authStore.logado = true
      router.push('/home')
    } catch (error) {
      console.error(error)
    }
  })

  async function realizarLogin () {
    if (!username.value || !password.value) {
      exibeAlertaNaoInformado.value = true
      return
    }
    mensagemErroLogin.value = ''
    exibeErroLogin.value = false
    try {
      const token = await loginStore.login(username.value, password.value)
      if (token) {
        localStorage.setItem('accessToken', token)
      }
      authStore.logado = true
      router.push('/home')
    } catch (error) {
      mensagemErroLogin.value = error.message
      exibeErroLogin.value = true
      setTimeout(() => {
        exibeErroLogin.value = false
      }, 3000)
    }
  }
</script>

<style>
.conteudo-login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100% !important;
  height: 100% !important;
  background: url("/campo.jpg") no-repeat center center fixed;
  background-size: cover;
}

.registrar {
  cursor: pointer;
  text-decoration: underline;
  text-align: center;
  padding: 8px;
}
</style>
