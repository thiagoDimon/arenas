<template>
  <div class="w-100">
    <v-tabs
      v-model="tabActive"
      bg-color="white"
      class="rounded-ts-lg rounded-te-lg"
      color="primary-color-300"
      grow
      selected-class="tab-selecionada"
      style="border-top-left-radius: 8px;"
    >
      <v-tab prepend-icon="mdi-soccer-field" value="1">
        <span v-if="smAndUp">{{ $t('proximasPartidas') }}</span>
      </v-tab>
      <v-tab prepend-icon="mdi-view-list" value="2">
        <span v-if="smAndUp">{{ $t('solicitacoes') }}</span>
      </v-tab>
      <v-tab prepend-icon="mdi-history" value="3">
        <span v-if="smAndUp">{{ $t('historico') }}</span>
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="tabActive">
      <v-tabs-window-item value="1">
        <proximas-partidas />
      </v-tabs-window-item>
      <v-tabs-window-item value="2">
        <solicitacoes />
      </v-tabs-window-item>
      <v-tabs-window-item value="3">
        <historico />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script setup>
  import { useDisplay } from 'vuetify'
  import Historico from './Historico.vue'
  import ProximasPartidas from './ProximasPartidas.vue'
  import Solicitacoes from './Solicitacoes.vue'

  const { smAndUp } = useDisplay()
  const tabActive = ref(0)
</script>

<style scoped lang="scss">
.tab-selecionada {
  color: #1B5E20 !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.v-tabs :deep(.v-tab:not(.tab-selecionada)) {
  background-color: #f5f5f5 !important;
  color: #666666 !important;
  font-weight: 500 !important;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.v-tabs :deep(.v-tab:not(.tab-selecionada):hover) {
  background-color: #eeeeee !important;
  color: #333333 !important;
}

.v-tabs {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
