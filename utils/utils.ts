import { Page } from '@playwright/test'
import { MainPage } from '../tests/MainPage.page'

export const addMarketingConsentCookie = async (page: Page) => {
	const mainPage = new MainPage(page)
	await mainPage.load()
	await page.context().addCookies([
		{
			name: 'borlabs-cookie',
			value: '%7B%22consents%22%3A%7B%22essential%22%3A%5B%22borlabs-cookie%22%2C%22google-tag-manager%22%5D%7D%2C%22domainPath%22%3A%22mostly.ai%2F%22%2C%22expires%22%3A%22Tue%2C%2025%20Jul%202023%2018%3A06%3A39%20GMT%22%2C%22uid%22%3A%22anonymous%22%2C%22version%22%3A%221%22%7D',
			domain: '.mostly.ai',
			path: '/'
		}
	])
}
