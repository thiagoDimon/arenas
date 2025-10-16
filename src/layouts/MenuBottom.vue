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
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router'

  const propsValue = defineProps({
    menus: {
      type: Array,
      required: true,
    },
  })

  const reactiveMenus = reactive(propsValue.menus)

  const router = useRouter()
  const route = useRoute()

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
</style>
