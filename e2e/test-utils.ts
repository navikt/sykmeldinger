import './custom-matchers'

import { type Page } from '@playwright/test'

type ByRoleOptions = Parameters<Page['getByRole']>['1']

export function getRadioInGroup(page: Page) {
    return (group: ByRoleOptions, radio: ByRoleOptions) => page.getByRole('group', group).getByRole('radio', radio)
}

export function getCheckboxInGroup(page: Page) {
    return (group: ByRoleOptions, radio: ByRoleOptions) => page.getByRole('group', group).getByRole('checkbox', radio)
}
