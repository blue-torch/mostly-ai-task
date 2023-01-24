import { BasePageObject, Object$, ParentElement } from './BasePageObject'
import { Page } from '@playwright/test'

interface GoToOptions {
	referer?: string
	timeout?: number
	waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit'
}

export abstract class PageObject extends BasePageObject {
	abstract $: Object$

	protected constructor(
		page: Page,
		public url: string,
		parentElement?: ParentElement
	) {
		super(page, parentElement)
	}

	async load(options?: GoToOptions): Promise<PageObject> {
		return await this.loadPage(options)
	}

	private async loadPage(goToOptions?: GoToOptions) {
		await this.page.goto(this.url, goToOptions)
		await this.waitForPageLoad()
		return this
	}

	abstract waitForPageLoad(): Promise<void>
}
