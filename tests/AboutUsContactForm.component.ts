import { Page, expect } from '@playwright/test'
import { PageObjectComponent } from '../types/PageObjectComponent'
export interface ContactFormData {
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
	company: string
	country: string
	howDidYouHearAboutUs: string
	marketingEmailsConsent: boolean
	message: string
}
export class AboutUsContactFormComponent extends PageObjectComponent {
	$ = {
		titleText: this.page.locator('h2', { hasText: 'Send us a message' }),
		firstNameInput: this.page.locator('input[name="firstname"]'),
		lastNameInput: this.page.locator('input[name="lastname"]'),
		emailInput: this.page.locator('input[type="email"]'),
		phoneInput: this.page.locator('input[name="mobilephone"]'),
		companyInput: this.page.locator('input[name="company"]'),
		countrySelect: this.page.locator('select[name="country"]'),
		howDidYouHearAboutUsSelect: this.page.locator('select[name="how_did_you_hear_about_mostly_ai_"]'),
		sendMarketingCommunicationConsentCheckbox: this.page.locator('input[name*="LEGAL_CONSENT"]'),
		messageInput: this.page.locator('[name="message"]'),
		submitButton: this.page.locator('input[type="submit"][value="SEND MESSAGE"]'),
		messageSentText: this.page.locator('.submitted-message')
	}

	constructor(page: Page) {
		super(page)
	}

	async scrollToForceLoadForm(): Promise<void> {
		await this.$.titleText.scrollIntoViewIfNeeded()
		await this.page.keyboard.press('ArrowDown')
	}

	async fillAndSend(data: ContactFormData): Promise<void> {
		await this.scrollToForceLoadForm()
		await this.$.firstNameInput.fill(data.firstName)
		await this.$.lastNameInput.fill(data.lastName)
		await this.$.emailInput.fill(data.email)
		await this.$.phoneInput.fill(data.phoneNumber)
		await this.$.companyInput.fill(data.company)
		await this.$.countrySelect.selectOption(data.country)
		await this.$.howDidYouHearAboutUsSelect.selectOption(data.howDidYouHearAboutUs)
		await this.$.messageInput.fill(data.message)
		if (data.marketingEmailsConsent) {
			await this.$.sendMarketingCommunicationConsentCheckbox.check()
		}
		await this.$.submitButton.hover()
	}

	async validateMessageIsSentTextVisible(): Promise<void> {
		await expect(this.$.messageSentText.isVisible()).toBeTruthy()
	}
}
