import { test, expect } from '@playwright/test'

test.describe('About Page', () => {
  test('loads successfully', async ({ page }) => {
    const response = await page.goto('/about')
    expect(response?.status()).toBeLessThan(400)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('displays company stats section', async ({ page }) => {
    await page.goto('/about')
    // Stats section — numbers like projects completed, years, etc.
    const statValues = page.locator('.text-3xl, .text-4xl').filter({ hasText: /\d/ })
    const count = await statValues.count()
    expect(count).toBeGreaterThan(0)
  })

  test('has our story section with content', async ({ page }) => {
    await page.goto('/about')
    const storySection = page.locator('section').filter({ hasText: /story|our story|mission/i })
    await expect(storySection.first()).toBeVisible()
  })

  test('renders mission card', async ({ page }) => {
    await page.goto('/about')
    // Mission is in a rounded card with primary background
    const missionCard = page.locator('.rounded-3xl')
    await expect(missionCard).toBeVisible()
  })

  test('values/section headings are present', async ({ page }) => {
    await page.goto('/about')
    const headings = page.locator('h1, h2')
    const count = await headings.count()
    expect(count).toBeGreaterThanOrEqual(2)
  })
})
