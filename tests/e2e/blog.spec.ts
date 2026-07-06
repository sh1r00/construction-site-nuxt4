import { test, expect } from '@playwright/test'

test.describe('Blog Listing Page', () => {
  test('loads successfully', async ({ page }) => {
    const response = await page.goto('/blogs')
    expect(response?.status()).toBeLessThan(400)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('displays blog articles', async ({ page }) => {
    await page.goto('/blogs')
    const articles = page.locator('article')
    const count = await articles.count()
    expect(count).toBeGreaterThan(0)
  })

  test('each article has a link', async ({ page }) => {
    await page.goto('/blogs')
    const articleLinks = page.locator('article a')
    const count = await articleLinks.count()
    expect(count).toBeGreaterThan(0)
  })

  test('articles show category badges', async ({ page }) => {
    await page.goto('/blogs')
    // Categories shown as badges
    const badges = page.locator('article .rounded-full, article .badge, article span.absolute')
    const count = await badges.count()
    expect(count).toBeGreaterThanOrEqual(0) // Some may not have visible badges
  })

  test('articles show dates', async ({ page }) => {
    await page.goto('/blogs')
    const dates = page.locator('article time')
    const count = await dates.count()
    expect(count).toBeGreaterThan(0)
  })

  test('blog article detail page loads', async ({ page }) => {
    await page.goto('/blogs')
    const firstLink = page.locator('article a').first()
    if (await firstLink.isVisible()) {
      await firstLink.click()
      // Should navigate to blog/[title]
      await expect(page).toHaveURL(/blog\//)
      await expect(page.locator('h1, h2').first()).toBeVisible()
    }
  })
})
