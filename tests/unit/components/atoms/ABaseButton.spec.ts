import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ABaseButton from '@/components/atoms/ABaseButton.vue'

describe('ABaseButton', () => {
  describe('rendering', () => {
    it('renders a <button> by default', () => {
      const wrapper = mount(ABaseButton, {
        slots: { default: 'Click me' },
      })
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
      expect(button.text()).toBe('Click me')
    })

    it('renders a button with href when href prop is provided (falls back to button)', () => {
      const wrapper = mount(ABaseButton, {
        props: { href: 'https://example.com' },
        slots: { default: 'Link' },
      })
      // Without 'to' prop, componentTag renders as 'button'
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
      expect(button.text()).toBe('Link')
    })

    it('renders NuxtLink stub when "to" prop is provided', () => {
      const wrapper = mount(ABaseButton, {
        props: { to: '/about' },
        slots: { default: 'Go to About' },
      })
      // NuxtLink is stubbed as <a> in setup.ts
      const link = wrapper.find('a')
      expect(link.exists()).toBe(true)
      expect(link.text()).toBe('Go to About')
    })
  })

  describe('props', () => {
    it('applies filled variant classes by default', () => {
      const wrapper = mount(ABaseButton)
      const button = wrapper.find('button')
      expect(button.classes()).toContain('bg-primary-600')
    })

    it('applies outlined variant classes when variant="outlined"', () => {
      const wrapper = mount(ABaseButton, {
        props: { variant: 'outlined' },
      })
      const button = wrapper.find('button')
      expect(button.classes()).toContain('border-primary-600')
    })

    it('sets button type attribute', () => {
      const wrapper = mount(ABaseButton, {
        props: { type: 'submit' },
      })
      expect(wrapper.find('button').attributes('type')).toBe('submit')
    })

    it('applies full-width class when fullWidth is true', () => {
      const wrapper = mount(ABaseButton, {
        props: { fullWidth: true },
      })
      expect(wrapper.find('button').classes()).toContain('w-full')
    })

    it('does not apply full-width class by default', () => {
      const wrapper = mount(ABaseButton)
      expect(wrapper.find('button').classes()).not.toContain('w-full')
    })
  })

  describe('disabled state', () => {
    it('disables button when disabled prop is true', () => {
      const wrapper = mount(ABaseButton, {
        props: { disabled: true },
      })
      const button = wrapper.find('button')
      expect(button.attributes('disabled')).toBeDefined()
    })

    it('disables button when loading prop is true', () => {
      const wrapper = mount(ABaseButton, {
        props: { loading: true },
      })
      const button = wrapper.find('button')
      expect(button.attributes('disabled')).toBeDefined()
    })

    it('shows aria-busy when loading', () => {
      const wrapper = mount(ABaseButton, {
        props: { loading: true },
      })
      expect(wrapper.find('button').attributes('aria-busy')).toBe('true')
    })

    it('shows spinner element when loading', () => {
      const wrapper = mount(ABaseButton, {
        props: { loading: true },
        slots: { default: 'Submit' },
      })
      const spinner = wrapper.find('.animate-spin')
      expect(spinner.exists()).toBe(true)
    })

    it('does not show spinner when not loading', () => {
      const wrapper = mount(ABaseButton, {
        slots: { default: 'Submit' },
      })
      const spinner = wrapper.find('.animate-spin')
      expect(spinner.exists()).toBe(false)
    })
  })

  describe('events', () => {
    it('emits click event when clicked', async () => {
      const wrapper = mount(ABaseButton)
      await wrapper.find('button').trigger('click')
      expect(wrapper.emitted()).toBeDefined()
    })

    it('does not emit click when disabled', async () => {
      const wrapper = mount(ABaseButton, {
        props: { disabled: true },
        slots: { default: 'Click' },
      })
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })
  })

  describe('default prop values', () => {
    it('defaults variant to "filled"', () => {
      const wrapper = mount(ABaseButton)
      expect(wrapper.props('variant')).toBe('filled')
    })

    it('defaults type to "button"', () => {
      const wrapper = mount(ABaseButton)
      expect(wrapper.props('type')).toBe('button')
    })

    it('defaults loading to false', () => {
      const wrapper = mount(ABaseButton)
      expect(wrapper.props('loading')).toBe(false)
    })

    it('defaults disabled to false', () => {
      const wrapper = mount(ABaseButton)
      expect(wrapper.props('disabled')).toBe(false)
    })

    it('defaults fullWidth to false', () => {
      const wrapper = mount(ABaseButton)
      expect(wrapper.props('fullWidth')).toBe(false)
    })
  })
})
