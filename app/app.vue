<template>
  <Html :lang="locale">
    <Body :class="{ dark: darkModeStore.isDark }">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<script setup lang="ts">
import { useDarkModeStore } from '~/stores/darkMode'
const { locale } = useI18n()
const darkModeStore = useDarkModeStore()

useHead({
  htmlAttrs: { lang: () => locale.value },
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
  ],
})
</script>
