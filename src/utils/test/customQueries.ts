import { within, Screen, FindByRole, GetByRole, ByRoleOptions } from './testUtils'

export function getByGroup<T extends HTMLElement = HTMLElement>(
    screen: Screen,
): (group: ByRoleOptions, radio: ByRoleOptions) => ReturnType<GetByRole<T>> {
    return (group, radio) => within(screen.getByRole('group', group)).getByRole('radio', radio)
}

export function findByGroup<T extends HTMLElement = HTMLElement>(
    screen: Screen,
): (group: ByRoleOptions, radio: ByRoleOptions) => ReturnType<FindByRole<T>> {
    return async (group, radio) => await within(await screen.findByRole('group', group)).findByRole('radio', radio)
}
