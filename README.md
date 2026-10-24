# SH1R00 Construction
*shiro — where style meets function*

**Category: Business Template**  
**Live:** [https://construct-site-sh1r00-239.netlify.app](https://construct-site-sh1r00-239.netlify.app)  
**GitHub:** [construction-site-nuxt4](https://github.com/sh1r00/construction-site-nuxt4)  

## About This Project

Construction company portfolio. Hero carousel, services grid, featured projects, blog, FAQs, contact form.

**Tech:** 
Nuxt 4, Vue 3, i18n (3 locales), PWA, Tailwind CSS, Dark Mode, M3 Design, Security Headers

[![shiro](https://img.shields.io/badge/shiro-where_style_meets_function-6C5CE7)](https://shiro-portfolio-sh1r00.netlify.app)

## Deployment

```bash
npx nuxi generate
```bash
Deploy .output/public to Netlify via API zip upload.
```
CSP headers via nuxt-security module — production-ready.

## Quick Start (Local Development)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run generate
   ```

4. Preview production build:
   ```bash
   npx serve .output/public
   ```

## Notes

- Built with Nuxt 4 (compatibilityVersion 4) and Vue 3 Composition API
- All projects use atomic design: atoms/ → molecules/ → organisms/
- Dark mode is SSR-safe via Pinia store with useCookie() persistence
- PWA configured with service worker for offline access
- CSP headers configured via nuxt-security module (production only)
- i18n supports 3 locales: English, Español, አማርኛ

## Pitfalls & Fixes

See [DOCUMENTATION.md](./DOCUMENTATION.md) for the full build/deployment guide and detailed pitfalls & fixes. Key items:

- nuxt-security@2.6.0 requires Node ≥ 24 (`NODE_VERSION = "24"` in `netlify.toml`)
- esbuild/vite peer conflict → `npm install --legacy-peer-deps`
- i18n v10: `detectBrowserLanguage: false` + `const localePath = useLocalePath()`
- `$t()` banned in templates → `const { t } = useI18n()`
- Component auto-import prefix fix (else `OrganismsOHeroSection` → blank screen)
- PWA precache/fallback can blank-screen non-precached routes
- i18n `prefix` strategy → `/` must 302 to `/en/` (not `/* → /index.html`)

---

*Made with ❤️ by shiro — rasisg@gmail.com — github.com/sh1r00*
