<template>
  <div class="min-h-screen flex flex-col">
    <a href="#main-content" class="skip-to-content">
      {{ t('skipToContent') }}
    </a>

    <OHeader />

    <main id="main-content" class="flex-1" role="main">
      <slot />
    </main>

    <OFooter />
  </div>
</template>

<script setup lang="ts">
import { useDarkModeStore } from '~/stores/darkMode'
const { t } = useI18n()
const darkModeStore = useDarkModeStore()

onMounted(() => {
  darkModeStore.init()
})
</script>
