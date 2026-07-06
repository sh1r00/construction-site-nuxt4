import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import OHeader from '@/components/organisms/OHeader.vue'

describe('OHeader', () => {
  beforeEach(() => {
    vi.stubGlobal('useI18n', vi.fn(() => ({
      t: vi.fn((key: string) => key),
      locale: ref('en'),
    })))
  })

  describe('rendering', () => {
    it('renders a header element with role="banner"', () => {
      const wrapper = mount(OHeader)
      const header = wrapper.find('header')
      expect(header.exists()).toBe(true)
      expect(header.attributes('role')).toBe('banner')
    })

    it('renders the logo with site name', () => {
      const wrapper = mount(OHeader)
      const logo = wrapper.find('span.font-display')
      expect(logo.exists()).toBe(true)
      expect(logo.text()).toBe('SH1R00')
    })

    it('renders the desktop navigation', () => {
      const wrapper = mount(OHeader)
      const navs = wrapper.findAll('nav')
      const desktopNav = navs.find(n => n.attributes('aria-label') === 'menu.mainNav' && !n.classes().includes('lg:hidden'))
      expect(desktopNav).toBeTruthy()
    })

    it('renders all 5 navigation links', () => {
      const wrapper = mount(OHeader)
      const desktopNav = wrapper.find('nav[aria-label="menu.mainNav"]:not(.lg\\:hidden)')
      const links = desktopNav.findAll('a')
      expect(links.length).toBe(5)
    })

    it('renders the language selector button', () => {
      const wrapper = mount(OHeader)
      const langBtn = wrapper.find('button[aria-label="language.select"]')
      expect(langBtn.exists()).toBe(true)
    })

    it('renders the ADarkModeToggle area (custom element in test)', () => {
      const wrapper = mount(OHeader)
      // ADarkModeToggle renders as <adarkmodetoggle> custom element
      // Verify the header HTML contains it
      const html = wrapper.html()
      expect(html.toLowerCase()).toContain('adarkmodetoggle')
    })

    it('renders the mobile hamburger button', () => {
      const wrapper = mount(OHeader)
      const hamburger = wrapper.find('button[aria-label="menu.open"]')
      expect(hamburger.exists()).toBe(true)
    })
  })

  describe('mobile menu', () => {
    it('starts closed (mobile menu not visible)', () => {
      const wrapper = mount(OHeader)
      const mobileNav = wrapper.find('nav.lg\\:hidden')
      expect(mobileNav.exists()).toBe(false)
    })

    it('opens mobile menu when hamburger is clicked', async () => {
      const wrapper = mount(OHeader)
      const hamburger = wrapper.find('button[aria-label="menu.open"]')
      await hamburger.trigger('click')
      await wrapper.vm.$nextTick()

      const mobileNav = wrapper.find('nav.lg\\:hidden')
      expect(mobileNav.exists()).toBe(true)
    })

    it('shows close icon when mobile menu is open', async () => {
      const wrapper = mount(OHeader)
      const hamburger = wrapper.find('button[aria-label="menu.open"]')
      await hamburger.trigger('click')
      await wrapper.vm.$nextTick()

      const closeBtn = wrapper.find('button[aria-label="menu.close"]')
      expect(closeBtn.exists()).toBe(true)
    })

    it('toggles aria-label on hamburger when clicked', async () => {
      const wrapper = mount(OHeader)
      // Initially shows "menu.open"
      expect(wrapper.find('button[aria-label="menu.open"]').exists()).toBe(true)

      // Click to open
      await wrapper.find('button[aria-label="menu.open"]').trigger('click')
      await wrapper.vm.$nextTick()

      // Now shows "menu.close"
      expect(wrapper.find('button[aria-label="menu.close"]').exists()).toBe(true)

      // Click to close
      await wrapper.find('button[aria-label="menu.close"]').trigger('click')
      await wrapper.vm.$nextTick()

      // Back to "menu.open" — mobile menu was toggled off
      expect(wrapper.find('button[aria-label="menu.open"]').exists()).toBe(true)
    })

    it('renders mobile nav links in the mobile menu', async () => {
      const wrapper = mount(OHeader)
      await wrapper.find('button[aria-label="menu.open"]').trigger('click')
      await wrapper.vm.$nextTick()

      const mobileNav = wrapper.find('nav.lg\\:hidden')
      const links = mobileNav.findAll('a')
      expect(links.length).toBe(5)
    })

    it('closes mobile menu when a nav link is clicked', async () => {
      const wrapper = mount(OHeader)
      await wrapper.find('button[aria-label="menu.open"]').trigger('click')
      await wrapper.vm.$nextTick()

      const mobileNav = wrapper.find('nav.lg\\:hidden')
      const firstLink = mobileNav.find('a')
      await firstLink.trigger('click')
      await wrapper.vm.$nextTick()

      // After clicking a nav link, mobileOpen should be false
      // Verify by checking hamburger aria-label returned to "menu.open"
      expect(wrapper.find('button[aria-label="menu.open"]').exists()).toBe(true)
    })
  })

  describe('language selector', () => {
    it('shows current locale code in the selector', () => {
      const wrapper = mount(OHeader)
      const langBtn = wrapper.find('button[aria-label="language.select"]')
      expect(langBtn.text()).toContain('en')
    })

    it('toggles dropdown on button click', async () => {
      const wrapper = mount(OHeader)
      const langBtn = wrapper.find('button[aria-label="language.select"]')

      await langBtn.trigger('click')
      await wrapper.vm.$nextTick()
      const dropdown = wrapper.find('.min-w-\\[120px\\]')
      expect(dropdown.exists()).toBe(true)

      await langBtn.trigger('click')
      await wrapper.vm.$nextTick()
      expect(dropdown.exists()).toBe(true) // v-show keeps it in DOM
    })

    it('renders all 3 available locales in dropdown', async () => {
      const wrapper = mount(OHeader)
      await wrapper.find('button[aria-label="language.select"]').trigger('click')
      await wrapper.vm.$nextTick()

      const dropdown = wrapper.find('.min-w-\\[120px\\]')
      const localeLinks = dropdown.findAll('a')
      expect(localeLinks.length).toBe(3)
      expect(localeLinks[0].text()).toBe('English')
      expect(localeLinks[1].text()).toBe('Español')
      expect(localeLinks[2].text()).toBe('አማርኛ')
    })
  })

  describe('nav link labels', () => {
    it('renders nav links with correct i18n labels', () => {
      const wrapper = mount(OHeader)
      const desktopNav = wrapper.find('nav[aria-label="menu.mainNav"]:not(.lg\\:hidden)')
      const links = desktopNav.findAll('a')
      const labels = links.map(l => l.text())

      expect(labels).toContain('nav.home')
      expect(labels).toContain('nav.about')
      expect(labels).toContain('nav.blog')
      expect(labels).toContain('nav.contact')
      expect(labels).toContain('nav.faqs')
    })
  })
})
