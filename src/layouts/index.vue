<template>
  <div class="layout-sidebar">
    <MenuSidebar :menus="menus" />
    <MenuBottom :menus="menus" />
    <div class="main-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
  import MenuBottom from './MenuBottom.vue'
  import MenuSidebar from './MenuSidebar.vue'

  const menus = ref([
    {
      icon: 'mdi-home-outline',
      text: 'home',
      route: '/home',
      submenusIsOpen: false,
      submenus: [],
      showInDesktop: true,
    },
    {
      icon: 'mdi-calendar-outline',
      text: 'calendario',
      route: '/calendario',
      submenusIsOpen: false,
      submenus: [],
      showInDesktop: true,
    },
    {
      icon: 'mdi-soccer',
      text: 'partidas',
      route: '/partidas',
      submenusIsOpen: false,
      submenus: [
        { icon: 'mdi-pen', text: 'criarPartida', route: '/partidas/criar' },
        { icon: 'mdi-magnify', text: 'procurarPartidas', route: '/partidas/procurar' },
      ],
      showInDesktop: true,
    },
    { icon: 'mdi-account-outline',
      text: 'perfil',
      route: '/perfil',
      submenusIsOpen: false,
      submenus: [],
      showInDesktop: false,
    },
  ])
</script>

<style lang="scss" scoped>
.layout-sidebar {
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
  position: relative;
}

.main-content {
  flex: 1;
  margin-left: 320px;
  padding: 24px;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 0px;
    padding-bottom: 60px;
  }
}

@media (max-width: 768px) {
  .layout-sidebar {
    flex-direction: column;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .sidebar-desktop {
    width: 280px;
  }

  .main-content {
    margin-left: 280px;
  }
}

@media (prefers-contrast: high) {
  .nav-item, .nav-item-mobile {
    border: 1px solid #000000;
  }

  .nav-item.active, .nav-item-mobile.active {
    border: 2px solid #000000;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav-item, .nav-item-mobile, .logo, .user-profile {
    transition: none;
  }

  .nav-item:hover, .nav-item-mobile:hover {
    transform: none;
  }
}
</style>
