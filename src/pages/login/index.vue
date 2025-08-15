<template>
  <v-container class="conteudo-login" fluid>
    <v-card
      class="d-flex flex-column pa-4"
      color="#ffffff"
      height="418"
      rounded="xl"
      width="370"
    >
      <v-card-title class="arena-titulo-1">
        <div class="align-justify-center ga-4">
          <img alt="Arena" src="@/assets/arena.svg">
          <div class="pt-4">{{ $t('arenas') }}</div>
        </div>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            class="mb-4"
            color="primary"
            hide-details
            :label="$t('usuario')"
            variant="outlined"
          />
          <v-text-field
            class="mb-4"
            color="primary"
            hide-details
            :label="$t('senha')"
            type="password"
            variant="outlined"
          />
          <v-btn block class="rounded-xl mb-4" color="primary" height="50">{{ $t('entrar') }}</v-btn>
          <v-btn
            block
            class="rounded-xl"
            color="#000000"
            height="50"
            variant="outlined"
          >
            <div class="d-flex align-center">
              <img alt="Google" src="@/assets/google.svg" style="width: 28px;">
              <div class="ps-4">{{ $t('entrarComGoogle') }}</div>
            </div>
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
  //
</script>

<style>
.conteudo-login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100% !important;
  height: 100% !important;
  background: url('@/assets/campo.jpg') no-repeat center center fixed;
  background-size: cover;
}
</style>
