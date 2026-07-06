===============================================================================
                     SH1R00 Construction
                     shiro — where style meets function
===============================================================================

Category: Business Template
Live URL:  https://construct-site-sh1r00-239.netlify.app
GitHub:    https://github.com/sh1r00/construction-site-nuxt4

===============================================================================
ABOUT THIS PROJECT
===============================================================================

Construction company portfolio. Hero carousel, services grid, featured projects, blog, FAQs, contact form.

Technology Stack:
Nuxt 4, Vue 3, i18n (3 locales), PWA, Tailwind CSS, Dark Mode, M3 Design, Security Headers

Shiro Portfolio: https://shiro-portfolio-sh1r00.netlify.app

===============================================================================
DEPLOYMENT
===============================================================================

npx nuxi generate
Deploy .output/public to Netlify via API zip upload.
CSP headers via nuxt-security module — production-ready.

===============================================================================
QUICK START (Local Development)
===============================================================================

1. Install dependencies:
   npm install

2. Start development server:
   npm run dev

3. Build for production:
   npm run generate

4. Preview production build:
   npx serve .output/public

===============================================================================
NOTES
===============================================================================

- Built with Nuxt 4 (compatibilityVersion 4) and Vue 3 Composition API
- All projects use atomic design: atoms/ → molecules/ → organisms/
- Dark mode is SSR-safe via Pinia store with useCookie() persistence
- PWA configured with service worker for offline access
- CSP headers configured via nuxt-security module (production only)
- i18n supports 3 locales: English, Español, አማርኛ

===============================================================================
Made with ❤️ by shiro — rasisg@gmail.com — github.com/sh1r00
===============================================================================
