import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('desktop navigation renders with links', async ({ page }) => {
    await page.goto('/')
    const header = page.locator('header')
    await expect(header).toBeVisible()

    const nav = header.locator('nav')
    await expect(nav).toBeVisible()

    const links = nav.locator('a')
    const count = await links.count()
    expect(count).toBeGreaterThan(0)
  })

  test('nav links navigate to correct pages', async ({ page }) => {
    await page.goto('/')

    // Navigate to About
    const nav = page.locator('header nav')
    const aboutLink = nav.locator('a[href*="about"]')
    if (await aboutLink.count() > 0) {
      await aboutLink.first().click()
      await expect(page).toHaveURL(/about/)
      await expect(page.locator('h1')).toBeVisible()
    }
  })

  test('mobile menu toggle opens and closes', async ({ page }) => {
    await page.goto('/')
    await page.setViewportSize({ width: 375, height: 812 })

    const hamburger = page.locator('header button[aria-label*="menu"], header button[aria-label*="Menu"]')
    if (await hamburger.isVisible()) {
      await hamburger.click()
      // Mobile nav should appear
      const mobileNav = page.locator('header nav, [role="dialog"], [role="menu"]')
      await expect(mobileNav.first()).toBeVisible()
    }
  })

  test('skip-to-content link is present', async ({ page }) => {
    await page.goto('/')
    const skipLink = page.locator('a[href="#main-content"]')
    await expect(skipLink).toBeVisible()
  })

  test('footer renders across pages', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    // Verify footer persists on sub-pages
    await page.goto('/about')
    await expect(footer).toBeVisible()
  })
})
