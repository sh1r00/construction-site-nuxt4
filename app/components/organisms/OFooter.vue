<template>
  <footer class="bg-primary-950 dark:bg-gray-950 text-gray-300 pt-16 pb-8" role="contentinfo">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid md:grid-cols-3 gap-12 mb-12">
        <!-- Column 1: About -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-accent-500 rounded-xl flex items-center justify-center">
              <AIcon name="construction" decorative size="md" class="text-white" />
            </div>
            <span class="font-display text-xl font-bold text-white">SH1R00</span>
          </div>
          <p class="text-gray-400 leading-relaxed text-sm">
            {{ t('footer.aboutText') }}
          </p>
        </div>

        <!-- Column 2: Quick Links -->
        <div>
          <h3 class="font-display text-lg font-semibold text-white mb-4">
            {{ t('footer.quickLinks') }}
          </h3>
          <nav :aria-label="t('footer.quickLinks')">
            <ul class="space-y-2">
              <li v-for="link in quickLinks" :key="link.to">
                <NuxtLink
                  :to="localePath(link.to)"
                  class="text-sm text-gray-400 hover:text-accent-400 transition-colors"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Column 3: Contact -->
        <div>
          <h3 class="font-display text-lg font-semibold text-white mb-4">
            {{ t('footer.contactUs') }}
          </h3>
          <ul class="space-y-3 text-sm text-gray-400">
            <li class="flex items-start gap-2">
              <AIcon name="location_on" decorative size="sm" class="text-accent-400 mt-0.5" />
              <span>{{ t('contact.address') }}</span>
            </li>
            <li class="flex items-center gap-2">
              <AIcon name="phone" decorative size="sm" class="text-accent-400" />
              <span>{{ t('contact.phoneNumber') }}</span>
            </li>
            <li class="flex items-center gap-2">
              <AIcon name="email" decorative size="sm" class="text-accent-400" />
              <span>{{ formatEmail(t('contact.emailAddress')) }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-gray-500">
          &copy; {{ t('footer.copyright') }}
        </p>
        <p class="text-sm text-gray-500 flex items-center gap-1">
          {{ t('footer.madeWith') }}
          <AIcon name="favorite" decorative size="sm" class="text-red-500" />
          {{ t('footer.by') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const quickLinks = computed(() => [
  { to: '/', label: t('nav.home') },
  { to: '/about', label: t('nav.about') },
  { to: '/blogs', label: t('nav.blog') },
  { to: '/contact', label: t('nav.contact') },
  { to: '/faqs', label: t('nav.faqs') },
])
</script>
