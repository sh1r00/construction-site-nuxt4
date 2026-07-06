<template>
  <div>
    <!-- Hero Banner -->
    <section class="bg-primary-gradient py-20 md:py-28">
      <div class="container-narrow text-center">
        <h1 class="text-white mb-4 animate-fade-in">{{ t('about.heading') }}</h1>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in">{{ t('tagline') }}</p>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-12 bg-accent-500">
      <div class="container-narrow">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div v-for="stat in stats" :key="stat.label" class="text-white">
            <div class="text-3xl md:text-4xl font-display font-bold mb-1">{{ stat.value }}</div>
            <div class="text-sm text-accent-100">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story -->
    <section class="section-padding bg-white dark:bg-gray-900">
      <div class="container-narrow">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-primary-900 dark:text-white mb-8 text-center">{{ t('about.storyHeading') }}</h2>
          <div class="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            <p>{{ t('about.storyP1') }}</p>
            <p>{{ t('about.storyP2') }}</p>
            <p>{{ t('about.storyP3') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission -->
    <section class="py-16 bg-surface-light dark:bg-surface-dark">
      <div class="container-narrow">
        <div class="max-w-4xl mx-auto bg-primary-600 dark:bg-primary-800 rounded-3xl p-10 md:p-14 text-center">
          <AIcon name="flag" size="xl" class="text-accent-400 mb-6 mx-auto" decorative />
          <h2 class="text-white mb-6">{{ t('about.missionHeading') }}</h2>
          <p class="text-xl text-primary-100 leading-relaxed max-w-3xl mx-auto">
            {{ t('about.missionText') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section-padding bg-white dark:bg-gray-900">
      <div class="container-narrow">
        <h2 class="text-primary-900 dark:text-white mb-12 text-center">{{ t('about.valuesHeading') }}</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="value in values" :key="value.title" class="card p-6 text-center group">
            <div class="w-14 h-14 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
              <AIcon :name="value.icon" size="lg" class="text-primary-600 group-hover:text-white transition-colors" decorative />
            </div>
            <h3 class="text-lg font-display font-semibold text-primary-900 dark:text-white mb-2">
              {{ value.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {{ value.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="section-padding bg-surface-light dark:bg-surface-dark">
      <div class="container-narrow">
        <h2 class="text-primary-900 dark:text-white mb-12 text-center">{{ t('about.teamHeading') }}</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="member in team" :key="member.name" class="card p-6 text-center group">
            <div class="w-20 h-20 mx-auto bg-primary-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-400 transition-colors">
              <AIcon name="person" size="lg" class="text-primary-500 dark:text-gray-400 group-hover:text-white transition-colors" decorative />
            </div>
            <h3 class="text-lg font-display font-semibold text-primary-900 dark:text-white">
              {{ member.name }}
            </h3>
            <p class="text-sm text-accent-600 dark:text-accent-400 mt-1">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-padding bg-primary-gradient text-center">
      <div class="container-narrow">
        <h2 class="text-white mb-6">{{ t('cta.heading') }}</h2>
        <ABaseButton :to="localePath('/contact')" variant="filled" class="!bg-accent-500 !text-white hover:!bg-accent-600">
          {{ t('cta.button') }}
        </ABaseButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const stats = computed(() => [
  { value: '27+', label: t('about.statsYears') },
  { value: '500+', label: t('about.statsProjects') },
  { value: '350+', label: t('about.statsClients') },
  { value: '120+', label: t('about.statsTeam') },
])

const values = computed(() => [
  { title: t('about.valueSafety'), desc: t('about.valueSafetyDesc'), icon: 'shield' },
  { title: t('about.valueQuality'), desc: t('about.valueQualityDesc'), icon: 'verified' },
  { title: t('about.valueIntegrity'), desc: t('about.valueIntegrityDesc'), icon: 'handshake' },
  { title: t('about.valueInnovation'), desc: t('about.valueInnovationDesc'), icon: 'lightbulb' },
])

const team = computed(() => [
  { name: t('about.team1Name'), role: t('about.team1Role') },
  { name: t('about.team2Name'), role: t('about.team2Role') },
  { name: t('about.team3Name'), role: t('about.team3Role') },
  { name: t('about.team4Name'), role: t('about.team4Role') },
])
</script>
