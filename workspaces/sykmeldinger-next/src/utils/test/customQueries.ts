import { within, Screen, FindByRole, GetByRole, ByRoleOptions, ByRoleMatcher } from './testUtils'

export function getRadioInGroup<T extends HTMLElement = HTMLElement>(
    screen: Screen,
): (role: ByRoleMatcher) => (group: ByRoleOptions, radio: ByRoleOptions) => ReturnType<GetByRole<T>> {
    return (role) => (group, radio) => within(screen.getByRole('group', group)).getByRole(role, radio)
}

export function findRadioInGroup<T extends HTMLElement = HTMLElement>(
    screen: Screen,
): (group: ByRoleOptions, radio: ByRoleOptions) => ReturnType<FindByRole<T>> {
    return async (group, radio) => await within(await screen.findByRole('group', group)).findByRole('radio', radio)
}
