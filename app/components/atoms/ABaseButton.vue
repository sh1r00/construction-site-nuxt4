<template>
  <component
    :is="to ? componentTag : 'button'"
    :type="to ? undefined : type"
    :to="to"
    :href="href"
    :class="computedClass"
    :aria-busy="loading ? 'true' : undefined"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <span v-if="loading" class="mr-2">
      <span class="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
    </span>
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, resolveComponent } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(defineProps<{
  variant?: 'filled' | 'outlined'
  to?: RouteLocationRaw
  href?: string
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
}>(), {
  variant: 'filled',
  type: 'button',
  loading: false,
  disabled: false,
  fullWidth: false,
})

const NuxtLink = resolveComponent('NuxtLink')

const componentTag = computed(() => {
  if (props.to) return NuxtLink
  if (props.href) return 'a'
  return 'button'
})

const computedClass = computed(() => [
  'inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  props.fullWidth ? 'w-full' : '',
  props.variant === 'filled'
    ? 'bg-primary-600 text-white hover:bg-primary-700'
    : 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-900',
])
</script>
