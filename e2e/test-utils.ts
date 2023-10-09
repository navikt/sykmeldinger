import { expect, type Page, type Locator } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

type ByRoleOptions = Parameters<Page['getByRole']>['1']

export function getRadioInGroup(page: Page) {
    return (group: ByRoleOptions, radio: ByRoleOptions) => page.getByRole('group', group).getByRole('radio', radio)
}

export function getCheckboxInGroup(page: Page) {
    return (group: ByRoleOptions, radio: ByRoleOptions) => page.getByRole('group', group).getByRole('checkbox', radio)
}

export async function expectNoAxeViolations(page: Page): Promise<void> {
    const results = await new AxeBuilder({ page }).analyze()

    expect(results.violations).toEqual([])
}

export function expectNotToHaveDescriptiveText() {
    return async (locator: Locator): Promise<void> => {
        const describedId = await locator.getAttribute('aria-describedby')
        expect(describedId).toBeNull()
    }
}

export function expectToHaveDescriptiveText(page: Page) {
    return async (locator: Locator, expectedText: string): Promise<void> => {
        const describedId = await locator.getAttribute('aria-describedby')
        expect(describedId).not.toBeNull()
        await expect(page.locator(`#${describedId}`)).toHaveText(expectedText)
    }
}

export function setArbeidsgivereCount(page: Page) {
    return async (count: number): Promise<void> => {
        await page.evaluate((value) => {
            return window.playwrightDevtools?.setArbeidsgivereCount(value)
        }, count)
        await expect(page.getByTestId('playwright-devtools')).toHaveAttribute('data-is-loading', 'false', {
            timeout: 5000,
        })
    }
}

export async function setStrengtFortroligAdresse(page: Page): Promise<void> {
    await page.evaluate(() => {
        return window.playwrightDevtools?.setStrengtFortroligAdresse()
    })
    await expect(page.getByTestId('playwright-devtools')).toHaveAttribute('data-is-loading', 'false', {
        timeout: 5000,
    })
}
