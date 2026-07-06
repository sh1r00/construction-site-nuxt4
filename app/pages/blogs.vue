<template>
  <div>
    <!-- Hero -->
    <section class="bg-primary-gradient py-20 md:py-28">
      <div class="container-narrow text-center">
        <h1 class="text-white mb-4">{{ t('blog.heading') }}</h1>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto">{{ t('blog.subheading') }}</p>
      </div>
    </section>

    <!-- Blog Grid -->
    <section class="section-padding bg-white dark:bg-gray-900">
      <div class="container-narrow">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="article in articles"
            :key="article.slug"
            class="card overflow-hidden group"
          >
            <div class="h-48 bg-primary-100 dark:bg-gray-700 flex items-center justify-center relative">
              <AIcon :name="article.icon" size="xl" class="text-primary-300 dark:text-gray-600" decorative />
              <span class="absolute top-4 left-4 bg-accent-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {{ article.category }}
              </span>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                <AIcon name="calendar_today" decorative size="sm" />
                <time :datetime="article.date">{{ article.date }}</time>
                <span class="mx-1">·</span>
                <AIcon name="person" decorative size="sm" />
                <span>{{ article.author }}</span>
              </div>
              <h2 class="text-xl font-display font-semibold text-primary-900 dark:text-white mb-3 group-hover:text-accent-500 transition-colors">
                <NuxtLink :to="localePath(`/blog/${article.slug}`)">
                  {{ article.title }}
                </NuxtLink>
              </h2>
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                {{ article.excerpt }}
              </p>
              <NuxtLink
                :to="localePath(`/blog/${article.slug}`)"
                class="inline-flex items-center gap-1 text-sm font-semibold text-accent-600 hover:text-accent-500 transition-colors"
              >
                {{ t('blog.readMore') }}
                <AIcon name="arrow_forward" decorative size="sm" />
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const articles = computed(() => [
  {
    slug: 'trends-shaping-commercial-construction',
    title: t('blog.article1.title'),
    excerpt: t('blog.article1.excerpt'),
    date: t('blog.article1.date'),
    author: t('blog.article1.author'),
    category: t('blog.article1.category'),
    icon: 'business',
  },
  {
    slug: 'home-renovation-planning-guide',
    title: t('blog.article2.title'),
    excerpt: t('blog.article2.excerpt'),
    date: t('blog.article2.date'),
    author: t('blog.article2.author'),
    category: t('blog.article2.category'),
    icon: 'home',
  },
  {
    slug: 'sustainability-beyond-buzzwords',
    title: t('blog.article3.title'),
    excerpt: t('blog.article3.excerpt'),
    date: t('blog.article3.date'),
    author: t('blog.article3.author'),
    category: t('blog.article3.category'),
    icon: 'eco',
  },
])
</script>
