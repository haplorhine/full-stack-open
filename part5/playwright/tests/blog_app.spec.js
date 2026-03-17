const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const usernameField = await page.getByLabel('username')
    const passwordField = await page.getByLabel('password')

    await expect(usernameField).toBeVisible()
    await expect(passwordField).toBeVisible()
  })
})
