<template>
  <component
    :is="icon"
    :fill="color"
    :height="size"
    :width="size"
  />
</template>

<script setup>
  import { defineAsyncComponent } from 'vue'

  const props = defineProps({
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: [Number, String],
      default: 24,
    },
    color: {
      type: String,
      default: '#000000',
    },
  })

  const icon = defineAsyncComponent(() => import(`../assets/${props.icon}.svg`))
</script>
