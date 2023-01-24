import { test, expect } from '@playwright/test'
import { MainPage } from './MainPage.page'
import { addMarketingConsentCookie } from '../utils/utils'

test.describe('Main Page Search', () => {
	let mainPage: MainPage

	test.beforeEach(async ({ page }) => {
		mainPage = new MainPage(page)

		await addMarketingConsentCookie(page)
		await mainPage.load()
	})

	test('allows searching for not existing data', async ({ page }) => {
		const textWithTypo = 'sythetic'
		const search = mainPage.$.navigation.$.search
		await search.searchFor(textWithTypo)
		await search.validateNoResults(textWithTypo)

		// Temporary fix for bug in Playwright Framework
		//		locator.isVisible: Target closed
		// 		Test timeout of 180000ms exceeded while tearing down "context".
		await page.waitForTimeout(3000)
	})
})
