import './custom-matchers'

import { type Page } from '@playwright/test'

type ByRoleOptions = Parameters<Page['getByRole']>['1']

export function getRadioInGroup(page: Page) {
    return (group: ByRoleOptions, radio: ByRoleOptions) => page.getByRole('group', group).getByRole('radio', radio)
}

export function getCheckboxInGroup(page: Page) {
    return (group: ByRoleOptions, radio: ByRoleOptions) => page.getByRole('group', group).getByRole('checkbox', radio)
}

type CurriedAction = (page: Page) => Promise<void>

export function userInteractionsGroup(...actions: CurriedAction[]) {
    return async (page: Page): Promise<void> => {
        for (const action of actions) {
            await action(page)
        }
    }
}
