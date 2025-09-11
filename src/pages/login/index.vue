<template>
  <v-container class="conteudo-login" fluid>
    <arena-alerta
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
    <v-card
      class="d-flex flex-column pa-4"
      color="#ffffff"
      height="480"
      rounded="xl"
      width="400"
    >
      <v-card-title class="arena-titulo-1">
        <div class="align-justify-center ga-4">
          <img alt="Arena" src="@/assets/arena.svg">
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
              <img alt="Google" src="@/assets/google.svg" style="width: 28px">
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
  import { useAuthStore, useLoginStore } from '@/stores'

  const loginStore = useLoginStore()
  const authStore = useAuthStore()

  const router = useRouter()

  const username = ref('')
  const password = ref('')
  const lembreMe = ref(false)
  const exibeAlertaNaoInformado = ref(false)

  async function realizarLogin () {
    if (!username.value || !password.value) {
      exibeAlertaNaoInformado.value = true
      return
    }
    await loginStore.login(username.value, password.value)
    authStore.logado = true
    router.push('/home')
  }
</script>

<style>
.conteudo-login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100% !important;
  height: 100% !important;
  background: url("@/assets/campo.jpg") no-repeat center center fixed;
  background-size: cover;
}

.registrar {
  cursor: pointer;
  text-decoration: underline;
  text-align: center;
  padding: 8px;
}
</style>
