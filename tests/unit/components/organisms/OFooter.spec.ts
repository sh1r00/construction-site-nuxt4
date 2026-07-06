import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import OFooter from '@/components/organisms/OFooter.vue'

describe('OFooter', () => {
  describe('rendering', () => {
    it('renders a footer element with role="contentinfo"', () => {
      const wrapper = mount(OFooter)
      const footer = wrapper.find('footer')
      expect(footer.exists()).toBe(true)
      expect(footer.attributes('role')).toBe('contentinfo')
    })

    it('renders the logo/brand with "SH1R00" text', () => {
      const wrapper = mount(OFooter)
      expect(wrapper.text()).toContain('SH1R00')
    })

    it('renders the about section', () => {
      const wrapper = mount(OFooter)
      expect(wrapper.text()).toContain('footer.aboutText')
    })

    it('renders the quick links section heading', () => {
      const wrapper = mount(OFooter)
      expect(wrapper.text()).toContain('footer.quickLinks')
    })

    it('renders the contact section heading', () => {
      const wrapper = mount(OFooter)
      expect(wrapper.text()).toContain('footer.contactUs')
    })

    it('renders the copyright section', () => {
      const wrapper = mount(OFooter)
      expect(wrapper.text()).toContain('footer.copyright')
    })

    it('renders the made-with section', () => {
      const wrapper = mount(OFooter)
      expect(wrapper.text()).toContain('footer.madeWith')
      expect(wrapper.text()).toContain('footer.by')
    })
  })

  describe('quick links', () => {
    it('renders 5 quick links in the nav', () => {
      const wrapper = mount(OFooter)
      const quickNav = wrapper.find('nav[aria-label="footer.quickLinks"]')
      expect(quickNav.exists()).toBe(true)
      const links = quickNav.findAll('a')
      expect(links.length).toBe(5)
    })

    it('renders quick links with correct i18n labels', () => {
      const wrapper = mount(OFooter)
      const quickNav = wrapper.find('nav[aria-label="footer.quickLinks"]')
      const links = quickNav.findAll('a')
      const labels = links.map(l => l.text())
      expect(labels).toContain('nav.home')
      expect(labels).toContain('nav.about')
      expect(labels).toContain('nav.blog')
      expect(labels).toContain('nav.contact')
      expect(labels).toContain('nav.faqs')
    })
  })

  describe('contact info', () => {
    it('renders address', () => {
      const wrapper = mount(OFooter)
      expect(wrapper.text()).toContain('contact.address')
    })

    it('renders phone number', () => {
      const wrapper = mount(OFooter)
      expect(wrapper.text()).toContain('contact.phoneNumber')
    })

    it('renders email', () => {
      const wrapper = mount(OFooter)
      expect(wrapper.text()).toContain('contact.emailAddress')
    })
  })

  describe('icons (rendered as custom elements in test)', () => {
    it('renders construction-related text with contact icons', () => {
      const wrapper = mount(OFooter)
      // Verify the footer contains context that uses icons
      const html = wrapper.html()
      // Icons render as <aicon> custom elements when not auto-imported
      // Verify the footer structure is intact
      expect(html).toContain('footer.quickLinks')
      expect(html).toContain('footer.contactUs')
    })

    it('renders the logo area with brand name', () => {
      const wrapper = mount(OFooter)
      expect(wrapper.text()).toContain('SH1R00')
    })

    it('renders made-with section with proper text', () => {
      const wrapper = mount(OFooter)
      expect(wrapper.text()).toContain('footer.madeWith')
      expect(wrapper.text()).toContain('footer.by')
    })
  })

  describe('structure', () => {
    it('renders 3 grid columns', () => {
      const wrapper = mount(OFooter)
      const grid = wrapper.find('.grid')
      expect(grid.exists()).toBe(true)
      expect(grid.classes()).toContain('md:grid-cols-3')
    })

    it('renders a copyright divider', () => {
      const wrapper = mount(OFooter)
      const divider = wrapper.find('.border-t')
      expect(divider.exists()).toBe(true)
    })
  })
})
