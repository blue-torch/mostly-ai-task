import { Page, expect } from '@playwright/test'
import { PageObjectComponent } from '../types/PageObjectComponent'
import { MainPageSearchComponent } from './MainPageSearch.component'

export class MainPageNavigationComponent extends PageObjectComponent {
	$ = {
		platformButton: this.page.locator('[href*="/synthetic-data-platform"]').first(),
		syntheticDataButton: this.page.locator('[href*="/synthetic-data"]').first(),
		resourcesButton: this.page.locator('[href*="/resources"]').first(),
		companyButton: this.page.locator('li', { hasText: 'Company' }).first(),
		search: new MainPageSearchComponent(this.page)
	}

	constructor(page: Page) {
		super(page)
	}

	async verifyRequiredNavigationButtons(): Promise<void> {
		await expect(this.$.platformButton.isVisible()).toBeTruthy()
		await expect(this.$.syntheticDataButton.isVisible()).toBeTruthy()
		await expect(this.$.resourcesButton.isVisible()).toBeTruthy()
		await expect(this.$.companyButton.isVisible()).toBeTruthy()
	}
	async goToAboutUsPage(): Promise<void> {
		await this.$.companyButton.click() // 1st click only opens menu (no navigation)
		await this.$.companyButton.click()
	}
}
