<template>
  <div>
    <!-- Hero -->
    <section class="bg-primary-gradient py-20 md:py-28">
      <div class="container-narrow text-center">
        <h1 class="text-white mb-4">{{ t('faqs.heading') }}</h1>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto">{{ t('faqs.subheading') }}</p>
      </div>
    </section>

    <!-- FAQ Accordion -->
    <section class="section-padding bg-white dark:bg-gray-900">
      <div class="container-narrow max-w-3xl">
        <div class="space-y-4">
          <div
            v-for="(faq, idx) in faqs"
            :key="idx"
            class="card"
          >
            <button
              :id="`faq-trigger-${idx}`"
              type="button"
              class="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 rounded-2xl"
              :aria-expanded="openIdx === idx ? 'true' : 'false'"
              :aria-controls="`faq-panel-${idx}`"
              @click="toggle(idx)"
            >
              <span class="text-lg font-display font-semibold text-primary-900 dark:text-white pr-4">
                {{ faq.q }}
              </span>
              <AIcon
                :name="openIdx === idx ? 'remove' : 'add'"
                size="md"
                class="text-primary-500 flex-shrink-0 transition-transform duration-300"
                :class="{ 'rotate-90': openIdx === idx }"
                decorative
              />
            </button>
            <div
              :id="`faq-panel-${idx}`"
              :role="'region'"
              :aria-labelledby="`faq-trigger-${idx}`"
              :hidden="openIdx !== idx"
              class="overflow-hidden transition-all duration-300"
              :class="openIdx === idx ? 'max-h-96' : 'max-h-0'"
            >
              <div class="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                {{ faq.a }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const openIdx = ref<number | null>(null)

function toggle(idx: number) {
  openIdx.value = openIdx.value === idx ? null : idx
}

const faqs = computed(() => [
  { q: t('faqs.q1'), a: t('faqs.a1') },
  { q: t('faqs.q2'), a: t('faqs.a2') },
  { q: t('faqs.q3'), a: t('faqs.a3') },
  { q: t('faqs.q4'), a: t('faqs.a4') },
  { q: t('faqs.q5'), a: t('faqs.a5') },
  { q: t('faqs.q6'), a: t('faqs.a6') },
  { q: t('faqs.q7'), a: t('faqs.a7') },
  { q: t('faqs.q8'), a: t('faqs.a8') },
])
</script>
