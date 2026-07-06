<template>
  <div>
    <!-- Hero Carousel -->
    <section class="relative h-[85vh] min-h-[600px] overflow-hidden" aria-label="Hero">
      <div
        v-for="(slide, idx) in slides"
        :key="idx"
        class="absolute inset-0 transition-opacity duration-700"
        :class="idx === currentSlide ? 'opacity-100' : 'opacity-0'"
        :aria-hidden="idx !== currentSlide ? 'true' : undefined"
      >
        <div
          class="absolute inset-0 bg-cover bg-center"
          :style="{ backgroundImage: `url(${slide.image})` }"
        />
        <div class="absolute inset-0 bg-primary-950/70" />
        <div class="relative h-full flex items-center">
          <div class="max-w-7xl mx-auto px-4 w-full">
            <div class="max-w-2xl" :class="idx === currentSlide ? 'animate-slide-up' : ''">
              <h1 class="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                {{ slide.title }}
              </h1>
              <p class="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                {{ slide.subtitle }}
              </p>
              <div class="flex flex-wrap gap-4">
                <ABaseButton :to="localePath('/contact')" variant="filled">
                  {{ t('hero.cta') }}
                </ABaseButton>
                <ABaseButton variant="outlined" class="!border-white !text-white hover:!bg-white hover:!text-primary-900">
                  {{ t('hero.ourWork') }}
                </ABaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Carousel controls -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        <button
          v-for="(_, idx) in slides"
          :key="idx"
          type="button"
          class="w-3 h-3 rounded-full transition-all duration-300"
          :class="idx === currentSlide ? 'bg-accent-500 scale-125' : 'bg-white/50 hover:bg-white/80'"
          :aria-label="t('hero.slide') + ' ' + (idx + 1) + ' ' + t('hero.of') + ' ' + slides.length"
          @click="goToSlide(idx)"
        />
      </div>
    </section>

    <!-- Services Grid -->
    <section class="section-padding bg-white dark:bg-gray-900">
      <div class="container-narrow">
        <div class="text-center mb-16">
          <h2 class="text-primary-900 dark:text-white mb-4">{{ t('services.heading') }}</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {{ t('services.subheading') }}
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="service in services"
            :key="service.title"
            class="card p-6 group"
          >
            <div class="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent-500 transition-colors">
              <AIcon :name="service.icon" size="md" class="text-accent-600 group-hover:text-white transition-colors" decorative />
            </div>
            <h3 class="text-xl font-display font-semibold text-primary-900 dark:text-white mb-3">
              {{ service.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {{ service.desc }}
            </p>
            <NuxtLink
              :to="localePath('/page/services')"
              class="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-accent-400 hover:text-accent-500 transition-colors"
            >
              {{ t('services.learnMore') }}
              <AIcon name="arrow_forward" decorative size="sm" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="section-padding bg-surface-light dark:bg-surface-dark">
      <div class="container-narrow">
        <div class="text-center mb-16">
          <h2 class="text-primary-900 dark:text-white mb-4">{{ t('featured.heading') }}</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {{ t('featured.subheading') }}
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="project in featuredProjects"
            :key="project.key"
            class="card group overflow-hidden"
          >
            <div class="h-48 bg-primary-200 dark:bg-gray-700 flex items-center justify-center relative overflow-hidden">
              <AIcon :name="project.icon" size="xl" class="text-primary-400 dark:text-gray-500" decorative />
              <div class="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/20 transition-colors" />
            </div>
            <div class="p-6">
              <h3 class="text-lg font-display font-semibold text-primary-900 dark:text-white mb-2">
                {{ project.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                {{ project.desc }}
              </p>
              <NuxtLink
                :to="localePath('/page/projects')"
                class="text-sm font-semibold text-accent-600 hover:text-accent-500 transition-colors inline-flex items-center gap-1"
              >
                {{ t('featured.viewAll') }}
                <AIcon name="arrow_forward" decorative size="sm" />
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="text-center mt-10">
          <ABaseButton :to="localePath('/page/projects')" variant="outlined">
            {{ t('featured.viewAll') }}
          </ABaseButton>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-padding bg-primary-gradient">
      <div class="container-narrow text-center">
        <h2 class="text-white mb-6">{{ t('cta.heading') }}</h2>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          {{ t('cta.subheading') }}
        </p>
        <ABaseButton :to="localePath('/contact')" variant="filled" class="!bg-accent-500 !text-white hover:!bg-accent-600">
          {{ t('cta.button') }}
          <AIcon name="arrow_forward" decorative size="sm" />
        </ABaseButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const slides = computed(() => [
  {
    title: t('hero.title1'),
    subtitle: t('hero.subtitle1'),
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
  },
  {
    title: t('hero.title2'),
    subtitle: t('hero.subtitle2'),
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80',
  },
  {
    title: t('hero.title3'),
    subtitle: t('hero.subtitle3'),
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80',
  },
])

const currentSlide = ref(0)

function goToSlide(idx: number) {
  currentSlide.value = idx
}

onMounted(() => {
  const interval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length
  }, 5000)
  onUnmounted(() => clearInterval(interval))
})

const services = computed(() => [
  { title: t('services.commercialTitle'), desc: t('services.commercialDesc'), icon: 'business' },
  { title: t('services.residentialTitle'), desc: t('services.residentialDesc'), icon: 'home' },
  { title: t('services.industrialTitle'), desc: t('services.industrialDesc'), icon: 'factory' },
  { title: t('services.renovationTitle'), desc: t('services.renovationDesc'), icon: 'build' },
  { title: t('services.civilTitle'), desc: t('services.civilDesc'), icon: 'engineering' },
  { title: t('services.designTitle'), desc: t('services.designDesc'), icon: 'design_services' },
])

const featuredProjects = computed(() => [
  { key: 'p1', title: t('featured.project1Title'), desc: t('featured.project1Desc'), icon: 'apartment' },
  { key: 'p2', title: t('featured.project2Title'), desc: t('featured.project2Desc'), icon: 'holiday_village' },
  { key: 'p3', title: t('featured.project3Title'), desc: t('featured.project3Desc'), icon: 'warehouse' },
])
</script>
