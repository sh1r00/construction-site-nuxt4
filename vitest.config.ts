import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import type { Plugin } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

function nuxtAutoImports(): Plugin {
  const vueAutoImports = ['ref', 'computed', 'reactive', 'watch', 'onMounted', 'onUnmounted']
  const nuxtComposableImports = [
    'useI18n', 'useLocalePath', 'useSwitchLocalePath', 'useDarkModeStore',
    'useHead', 'useSeoMeta', 'useRuntimeConfig', 'navigateTo', 'useRoute', 'useRouter',
  ]

  const vueImport = `import { ${vueAutoImports.join(', ')} } from 'vue'`
  const nuxtImport = `import { ${nuxtComposableImports.join(', ')} } from '#imports'`

  const virtualModuleId = '#imports'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'nuxt-auto-imports',
    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `
          import { ref, computed } from 'vue'
          import { useDarkModeStore as _realDarkMode } from '@/stores/darkMode'
          const _t = (k) => k
          const _locale = ref('en')
          export function useI18n() { return { t: _t, locale: _locale } }
          export function useLocalePath() { return (p) => p }
          export function useSwitchLocalePath() { return (c) => '/' + c }
          export function useDarkModeStore() { return _realDarkMode() }
          export const useHead = () => {}
          export const useSeoMeta = () => {}
          export const useRuntimeConfig = () => ({})
          export const navigateTo = () => {}
          export const useRoute = () => ({ path: '/', params: {}, query: {}, fullPath: '/' })
          export const useRouter = () => ({ push: () => {}, replace: () => {} })
        `
      }
    },
    transform(code, id) {
      if (!id.endsWith('.vue') && !id.endsWith('.ts')) return
      if (id.includes('node_modules')) return
      if (id.includes('vitest.config')) return
      if (id.includes('setup.ts')) return

      const needsVue = vueAutoImports.some(name => {
        const wordRegex = new RegExp(`(?<![\\w$])${name}(?![\\w$])`)
        if (!wordRegex.test(code)) return false
        // Skip if already imported from 'vue'
        const importRegex = new RegExp(`import\\s*\\{[^}]*\\b${name}\\b[^}]*\\}\\s*from\\s*['"]vue['"]`)
        return !importRegex.test(code)
      })
      const needsNuxt = nuxtComposableImports.some(name => {
        const wordRegex = new RegExp(`(?<![\\w$])${name}(?![\\w$])`)
        if (!wordRegex.test(code)) return false
        // Skip if already imported from '#imports'
        const importRegex = new RegExp(`import\\s*\\{[^}]*\\b${name}\\b[^}]*\\}\\s*from\\s*['"]#imports['"]`)
        return !importRegex.test(code)
      })

      if (!needsVue && !needsNuxt) return

      if (id.endsWith('.vue')) {
        let result = code
        if (needsVue) result = result.replace(/(<script\b[^>]*>)/, `$1\n${vueImport}`)
        if (needsNuxt) result = result.replace(/(<script\b[^>]*>)/, `$1\n${nuxtImport}`)
        return result
      }

      let result = code
      if (needsVue) result = `${vueImport}\n${result}`
      if (needsNuxt) result = `${nuxtImport}\n${result}`
      return result
    },
  }
}

export default defineConfig({
  plugins: [nuxtAutoImports(), vue()],
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['tests/unit/**/*.spec.ts'],
    setupFiles: ['tests/unit/setup.ts'],
    define: {
      'import.meta.server': 'false',
      'import.meta.client': 'true',
    },
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, 'app'),
      '@': resolve(__dirname, 'app'),
    },
  },
})
