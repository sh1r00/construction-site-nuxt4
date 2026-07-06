import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AIcon from '@/components/atoms/AIcon.vue'

describe('AIcon', () => {
  describe('rendering', () => {
    it('renders a span with material-icons class', () => {
      const wrapper = mount(AIcon, {
        props: { name: 'home' },
      })
      const span = wrapper.find('span')
      expect(span.exists()).toBe(true)
      expect(span.classes()).toContain('material-icons')
    })

    it('renders the icon name as text content', () => {
      const wrapper = mount(AIcon, {
        props: { name: 'settings' },
      })
      expect(wrapper.text()).toBe('settings')
    })

    it('renders different icon names', () => {
      const wrapper = mount(AIcon, {
        props: { name: 'dark_mode' },
      })
      expect(wrapper.text()).toBe('dark_mode')
    })
  })

  describe('size prop', () => {
    it('defaults to md size', () => {
      const wrapper = mount(AIcon, {
        props: { name: 'home' },
      })
      expect(wrapper.find('span').classes()).toContain('text-xl')
    })

    it('applies sm size class', () => {
      const wrapper = mount(AIcon, {
        props: { name: 'home', size: 'sm' },
      })
      expect(wrapper.find('span').classes()).toContain('text-base')
    })

    it('applies md size class', () => {
      const wrapper = mount(AIcon, {
        props: { name: 'home', size: 'md' },
      })
      expect(wrapper.find('span').classes()).toContain('text-xl')
    })

    it('applies lg size class', () => {
      const wrapper = mount(AIcon, {
        props: { name: 'home', size: 'lg' },
      })
      expect(wrapper.find('span').classes()).toContain('text-3xl')
    })

    it('applies xl size class', () => {
      const wrapper = mount(AIcon, {
        props: { name: 'home', size: 'xl' },
      })
      expect(wrapper.find('span').classes()).toContain('text-5xl')
    })
  })

  describe('decorative prop', () => {
    it('defaults to non-decorative (aria-hidden not set)', () => {
      const wrapper = mount(AIcon, {
        props: { name: 'home' },
      })
      expect(wrapper.find('span').attributes('aria-hidden')).toBeUndefined()
    })

    it('sets aria-hidden when decorative is true', () => {
      const wrapper = mount(AIcon, {
        props: { name: 'home', decorative: true },
      })
      expect(wrapper.find('span').attributes('aria-hidden')).toBe('true')
    })

    it('sets role="img" when decorative', () => {
      const wrapper = mount(AIcon, {
        props: { name: 'home', decorative: true },
      })
      expect(wrapper.find('span').attributes('role')).toBe('img')
    })
  })

  describe('label prop', () => {
    it('uses label as aria-label when not decorative', () => {
      const wrapper = mount(AIcon, {
        props: { name: 'home', label: 'Home icon' },
      })
      expect(wrapper.find('span').attributes('aria-label')).toBe('Home icon')
    })

    it('does not set aria-label when decorative', () => {
      const wrapper = mount(AIcon, {
        props: { name: 'home', decorative: true, label: 'Home icon' },
      })
      expect(wrapper.find('span').attributes('aria-label')).toBeUndefined()
    })
  })

  describe('default prop values', () => {
    it('defaults decorative to false', () => {
      const wrapper = mount(AIcon, {
        props: { name: 'home' },
      })
      expect(wrapper.props('decorative')).toBe(false)
    })

    it('defaults size to "md"', () => {
      const wrapper = mount(AIcon, {
        props: { name: 'home' },
      })
      expect(wrapper.props('size')).toBe('md')
    })
  })
})
