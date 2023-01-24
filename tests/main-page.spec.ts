import { test, expect } from '@playwright/test'
import { MainPage } from './MainPage.page'

test.describe('Main Page', () => {
	let mainPage: MainPage

	test.beforeEach(async ({ page }) => {
		mainPage = new MainPage(page)
		await mainPage.load()
	})

	test('has visible bookmarks', async ({ page }) => {
		await mainPage.$.navigation.verifyRequiredNavigationButtons()

		// Temporary fix for bug in Playwright Framework
		//		locator.isVisible: Target closed
		// 		Test timeout of 180000ms exceeded while tearing down "context".
		await page.waitForTimeout(3000)
	})
})
