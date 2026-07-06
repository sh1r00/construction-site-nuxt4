// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@vite-pwa/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    'nuxt-security',
  ],

  i18n: {
    strategy: 'prefix',
    defaultLocale: 'en',
    baseUrl: 'http://localhost:3000',
    locales: [
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'es', iso: 'es-ES', name: 'Español' },
      { code: 'am', iso: 'am-ET', name: 'አማርኛ' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    compilation: { strictMessage: false },
    vueI18n: './i18n.config.ts',
  },

  pwa: {
    registerType: 'autoUpdate',
    devOptions: { enabled: false },
    manifest: { name: 'App', short_name: 'App', theme_color: '#000000', background_color: '#ffffff', display: 'standalone' },
    workbox: { globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2,json}'], navigateFallback: '/', cleanupOutdatedCaches: true, skipWaiting: true, clientsClaim: true,
      runtimeCaching: [
        { urlPattern: /\\.json$/, handler: 'StaleWhileRevalidate', options: { cacheName: 'i18n' } },
        { urlPattern: /\\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/, handler: 'CacheFirst', options: { cacheName: 'images' } },
        { urlPattern: /^https:\/\/fonts\\.googleapis\\.com/, handler: 'StaleWhileRevalidate', options: { cacheName: 'google-fonts' } },
        { urlPattern: /^https:\/\/fonts\\.gstatic\\.com/, handler: 'CacheFirst', options: { cacheName: 'google-webfonts' } },
      ],
    },
  },
  security: {
    headers: process.env.NODE_ENV === "development" ? false : {
      contentSecurityPolicy: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'"],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'font-src': ["'self'", 'https://fonts.gstatic.com', 'https://fonts.googleapis.com'],
        'img-src': ["'self'", 'data:', 'https:'],
        'connect-src': ["'self'"],
        'frame-src': ["'self'"],
        'frame-ancestors': ["'self'"],
        'base-uri': ["'self'"],
        'form-action': ["'self'"],
      },
    },
    rateLimiter: false,
    xssValidator: process.env.NODE_ENV !== "development",
  },

  
  components: {
    dirs: [
      { path: '~/app/components/atoms', pathPrefix: false },
      { path: '~/app/components/molecules', pathPrefix: false },
      { path: '~/app/components/organisms', pathPrefix: false },
    ],
  },

  css: ['~/assets/css/main.css'],

  components: [
    { path: '~/components/atoms', prefix: 'A' },
    { path: '~/components/organisms', prefix: 'O' },
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'SH1R00 Construction',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'SH1R00 Construction - Building excellence since 1998' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Oswald:wght@400;500;600;700&family=Noto+Sans+Ethiopic:wght@400;500;700&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      ],
    },
  },
  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit', 'pinia'],
    },
  },
  nitro: { prerender: { failOnError: false } },
})
