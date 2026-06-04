const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Herr Kulis',
        username: 'herkullinen',
        password: 'agoodpw',
      },
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const usernameField = await page.getByLabel('username')
    const passwordField = await page.getByLabel('password')

    await expect(usernameField).toBeVisible()
    await expect(passwordField).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('herkullinen')
      await page.getByLabel('password').fill('agoodpw')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Herr Kulis logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('herkullinen')
      await page.getByLabel('password').fill('awrongpw')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'herkullinen', 'agoodpw')
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await createBlog(page, 'testtitle', 'testauthor', 'testurl')
      await expect(page.getByText('testtitle testauthor')).toBeVisible()
    })
  })
})
