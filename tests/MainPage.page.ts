import { PageObject } from '../types/PageObject'
import { Page } from '@playwright/test'
import { MainPageNavigationComponent } from './MainPageNavigation.component'

const mainPageUrl = 'https://mostly.ai'
export class MainPage extends PageObject {
	$ = {
		navigation: new MainPageNavigationComponent(this.page)
	}

	constructor(page: Page) {
		super(page, mainPageUrl)
	}

	async waitForPageLoad(): Promise<void> {
		await this.$.navigation.$.platformButton.waitFor({ state: 'visible' })
	}
}
