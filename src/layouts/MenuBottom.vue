<template>
  <div class="bottom-bar-mobile">
    <div class="nav-item-mobile active">
      <v-icon class="nav-icon-mobile">mdi-home-outline</v-icon>
    </div>
    <div class="nav-item-mobile">
      <v-icon class="nav-icon-mobile">mdi-calendar-outline</v-icon>
    </div>
    <div class="nav-item-mobile">
      <v-icon class="nav-icon-mobile">mdi-soccer</v-icon>
    </div>
    <div class="nav-item-mobile">
      <v-icon class="nav-icon-mobile">mdi-account-outline</v-icon>
    </div>
  </div>
</template>

<script>
  //
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
