# SH1R00 Construction — Documentation

## Functionality

SH1R00 Construction is a construction-company portfolio template: a hero carousel, services grid, featured projects, a blog with per-post pages, FAQs, and a contact form. It is localized in English/Spanish/Amharic via `@nuxtjs/i18n`, installable as a PWA, and includes an SSR-safe dark-mode toggle plus production CSP headers via `nuxt-security`.

## Stack

- Nuxt 4 (`nuxt ^4.4.8`, `compatibilityVersion: 4`)
- Vue 3 (`vue ^3.5.38`, Composition API)
- Tailwind CSS 3.4 (via `@nuxtjs/tailwindcss ^6.14.0`)
- `@nuxtjs/i18n ^10.4.0` (3 locales, bundled via `i18n.config.ts`)
- `@vite-pwa/nuxt ^1.1.1` (+ `vite-plugin-pwa ^1.3.0`)
- `nuxt-security ^2.6.0` (CSP, rate limiter, XSS validator)
- Pinia `^3.0.4` (dark-mode store)
- `vue-router ^5.1.0`
- Testing: Vitest `^4.1.9`, `@playwright/test ^1.61.1`, `@vue/test-utils ^2.4.11`, `happy-dom ^20.10.6`

## Steps Taken

- `af28e7d` nuxt4 migration/creation + construction-site-nuxt4
- `4c88987` restore nuxt-security CSP with permissive rules (unsafe-inline, no strict-dynamic)
- `5388db0` add README.txt with deploy instructions + project overview
- `fda6d87` convert README.txt to README.md with GitHub markdown formatting
- `395d04f` fix README.md formatting
- `d453480` fix(i18n+security): detectBrowserLanguage:false, $t→t, missing keys, CSP nonce, lazy i18n, branded PWA
- `7bf64ae` fix(netlify): node 24 + legacy-peer-deps (nuxt-security@2.6.0 needs >=24)
- `759d0b7` fix(netlify): root / redirect to /en/ (prefix strategy) + SPA fallback to /200.html

## Pitfalls & Fixes

**Shared (all sh1r00 templates):**

- **nuxt-security@2.6.0 needs Node ≥ 24.** Deploying on Node 22 failed with `EBADENGINE`. Fixed by `NODE_VERSION = "24"` in `netlify.toml`.
- **esbuild peer conflict.** `vite@8` (Nuxt 4) vs `@intlify/bundle-utils` (i18n) peer ranges conflict. Fixed with `npm install --legacy-peer-deps` (also set in the `netlify.toml` build command).
- **i18n v10 browser detection.** Set `detectBrowserLanguage: false` and build locale-aware links with `const localePath = useLocalePath()`.
- **`$t()` banned in templates.** `$t` isn't exposed in `<script setup>` templates; use `const { t } = useI18n()` and call `t('key')`.
- **Component auto-import naming.** Without a prefix fix, nested dirs auto-import as `OrganismsOHeroSection`, which resolves to a blank screen.
- **PWA precache + fallback.** Precached HTML plus a `/` `navigateFallback` made non-precached routes render blank. Fix: `navigateFallback: null` and exclude HTML from the precache manifest (this template instead pairs `navigateFallback: '/'` with the Netlify `/* → /200.html` 200 rewrite).
- **i18n `prefix` root redirect.** With `strategy: 'prefix'`, `/` must 302 to `/en/` (not `/* → /index.html`), or the bare domain breaks.
- **`defineProps()` without `const props =`.** Referencing `props` in `<script setup>` after a bare `defineProps()` call throws `props is not defined`; always assign `const props = defineProps(...)`.
- **SSG vs SSR output dirs.** `nuxt generate` (SSG) → `.output/public`; `nuxt build` (SSR) → `.output/server` + Node server. Netlify must run `generate` and publish `.output/public`.

**Project-specific:**

- Uses a `components` array with explicit `prefix: 'A'` (atoms) and `prefix: 'O'` (organisms) instead of `pathPrefix: false` — an equivalent fix for the auto-import naming pitfall.
- Locales are bundled via `vueI18n: './i18n.config.ts'` (`legacy: true`) rather than the lazy `langDir`/`file` loading used by the other three templates.
- `compilation: { strictMessage: false }` tolerates missing translation keys.
- Dynamic/catch-all pages: `blog/[title].vue`, `page/[title].vue`, `[...slug].vue`.
- A `dist` symlink points to `.output/public` for local preview.

## Deployment

Static (SSG) deployment:

```bash
npm install --legacy-peer-deps
npm run generate   # emits static files to .output/public
```

`netlify.toml` publishes `.output/public`, sets `NODE_VERSION = "24"`, installs with `--legacy-peer-deps`, and applies redirects:

- `/` → `/en/` (302) for the i18n `prefix` strategy
- `/*` → `/200.html` (200) SPA fallback

Live: https://construct-site-sh1r00-239.netlify.app
