<template>
  <button
    type="button"
    class="p-2 rounded-xl transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-500"
    :aria-label="darkModeStore.isDark ? t('darkMode.light') : t('darkMode.dark')"
    @click="darkModeStore.toggle()"
  >
    <AIcon
      :name="darkModeStore.isDark ? 'light_mode' : 'dark_mode'"
      :decorative="true"
      size="md"
    />
  </button>
</template>

<script setup lang="ts">
import { useDarkModeStore } from '~/stores/darkMode'
const darkModeStore = useDarkModeStore()
const { t } = useI18n()
</script>
