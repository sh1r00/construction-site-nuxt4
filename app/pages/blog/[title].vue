<template>
  <div>
    <article>
      <!-- Hero -->
      <section class="bg-primary-gradient py-16 md:py-24">
        <div class="container-narrow">
          <NuxtLink
            :to="localePath('/blogs')"
            class="inline-flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors mb-6"
          >
            <AIcon name="arrow_back" decorative size="sm" />
            {{ t('blog.backToBlog') }}
          </NuxtLink>
          <span class="inline-block bg-accent-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {{ article.category }}
          </span>
          <h1 class="text-white mb-4">{{ article.title }}</h1>
          <div class="flex items-center gap-3 text-sm text-gray-300">
            <div class="flex items-center gap-1">
              <AIcon name="calendar_today" decorative size="sm" />
              <time :datetime="article.date">{{ article.date }}</time>
            </div>
            <span>·</span>
            <div class="flex items-center gap-1">
              <AIcon name="person" decorative size="sm" />
              <span>{{ article.author }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Content -->
      <section class="section-padding bg-white dark:bg-gray-900">
        <div class="container-narrow max-w-4xl">
          <div class="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            <p>{{ article.content }}</p>
          </div>

          <!-- Related Posts -->
          <div class="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
            <h2 class="text-2xl font-display font-semibold text-primary-900 dark:text-white mb-8">
              {{ t('blog.relatedPosts') }}
            </h2>
            <div class="grid md:grid-cols-2 gap-6">
              <div
                v-for="related in relatedArticles"
                :key="related.slug"
                class="card p-6 group"
              >
                <span class="text-xs text-accent-500 font-semibold mb-2 block">{{ related.category }}</span>
                <h3 class="text-lg font-display font-semibold text-primary-900 dark:text-white mb-2 group-hover:text-accent-500 transition-colors">
                  <NuxtLink :to="localePath(`/blog/${related.slug}`)">
                    {{ related.title }}
                  </NuxtLink>
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ related.excerpt }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const articles = computed(() => ({
  'trends-shaping-commercial-construction': {
    title: t('blog.article1.title'),
    content: t('blog.article1.content'),
    date: t('blog.article1.date'),
    author: t('blog.article1.author'),
    category: t('blog.article1.category'),
  },
  'home-renovation-planning-guide': {
    title: t('blog.article2.title'),
    content: t('blog.article2.content'),
    date: t('blog.article2.date'),
    author: t('blog.article2.author'),
    category: t('blog.article2.category'),
  },
  'sustainability-beyond-buzzwords': {
    title: t('blog.article3.title'),
    content: t('blog.article3.content'),
    date: t('blog.article3.date'),
    author: t('blog.article3.author'),
    category: t('blog.article3.category'),
  },
}))

const article = computed(() => {
  const slug = route.params.title as string
  return articles.value[slug] || {
    title: 'Article Not Found',
    content: 'The requested article could not be found.',
    date: '',
    author: '',
    category: '',
  }
})

const relatedArticles = computed(() => {
  const slug = route.params.title as string
  const keys = Object.keys(articles.value).filter((k) => k !== slug)
  return keys.slice(0, 2).map((k) => ({
    slug: k,
    title: articles.value[k].title,
    excerpt: articles.value[k].content.substring(0, 120) + '...',
    category: articles.value[k].category,
  }))
})
</script>
