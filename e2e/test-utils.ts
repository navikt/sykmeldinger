import './custom-matchers'

import { expect, type Page } from '@playwright/test'
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
