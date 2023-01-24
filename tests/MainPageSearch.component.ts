import { Page, expect } from '@playwright/test'
import { PageObjectComponent } from '../types/PageObjectComponent'

export class MainPageSearchComponent extends PageObjectComponent {
	$ = {
		openSearchButton: this.page.locator('button[aria-label="Open search"]'),
		searchInput: this.page.locator('input[type="search"]'),
		closeSearchButton: this.page.locator('button[aria-label="Close search"]'),
		noResultsText: this.page.locator('h1', { hasText: 'Sorry, no results for:' })
	}

	constructor(page: Page) {
		super(page)
	}

	async searchFor(text: string): Promise<void> {
		await this.$.openSearchButton.click()
		await this.$.searchInput.fill(text)
		await this.page.keyboard.press('Enter')
	}
	async validateNoResults(text: string): Promise<void> {
		await this.$.noResultsText.scrollIntoViewIfNeeded()
		await expect(this.$.noResultsText.isVisible()).toBeTruthy()
		await expect(this.page.locator('h1', { hasText: text }).isVisible()).toBeTruthy()
	}
}
