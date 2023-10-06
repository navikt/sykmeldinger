import { Sykmelding } from '../../api-models/sykmelding/Sykmelding'
import { Merknadtype, Periodetype, RegelStatus, StatusEvent } from '../resolver-types.generated'

import { SykmeldingBuilder } from './data-creators'

type ScenarioCreator = () => Scenario

export type Scenario = {
    sykmeldinger: Sykmelding[]
}

const normal: ScenarioCreator = () => ({
    sykmeldinger: [
        new SykmeldingBuilder({ offset: 7 }).status(StatusEvent.APEN).enkelPeriode({ offset: 0, days: 7 }).build(),
        new SykmeldingBuilder({ offset: -45 }).status(StatusEvent.SENDT).enkelPeriode({ offset: 0, days: 7 }).build(),
        new SykmeldingBuilder({ offset: -65 }).status(StatusEvent.SENDT).enkelPeriode({ offset: 0, days: 14 }).build(),
    ],
})

const gradertPeriode: ScenarioCreator = () => ({
    sykmeldinger: [
        new SykmeldingBuilder({ offset: 7 })
            .status(StatusEvent.APEN)
            .relativePeriode(
                {
                    type: Periodetype.GRADERT,
                    gradert: {
                        grad: 60,
                        reisetilskudd: false,
                    },
                },
                { offset: 0, days: 14 },
            )
            .build(),
    ],
})

const papirSykmelding: ScenarioCreator = () => ({
    sykmeldinger: [
        new SykmeldingBuilder({ offset: 7 }).enkelPeriode().papir().status(StatusEvent.APEN).build(),
        new SykmeldingBuilder({ offset: 7 }).enkelPeriode().papir().status(StatusEvent.SENDT).build(),
    ],
})

const utenlandsk: ScenarioCreator = () => ({
    sykmeldinger: [
        new SykmeldingBuilder({ offset: 7 }).enkelPeriode().utenlandsk().status(StatusEvent.APEN).build(),
        new SykmeldingBuilder({ offset: 14 }).enkelPeriode().utenlandsk().papir().status(StatusEvent.APEN).build(),
        new SykmeldingBuilder({ offset: 21 }).enkelPeriode().utenlandsk().papir().status(StatusEvent.SENDT).build(),
        new SykmeldingBuilder({ offset: 29 }).enkelPeriode().utenlandsk().status(StatusEvent.SENDT).build(),
    ],
})

const avbrutt: ScenarioCreator = () => ({
    sykmeldinger: [new SykmeldingBuilder({ offset: 7 }).enkelPeriode().status(StatusEvent.AVBRUTT).build()],
})

const avbruttEgenmelding: ScenarioCreator = () => ({
    sykmeldinger: [new SykmeldingBuilder({ offset: 7 }).egenmeldt().enkelPeriode().status(StatusEvent.AVBRUTT).build()],
})

const avvist: ScenarioCreator = () => ({
    sykmeldinger: [
        new SykmeldingBuilder({ offset: 7 })
            .enkelPeriode()
            .status(StatusEvent.APEN)
            .behandlingsutfall(RegelStatus.INVALID, [
                {
                    messageForSender: 'Sykmeldingen er tilbakedatert mer enn det som er tillat',
                    messageForUser: 'Sykmeldingen er tilbakedatert mer enn det som er tillat',
                    ruleName: 'tilbakedatering',
                    ruleStatus: RegelStatus.INVALID,
                },
            ])
            .build(),
        new SykmeldingBuilder({ offset: 7 })
            .enkelPeriode()
            .status(StatusEvent.BEKREFTET)
            .behandlingsutfall(RegelStatus.INVALID, [
                {
                    messageForSender: 'Sykmeldingen er tilbakedatert mer enn det som er tillat',
                    messageForUser: 'Sykmeldingen er tilbakedatert mer enn det som er tillat',
                    ruleName: 'tilbakedatering',
                    ruleStatus: RegelStatus.INVALID,
                },
            ])
            .build(),
    ],
})

const utgatt: ScenarioCreator = () => ({
    sykmeldinger: [new SykmeldingBuilder({ offset: 7 }).enkelPeriode().status(StatusEvent.UTGATT).build()],
})

