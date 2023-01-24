import { PageObject } from '../types/PageObject'
import { Page } from '@playwright/test'
import { AboutUsContactFormComponent } from './AboutUsContactForm.component'

const aboutUsPageUrl = 'https://mostly.ai/about-us/'
export class AboutUsPage extends PageObject {
	$ = {
		contactForm: new AboutUsContactFormComponent(this.page)
	}

	constructor(page: Page) {
		super(page, aboutUsPageUrl)
	}

	async waitForPageLoad(): Promise<void> {
		await this.$.contactForm.$.messageInput.waitFor({ state: 'visible' })
	}
}
