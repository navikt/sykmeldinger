import { IToggle } from '@unleash/nextjs'

export type ExpectedToggles = (typeof EXPECTED_TOGGLES)[number]
export const EXPECTED_TOGGLES = ['SYKMELDINGER_FLEXJAR_KVITTERING', 'SYKMELDINGER_NEW_ROUTES'] as const

export function getFlag(name: ExpectedToggles, toggles: IToggle[]): IToggle {
    const toggle = toggles.find((toggle) => toggle.name === name)

    if (toggle == null) {
        return { name, enabled: false, impressionData: false, variant: { name: 'disabled', enabled: false } }
    }

    return toggle
}
