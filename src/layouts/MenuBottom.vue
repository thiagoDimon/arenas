<template>
  <div class="bottom-bar-mobile">
    <template v-for="menu in reactiveMenus" :key="menu.route">
      <v-menu>
        <template #activator="{ props }">
          <div v-bind="props" :class="`nav-item-mobile ${isActive(menu) ? 'active' : ''}`" @click="abrirMenu(menu)">
            <v-icon class="nav-icon-mobile">{{ menu.icon }}</v-icon>
          </div>
        </template>
        <v-list v-if="menu.submenus.length > 0">
          <v-list-item v-for="(submenu, index) in menu.submenus" :key="index" @click="navegarRota(submenu.route)">
            <v-list-item-title>{{ $t(submenu.text) }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <!-- Menu do usuário com opção de sair -->
    <v-menu location="top">
      <template #activator="{ props }">
        <div v-bind="props" :class="`nav-item-mobile ${route.path === '/perfil' ? 'active' : ''}`">
          <div class="avatar-mobile">
            <v-img v-if="profileImageUrl" cover :src="profileImageUrl" />
            <v-icon v-else size="20">mdi-account-outline</v-icon>
          </div>
        </div>
      </template>
      <v-list>
        <v-list-item @click="navegarRota('/perfil')">
          <template #prepend>
            <v-icon>mdi-account-outline</v-icon>
          </template>
          <v-list-item-title>{{ $t('perfil') }}</v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item class="logout-item" @click="realizarLogout()">
          <template #prepend>
            <v-icon color="#CB1E1A">mdi-logout</v-icon>
          </template>
          <v-list-item-title style="color: #CB1E1A;">{{ $t('sair') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router'
  import { useAuthStore, useLoginStore, useUserStore } from '@/stores'

  const propsValue = defineProps({
    menus: {
      type: Array,
      required: true,
    },
  })

  const reactiveMenus = reactive(propsValue.menus)

  const router = useRouter()
  const route = useRoute()
  const authStore = useAuthStore()
  const loginStore = useLoginStore()
  const userStore = useUserStore()

  const profileImageUrl = ref(null)

  onMounted(async () => {
    try {
      if (userStore.user?.id) {
        const imageUrl = await userStore.getProfilePicture(userStore.user.id)
        profileImageUrl.value = imageUrl
      }
    } catch (error) {
      console.error('Erro ao carregar imagem do usuário:', error)
    }
  })

  const isActive = menu => {
    return route.path === menu.route || menu.submenus.some(submenu => submenu.route == route.path)
  }

  function abrirMenu (menu) {
    if (menu.submenus.length > 0) {
      menu.submenusIsOpen = !menu.submenusIsOpen
      return
    }
    navegarRota(menu.route)
    fecharSubmenus()
  }

  function fecharSubmenus () {
    for (const menu of reactiveMenus) {
      menu.submenusIsOpen = false
    }
  }

  function navegarRota (rota) {
    router.push(rota)
  }

  async function realizarLogout () {
    await loginStore.logout()
    authStore.logado = false
    router.push('/')
  }
</script>

<style scoped lang="scss">
.bottom-bar-mobile {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  padding: 12px 20px;
  z-index: 1000;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}

.nav-item-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 48px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #000000;
  text-decoration: none;
  position: relative;
  border: none;
  background: none;
  font-family: inherit;

  &:hover {
    background: #f3f4f6;
    color: #1B5E20;
    transform: translateY(-2px);
  }

  &.active {
    background-color: #1B5E20;
    color: white;
    box-shadow: 0 4px 12px rgba(27, 94, 32, 0.3);
  }

  &:focus {
    outline: 2px solid #1B5E20;
    outline-offset: 2px;
  }
}

.nav-icon-mobile {
  font-size: 24px;
  margin-bottom: 2px;
  transition: transform 0.2s ease;
}

.nav-item-mobile:hover .nav-icon-mobile {
  transform: scale(1.1);
}

.avatar-mobile {
  width: 28px;
  height: 28px;
  background-color: #1B5E20;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;

  :deep(.v-img) {
    width: 100%;
    height: 100%;
  }

  :deep(.v-img__img) {
    object-fit: cover;
  }
}

.nav-item-mobile.active .avatar-mobile {
  background-color: white;
  color: #1B5E20;
}

.logout-item:hover {
  background-color: #ffebee;
}
</style>
