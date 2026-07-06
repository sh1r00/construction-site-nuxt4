<template>
  <header
    class="sticky top-0 z-50 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md shadow-header transition-colors duration-300"
    role="banner"
  >
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="flex items-center gap-3 group" :aria-label="t('siteName')">
          <div class="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center group-hover:bg-primary-700 transition-colors">
            <AIcon name="construction" decorative size="md" class="text-white" />
          </div>
          <span class="font-display text-xl font-bold text-primary-900 dark:text-white hidden sm:block">
            SH1R00
          </span>
        </NuxtLink>

        <!-- Desktop Nav -->
        <nav :aria-label="t('menu.mainNav')" class="hidden lg:flex items-center gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="localePath(link.to)"
            class="px-4 py-2 rounded-lg text-sm font-medium text-primary-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors"
            active-class="bg-primary-100 dark:bg-gray-700 text-primary-900 dark:text-white"
            :exact="link.to === '/'"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Right side: Lang, DarkMode, Mobile -->
        <div class="flex items-center gap-2">
          <!-- Language Selector -->
          <div class="relative" @mouseenter="langOpen = true" @mouseleave="langOpen = false">
            <button
              type="button"
              class="p-2 rounded-lg text-sm font-medium text-primary-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-1"
              :aria-label="t('language.select')"
              @click="langOpen = !langOpen"
            >
              <AIcon name="language" decorative size="sm" />
              <span class="hidden sm:inline uppercase">{{ locale }}</span>
            </button>
            <div
              v-show="langOpen"
              class="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-1 min-w-[120px] z-50"
            >
              <NuxtLink
                v-for="loc in availableLocales"
                :key="loc.code"
                :to="switchLocalePath(loc.code)"
                class="block px-4 py-2 text-sm text-primary-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors"
                :class="{ 'bg-primary-100 dark:bg-gray-700 font-semibold': locale === loc.code }"
                @click="langOpen = false"
              >
                {{ loc.name }}
              </NuxtLink>
            </div>
          </div>

          <!-- Dark Mode Toggle -->
          <ADarkModeToggle />

          <!-- Mobile Hamburger -->
          <button
            type="button"
            class="lg:hidden p-2 rounded-lg text-primary-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors"
            :aria-label="mobileOpen ? t('menu.close') : t('menu.open')"
            @click="mobileOpen = !mobileOpen"
          >
            <AIcon :name="mobileOpen ? 'close' : 'menu'" decorative />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition name="slide-down">
        <nav
          v-if="mobileOpen"
          :aria-label="t('menu.mainNav')"
          class="lg:hidden border-t border-gray-100 dark:border-gray-700 py-4"
        >
          <div class="flex flex-col gap-1">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="localePath(link.to)"
              class="px-4 py-3 rounded-lg text-sm font-medium text-primary-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors"
              :active-class="'bg-primary-100 dark:bg-gray-700 text-primary-900 dark:text-white'"
              :exact="link.to === '/'"
              @click="mobileOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </nav>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const availableLocales = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'am', name: 'አማርኛ' },
]

const mobileOpen = ref(false)
const langOpen = ref(false)

const navLinks = computed(() => [
  { to: '/', label: t('nav.home') },
  { to: '/about', label: t('nav.about') },
  { to: '/blogs', label: t('nav.blog') },
  { to: '/contact', label: t('nav.contact') },
  { to: '/faqs', label: t('nav.faqs') },
])
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
