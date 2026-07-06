import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDarkModeStore } from '@/stores/darkMode'

// Helper to create a fresh store for each test
function createStore() {
  setActivePinia(createPinia())
  return useDarkModeStore()
}

describe('darkMode Store', () => {
  beforeEach(() => {
    // Reset localStorage mock
    localStorage.clear()
    vi.restoreAllMocks()
    // Reset document classes
    document.documentElement.classList.remove('dark')
  })

  describe('state', () => {
    it('initializes with isDark = false', () => {
      const store = createStore()
      expect(store.isDark).toBe(false)
    })
  })

  describe('toggle()', () => {
    it('toggles isDark from false to true', () => {
      const store = createStore()
      expect(store.isDark).toBe(false)
      store.toggle()
      expect(store.isDark).toBe(true)
    })

    it('toggles isDark from true to false', () => {
      const store = createStore()
      store.isDark = true
      store.toggle()
      expect(store.isDark).toBe(false)
    })

    it('persists dark mode preference to localStorage', () => {
      const store = createStore()

      store.toggle() // false → true
      expect(localStorage.getItem('darkMode')).toBe('true')

      store.toggle() // true → false
      expect(localStorage.getItem('darkMode')).toBe('false')
    })

    it('adds "dark" class to document element when dark mode is on', () => {
      const store = createStore()
      store.toggle() // enables dark mode
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('removes "dark" class from document element when dark mode is off', () => {
      const store = createStore()
      store.isDark = true
      document.documentElement.classList.add('dark')
      store.toggle() // disables dark mode
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })
  })

  describe('init()', () => {
    it('reads stored preference from localStorage when present', () => {
      localStorage.setItem('darkMode', 'true')
      const store = createStore()
      store.init()
      expect(store.isDark).toBe(true)
    })

    it('defaults to false when no preference stored and system prefers light', () => {
      // Mock matchMedia to return light preference
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }))

      const store = createStore()
      store.init()
      expect(store.isDark).toBe(false)
    })

    it('uses system preference when no stored preference and system prefers dark', () => {
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }))

      const store = createStore()
      store.init()
      expect(store.isDark).toBe(true)
    })

    it('applies the theme after init', () => {
      localStorage.setItem('darkMode', 'true')
      const store = createStore()
      store.init()
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })
  })
})
