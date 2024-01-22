import { capitalizeFirstLetter } from './stringUtils'

const shouldUpperCase = [
    'SFO',
    'AS',
    'ASA',
    'NAV',
    'SA',
    'HF',
    'BUP',
    'VVS',
    'KF',
    'IKS',
    'DNB',
    'DNV',
    'A/S',
    'DA',
    'DPS',
]

const shouldLowerCase = [
    'skole',
    'skule',
    'ungdomsskole',
    'kommune',
    'barneskole',
    'barnehage',
    'avd',
    'avdeling',
    'og',
    'i',
    'lager',
    'universitetssykehus',
    'omsorgssenter',
    'fakultet',
    'entreprenør',
    'legevakt',
    'sykehjem',
    'videregående',
]

function handleCase(word: string): string {
    if (shouldUpperCase.includes(word.toUpperCase())) {
        return word.toUpperCase()
    }
    if (shouldLowerCase.includes(word.toLowerCase())) {
        return word.toLowerCase()
    }
    return capitalizeFirstLetter(word)
}

export function prettifyOrgName(name: string): string {
    return name
        .replace(/,(?!\s)/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .split(' ')
        .map((word) => word.toLowerCase())
        .map((word) => {
            if (word.includes('/')) {
                return word.split('/').map(handleCase).join('/')
            }

            return handleCase(word)
        })
        .join(' ')
}
