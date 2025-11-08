<template>
  <div class="sidebar-desktop">
    <div class="sidebar-content">
      <div class="logo-section">
        <div class="logo">
          <arn-icon color="#E5AF00" icon="arena" size="40" />
          <span class="logo-text">{{ $t('arenas') }}</span>
        </div>
      </div>

      <nav class="nav-menu">
        <template v-for="menu in reactiveMenus" :key="menu.route">
          <div :class="`nav-item ${route.path === menu.route ? 'active' : ''}`" @click="abrirMenu(menu)">
            <v-icon class="nav-icon">{{ menu.icon }}</v-icon>
            <span class="nav-text">{{ $t(menu.text) }}</span>
          </div>
          <div v-if="menu.submenusIsOpen" class="d-flex flex-column pl-3 ga-2">
            <div v-for="submenu in menu.submenus" :key="submenu.route">
              <div :class="`nav-item ${route.path === submenu.route ? 'active' : ''}`" @click="navegarRota(submenu.route)">
                <span class="nav-text">{{ $t(submenu.text) }}</span>
              </div>
            </div>
          </div>
        </template>
      </nav>

      <div class="sidebar-bottom">
        <div class="user-profile" @click="abrirPerfil()">
          <div class="avatar">
            <v-img v-if="profileImageUrl" cover :src="profileImageUrl" />
            <v-icon v-else>mdi-account-outline</v-icon>
          </div>
          <span class="user-name">{{ userName || $t('perfil') }}</span>
        </div>
        <div class="nav-item logout-item" @click="realizarLogout()">
          <v-icon class="nav-icon">mdi-logout</v-icon>
          <span class="nav-text">{{ $t('sair') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router'
  import { useAuthStore, useLoginStore, useUserStore } from '@/stores'

  const props = defineProps({
    menus: {
      type: Array,
      required: true,
    },
  })

  const reactiveMenus = reactive(props.menus.filter(menu => menu.showInDesktop))

  const router = useRouter()
  const route = useRoute()
  const authStore = useAuthStore()
  const loginStore = useLoginStore()
  const userStore = useUserStore()

  const profileImageUrl = ref(null)
  const userName = ref('')

  // Carregar dados do usuário ao montar o componente
  onMounted(async () => {
    try {
      const user = await userStore.getMe()
      if (user) {
        userName.value = `${user.firstName || ''} ${user.lastName || ''}`.trim()
        if (user.id) {
          const imageUrl = await userStore.getProfilePicture(user.id)
          profileImageUrl.value = imageUrl
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error)
    }
  })

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

  function abrirPerfil () {
    fecharSubmenus()
    navegarRota('/perfil')
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
.sidebar-desktop {
  width: 320px;
  background: #ffffff;
  border-radius: 0 24px 24px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 1000;

  @media (max-width: 768px) {
    display: none;
  }
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px 20px;
}

.logo-section {
  margin-bottom: 32px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 8px;
}

.logo-text {
  margin-top: 8px;
  font-size: 24px;
  font-weight: 700;
  color: #000000;
}

.nav-menu {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #000000;
  font-weight: 400;
  text-decoration: none;
  position: relative;
  border: none;
  background: none;
  font-family: inherit;

  &:hover {
    background-color: #1B5E20;
    color: #ffffff;
  }

  &.active {
    background-color: #1B5E20;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(27, 94, 32, 0.3);

    &::before {
      content: '';
      position: absolute;
      left: -4px;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 20px;
      background-color: #ffffff;
      border-radius: 0 2px 2px 0;
    }
  }

  &:focus {
    outline: 2px solid #1B5E20;
    outline-offset: 2px;
  }
}

.nav-icon {
  font-size: 20px;
  transition: transform 0.2s ease;
}

.nav-item:hover .nav-icon {
  transform: scale(1.1);
}

.nav-text {
  font-size: 16px;
  font-weight: 400;
}

.logout-item {
  color: #000000 !important;

  &:hover {
    background-color: #1B5E20 !important;
    color: #ffffff !important;
  }

  .nav-icon {
    color: inherit;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
}

.sidebar-bottom {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background: #f9fafb;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f3f4f6;
  }

  .avatar {
    width: 40px;
    height: 40px;
    background-color: #1B5E20;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    overflow: hidden;
    flex-shrink: 0;

    :deep(.v-img) {
      width: 100%;
      height: 100%;
    }

    :deep(.v-img__img) {
      object-fit: cover;
    }
  }

  .user-name {
    font-size: 16px;
    font-weight: 400;
    color: #000000;
  }
}
</style>
