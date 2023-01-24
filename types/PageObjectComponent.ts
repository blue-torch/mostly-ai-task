import { Page } from '@playwright/test'
import { BasePageObject, ParentElement, Object$ } from './BasePageObject'

export abstract class PageObjectComponent extends BasePageObject {
	abstract $: Object$

	protected constructor(page: Page, parentElement?: ParentElement) {
		super(page, parentElement)
	}
}
