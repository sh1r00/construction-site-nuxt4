import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import ADarkModeToggle from '@/components/atoms/ADarkModeToggle.vue'
import { useDarkModeStore } from '@/stores/darkMode'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      darkMode: { dark: 'Switch to dark mode', light: 'Switch to light mode' },
    },
  },
})

describe('ADarkModeToggle', () => {
  let store: ReturnType<typeof useDarkModeStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useDarkModeStore()
    document.documentElement.classList.remove('dark')
  })

  function mountToggle() {
    return mount(ADarkModeToggle, {
      global: {
        plugins: [i18n],
        stubs: {
          AIcon: {
            template: '<span class="material-icons">{{ $attrs.name }}</span>',
            inheritAttrs: false,
          },
        },
      },
    })
  }

  it('renders a button', () => {
    const wrapper = mountToggle()
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('shows dark mode icon when in light mode', () => {
    const wrapper = mountToggle()
    const icon = wrapper.find('.material-icons')
    expect(icon.text()).toBe('dark_mode')
  })

  it('shows light mode icon when in dark mode', () => {
    store.isDark = true
    const wrapper = mountToggle()
    const icon = wrapper.find('.material-icons')
    expect(icon.text()).toBe('light_mode')
  })

  it('toggles isDark on click', async () => {
    const wrapper = mountToggle()
    expect(store.isDark).toBe(false)
    await wrapper.find('button').trigger('click')
    expect(store.isDark).toBe(true)
  })

  it('updates icon after click', async () => {
    const wrapper = mountToggle()
    expect(wrapper.find('.material-icons').text()).toBe('dark_mode')
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.material-icons').text()).toBe('light_mode')
  })
})
