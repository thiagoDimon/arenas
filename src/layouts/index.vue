<template>
  <div class="layout-sidebar">
    <MenuSidebar />
    <MenuBottom />
    <div class="main-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
  import MenuBottom from './MenuBottom.vue'
  import MenuSidebar from './MenuSidebar.vue'
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