const avvistData: ScenarioCreator = () => ({
    sykmeldinger: [
        new SykmeldingBuilder({ offset: 7 })
            .enkelPeriode()
            .status(StatusEvent.APEN)
            .behandlingsutfall(RegelStatus.INVALID, [
                {
                    messageForSender:
                        'Sykmeldingen kan ikke rettes, det må skrives en ny. Pasienten har fått beskjed om å vente på ny sykmelding fra deg. Grunnet følgende:Hvis sykmeldingsgrad er høyere enn 99% for delvis sykmelding avvises meldingen',
                    messageForUser: 'Sykmeldingsgraden kan ikke være mer enn 99% fordi det er en gradert sykmelding.',
                    ruleName: 'GRADERT_SYKMELDING_OVER_99_PROSENT',
                    ruleStatus: RegelStatus.INVALID,
                },
            ])
            .build(),
    ],
})

const avvist20Data: ScenarioCreator = () => ({
    sykmeldinger: [
        new SykmeldingBuilder({ offset: 7 })
            .relativePeriode(
                {
                    type: Periodetype.GRADERT,
                    gradert: {
                        grad: 14,
                        reisetilskudd: false,
                    },
                },
                { offset: 0, days: 14 },
            )
            .status(StatusEvent.APEN)
            .behandlingsutfall(RegelStatus.INVALID, [
                {
                    messageForSender:
                        'Sykmeldingen kan ikke rettes, det må skrives en ny. Pasienten har fått beskjed om å vente på ny sykmelding fra deg. Grunnet følgende:Hvis sykmeldingsgrad er høyere enn 99% for delvis sykmelding avvises meldingen',
                    messageForUser: 'Sykmeldingsgraden kan ikke være mer enn 99% fordi det er en gradert sykmelding.',
                    ruleName: 'GRADERT_UNDER_20_PROSENT',
                    ruleStatus: RegelStatus.INVALID,
                },
            ])
            .build(),
    ],
})

const egenmeldt: ScenarioCreator = () => ({
    sykmeldinger: [new SykmeldingBuilder({ offset: 7 }).enkelPeriode().status(StatusEvent.APEN).egenmeldt().build()],
})

const behandlingsdager: ScenarioCreator = () => ({
    sykmeldinger: [
        new SykmeldingBuilder({ offset: 7 })
            .relativePeriode({ type: Periodetype.BEHANDLINGSDAGER, behandlingsdager: 1 }, { offset: 0, days: 1 })
            .status(StatusEvent.APEN)
            .build(),
    ],
})

const avventene: ScenarioCreator = () => ({
    sykmeldinger: [
        new SykmeldingBuilder({ offset: 7 })
            .relativePeriode(
                { type: Periodetype.AVVENTENDE, tilrettelegging: 'Bedre transport til jobb' },
                { offset: 0, days: 7 },
            )
            .status(StatusEvent.APEN)
            .egenmeldt()
            .build(),
    ],
})

const reisetilskudd: ScenarioCreator = () => ({
    sykmeldinger: [
        new SykmeldingBuilder({ offset: 7 })
            .relativePeriode({ type: Periodetype.REISETILSKUDD }, { offset: 0, days: 7 })
            .status(StatusEvent.APEN)
            .egenmeldt()
            .build(),
    ],
})

const harUnderBehandling: ScenarioCreator = () => ({
    sykmeldinger: [
        ...normal().sykmeldinger,
        new SykmeldingBuilder({ offset: 7 })
            .status(StatusEvent.SENDT)
            .enkelPeriode({ offset: 0, days: 7 })
            .merknader([{ type: Merknadtype.UNDER_BEHANDLING, beskrivelse: null }])
            .build(),
    ],
})

const mangeGamleSykmeldinger: ScenarioCreator = () => {
    const basicSykmelding = (offset: number): SykmeldingBuilder =>
        new SykmeldingBuilder({ offset: offset }).enkelPeriode({ offset: 0, days: 14 })

    return {
        sykmeldinger: [
            basicSykmelding(-31).status(StatusEvent.BEKREFTET).build(),
            basicSykmelding(-60).status(StatusEvent.SENDT).build(),
            basicSykmelding(-70).status(StatusEvent.AVBRUTT).build(),
            basicSykmelding(-90).status(StatusEvent.UTGATT).build(),
            basicSykmelding(-120).status(StatusEvent.SENDT).build(),
            basicSykmelding(-150).status(StatusEvent.AVBRUTT).build(),
            basicSykmelding(-170).status(StatusEvent.SENDT).build(),
            basicSykmelding(-190).status(StatusEvent.SENDT).build(),
            basicSykmelding(-210).status(StatusEvent.SENDT).build(),
            basicSykmelding(-365).status(StatusEvent.SENDT).build(),
            basicSykmelding(-390).status(StatusEvent.SENDT).build(),
            basicSykmelding(-1460).status(StatusEvent.SENDT).build(),
            basicSykmelding(-1825).status(StatusEvent.SENDT).build(),
            basicSykmelding(-2282).status(StatusEvent.SENDT).build(),
        ],
    }
}

