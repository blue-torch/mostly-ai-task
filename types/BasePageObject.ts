import { FrameLocator, Locator, Page } from '@playwright/test'

export type ParentElement = Locator | string
type LocatorFunction = (
	...args: never[]
) => Promise<Locator> | Locator | BasePageObject
type ElementType = Locator | Promise<Locator> | LocatorFunction | BasePageObject

export interface Object$ {
	[key: string]: ElementType
}

export class BasePageObject {
	$: Object$ // Place to store page elements
	readonly page: Page
	private readonly _parentElement: Locator | undefined

	constructor(page: Page, parentElement?: ParentElement) {
		this.page = page
		this._parentElement =
			typeof parentElement === 'string'
				? this.createLocator(parentElement)
				: parentElement
	}

	get parentElement(): Locator {
		if (!this._parentElement) {
			throw Error(
				`No "parentElement" provided in PageObject constructor. Either add it, or use "this.page" instead!`
			)
		}
		return this._parentElement
	}

	createLocator(selector: string) {
		return this.page.locator(selector)
	}
}
