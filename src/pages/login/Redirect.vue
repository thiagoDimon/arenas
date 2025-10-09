<template>
  <v-container
    class="w-100 h-100 justify-center align-center d-flex"
    fluid
    style="background-color: #f5f5f5;"
  >
    <div v-if="loader" class="d-flex flex-column align-center">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      />
      <div class="arena-titulo-3 mt-4" style="color: #000000;">
        {{ $t('carregando') }}
      </div>
    </div>
  </v-container>
</template>

<script setup>
  import { onMounted, onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from '@/services/axios'
  import { useAuthStore } from '@/stores/auth'

  const loader = ref(false)
  const router = useRouter()
  const route = useRoute()
  const authStore = useAuthStore()

  onMounted(async () => {
    const token = route.query.token
    if (token != null) {
      localStorage.setItem('accessToken', token)
    }

    try {
      await axios.get('/user/me')
      loader.value = true
      authStore.logado = true
      router.push('/home')
    } catch (error) {
      console.error(error)
      authStore.logado = false
      router.replace({ name: 'Login' })
    }
  })

  onUnmounted(() => {
    loader.value = false
  })
</script>
