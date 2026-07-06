<template>
  <div class="min-h-[80vh] flex items-center justify-center">
    <div class="text-center px-4 py-20">
      <div class="w-24 h-24 mx-auto mb-8 bg-accent-100 dark:bg-accent-900/30 rounded-3xl flex items-center justify-center">
        <AIcon name="construction" size="xl" class="text-accent-500" decorative />
      </div>
      <h1 class="text-4xl md:text-5xl font-display font-bold text-primary-900 dark:text-white mb-4">
        {{ t('notFound.heading') }}
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
        {{ t('notFound.message') }}
      </p>
      <ABaseButton :to="localePath('/')" variant="filled">
        <AIcon name="arrow_back" decorative size="sm" />
        {{ t('notFound.button') }}
      </ABaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
