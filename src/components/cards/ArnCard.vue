<template>
  <v-card
    :border="border"
    :color="color"
    :elevation="elevation"
    :rounded="rounded"
    :variant="variant"
  >
    <v-card-item>
      <v-card-title v-if="$slots.header" class="font-weight-regular">
        <slot name="header" />
      </v-card-title>
      <v-card-text v-if="$slots.content">
        <slot name="content" />
      </v-card-text>
      <v-card-actions v-if="$slots.actions">
        <slot name="actions" />
      </v-card-actions>
    </v-card-item>
  </v-card>
</template>

<script setup>
  defineProps({
    border: {
      type: String,
      default: 'sm',
    },
    color: {
      type: String,
      default: '#ffffff',
    },
    elevation: {
      type: [String, Number],
      default: 2,
    },
    rounded: {
      type: String,
      default: 'lg',
    },
    variant: {
      type: String,
      default: 'elevated',
    },
  })
</script>