export type Scenarios = keyof typeof simpleScenarios | keyof typeof otherScenarios | keyof typeof e2eScenarios
export const simpleScenarios = {
    normal: {
        description: 'En ny og et par innsendte (standard)',
        scenario: normal,
    },
    gradertPeriode: {
        description: 'En åpen sykmelding med gradert periode',
        scenario: gradertPeriode,
    },
    behandlingsdager: {
        description: 'En åpen sykmelding med behandlingsdager',
        scenario: behandlingsdager,
    },
    avventene: {
        description: 'En åpen sykmelding med avventende periode',
        scenario: avventene,
    },
    reisetilskudd: {
        description: 'En åpen sykmelding med reisetilskudd',
        scenario: reisetilskudd,
    },
    papirsykmelding: {
        description: 'En ny og en gammel papirsykmelding',
        scenario: papirSykmelding,
    },
    emptyState: {
        description: 'Ingen sykmeldinger',
        scenario: () => ({ sykmeldinger: [] }),
    },
} satisfies Record<string, { description: string; scenario: ScenarioCreator }>

export const otherScenarios = {
    utenlandsk: {
        description: 'Utenlanske sykmeldinger',
        scenario: utenlandsk,
    },
    egenmeldt: {
        description: 'Egenmeldt sykmelding',
        scenario: egenmeldt,
    },
    mangeGamleSykmeldinger: {
        description: 'Mange gamle sykmeldinger',
        scenario: mangeGamleSykmeldinger,
    },
    avbrutt: {
        description: 'Èn avbrutt sykmelding',
        scenario: avbrutt,
    },
    avbruttEgenmelding: {
        description: 'Èn avbrutt egenmelding',
        scenario: avbruttEgenmelding,
    },
    harUnderBehandling: {
        description: 'Har en innsendt under behandling',
        scenario: harUnderBehandling,
    },
    avvist: {
        description: 'Avvist grunnet tilbakedatering (med bekreftet)',
        scenario: avvist,
    },
    avvistData: {
        description: 'Avvist grunnet ugyldig data',
        scenario: avvistData,
    },
    avvist20Data: {
        description: 'Avvist grunnet under 20%',
        scenario: avvist20Data,
    },
    utgatt: {
        description: 'Utgått sykmelding',
        scenario: utgatt,
    },
} satisfies Record<string, { description: string; scenario: ScenarioCreator }>

export const e2eScenarios = {
    buttAgainstAvventende: {
        description: 'En sendte sykmelding kant i kant med en tidligere sykmelding med AVVENTENDE periode',
        scenario: () => ({
            sykmeldinger: [
                new SykmeldingBuilder({ offset: -14 })
                    .relativePeriode(
                        {
                            type: Periodetype.AVVENTENDE,
                            tilrettelegging: 'Eksempel på tilrettelegging',
                        },
                        { offset: 0, days: 7 },
                    )
                    .status(StatusEvent.SENDT)
                    .build(),
                new SykmeldingBuilder({ offset: -7 })
                    .enkelPeriode({ offset: 1, days: 7 })
                    .status(StatusEvent.SENDT)
                    .build(),
            ],
        }),
    },
    buttAgainstGradert: {
        description: 'En sendte sykmelding kant i kant med en tidligere sykmelding med gradert periode',
        scenario: () => ({
            sykmeldinger: [
                new SykmeldingBuilder({ offset: -14 })
                    .relativePeriode(
                        {
                            type: Periodetype.GRADERT,
                            gradert: { grad: 60, reisetilskudd: false },
                        },
                        { offset: 0, days: 7 },
                    )
                    .status(StatusEvent.SENDT)
                    .build(),
                new SykmeldingBuilder({ offset: -7 })
                    .enkelPeriode({ offset: 1, days: 7 })
                    .status(StatusEvent.SENDT)
                    .build(),
            ],
        }),
    },
} satisfies Record<string, { description: string; scenario: ScenarioCreator }>

export function isValidScenario(scenario: string | null | undefined): scenario is Scenarios {
    if (scenario == null) return false

    return Object.keys(scenarios).includes(scenario)
}

export const scenarios = { ...simpleScenarios, ...otherScenarios, ...e2eScenarios }
