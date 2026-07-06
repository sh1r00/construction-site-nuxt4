<template>
  <div>
    <!-- Hero -->
    <section class="bg-primary-gradient py-20 md:py-28">
      <div class="container-narrow text-center">
        <h1 class="text-white mb-4">{{ page.title }}</h1>
      </div>
    </section>

    <!-- Content -->
    <section class="section-padding bg-white dark:bg-gray-900">
      <div class="container-narrow max-w-4xl">
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            {{ page.content }}
          </p>
        </div>

        <!-- CTA -->
        <div class="mt-16 text-center">
          <ABaseButton :to="localePath('/contact')" variant="filled">
            {{ t('cta.button') }}
          </ABaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const pages = computed(() => ({
  services: {
    title: t('dynamicPage.services.title'),
    content: t('dynamicPage.services.content'),
  },
  projects: {
    title: t('dynamicPage.projects.title'),
    content: t('dynamicPage.projects.content'),
  },
  careers: {
    title: t('dynamicPage.careers.title'),
    content: t('dynamicPage.careers.content'),
  },
}))

const page = computed(() => {
  const slug = route.params.title as string
  return pages.value[slug] || {
    title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
    content: 'This page is under construction. Please check back soon.',
  }
})
</script>
