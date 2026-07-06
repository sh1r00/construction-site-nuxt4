<template>
  <span
    class="material-icons select-none"
    :class="sizeClass"
    :aria-hidden="decorative ? 'true' : undefined"
    :role="decorative ? 'img' : undefined"
    :aria-label="decorative ? undefined : label"
  >
    {{ name }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  name: string
  decorative?: boolean
  label?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>(), {
  decorative: false,
  size: 'md',
})

const sizeClass = computed(() => ({
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-3xl',
  xl: 'text-5xl',
}[props.size]))
</script>
