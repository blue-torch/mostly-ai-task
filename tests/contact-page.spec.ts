import { test } from '@playwright/test'
import { MainPage } from './MainPage.page'
import { AboutUsContactFormComponent, ContactFormData } from './AboutUsContactForm.component'
import { addMarketingConsentCookie } from '../utils/utils'

test.describe('Contact Page', () => {
	let mainPage: MainPage
	let contactForm: AboutUsContactFormComponent

	test.beforeEach(async ({ page, context }) => {
		mainPage = new MainPage(page)
		contactForm = new AboutUsContactFormComponent(page)

		await addMarketingConsentCookie(page)
		await mainPage.load()
		await mainPage.$.navigation.goToAboutUsPage()
	})

	test('allows contacting us via form', async ({ page }) => {
		const contactFormData: ContactFormData = {
			firstName: 'Martin',
			lastName: 'Certyk',
			email: 'matrincertyk@domain.com',
			phoneNumber: '111-222-3333',
			company: 'Paramount',
			country: 'United States',
			howDidYouHearAboutUs: 'Facebook',
			marketingEmailsConsent: true,
			message: 'I would like to learn more.'
		}
		await contactForm.fillAndSend(contactFormData)
		await contactForm.validateMessageIsSentTextVisible()

		// Temporary fix for bug in Playwright Framework
		// 		locator.isVisible: Target closed
		// 		Test timeout of 180000ms exceeded while tearing down "context".
		await page.waitForTimeout(3000)
	})
})
