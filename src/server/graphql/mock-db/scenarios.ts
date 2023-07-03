import { Sykmelding } from '../../api-models/sykmelding/Sykmelding'
import { Merknadtype, StatusEvent } from '../resolver-types.generated'

import { SykmeldingBuilder } from './data-creators'

type ScenarioCreator = () => Scenario

export type Scenario = {
    sykmeldinger: Sykmelding[]
}

const normal: ScenarioCreator = () => ({
    sykmeldinger: [
        new SykmeldingBuilder({ offset: 7 })
            .status(StatusEvent.APEN)
            .standardAktivitetIkkeMuligPeriode({ offset: 0, days: 7 })
            .build(),
        new SykmeldingBuilder({ offset: -45 })
            .status(StatusEvent.SENDT)
            .standardAktivitetIkkeMuligPeriode({ offset: 0, days: 7 })
            .build(),
        new SykmeldingBuilder({ offset: -65 })
            .status(StatusEvent.SENDT)
            .standardAktivitetIkkeMuligPeriode({ offset: 0, days: 14 })
            .build(),
    ],
})

const papirSykmelding: ScenarioCreator = () => ({
    sykmeldinger: [
        new SykmeldingBuilder({ offset: 7 })
            .standardAktivitetIkkeMuligPeriode()
            .papir()
            .status(StatusEvent.APEN)
            .build(),
        new SykmeldingBuilder({ offset: 7 })
            .standardAktivitetIkkeMuligPeriode()
            .papir()
            .status(StatusEvent.SENDT)
            .build(),
    ],
})

const utenlandsk: ScenarioCreator = () => ({
    sykmeldinger: [
        new SykmeldingBuilder({ offset: 7 })
            .standardAktivitetIkkeMuligPeriode()
            .utenlandsk()
            .status(StatusEvent.APEN)
            .build(),
        new SykmeldingBuilder({ offset: 14 })
            .standardAktivitetIkkeMuligPeriode()
            .utenlandsk()
            .papir()
            .status(StatusEvent.APEN)
            .build(),
        new SykmeldingBuilder({ offset: 21 })
            .standardAktivitetIkkeMuligPeriode()
            .utenlandsk()
            .papir()
            .status(StatusEvent.SENDT)
            .build(),
        new SykmeldingBuilder({ offset: 29 })
            .standardAktivitetIkkeMuligPeriode()
            .utenlandsk()
            .status(StatusEvent.SENDT)
            .build(),
    ],
})

const harUnderBehandling: ScenarioCreator = () => ({
    sykmeldinger: [
        ...normal().sykmeldinger,
        new SykmeldingBuilder({ offset: 7 })
            .status(StatusEvent.SENDT)
            .standardAktivitetIkkeMuligPeriode({ offset: 0, days: 7 })
            .merknader([{ type: Merknadtype.UNDER_BEHANDLING, beskrivelse: null }])
            .build(),
    ],
})

const mangeGamleSykmeldinger: ScenarioCreator = () => {
    const basicSykmelding = (offset: number): SykmeldingBuilder =>
        new SykmeldingBuilder({ offset: offset }).standardAktivitetIkkeMuligPeriode({ offset: 0, days: 14 })

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

export type Scenarios = keyof typeof scenariosWithDescriptions
const scenariosWithDescriptions = {
    normal: {
        description: 'En ny og et par innsendte (standard)',
        scenario: normal,
    },
    papirsykmelding: {
        description: 'En ny og en gammel papirsykmelding',
        scenario: papirSykmelding,
    },
    utenlandsk: {
        description: 'Utenlanske sykmeldinger',
        scenario: utenlandsk,
    },
    emptyState: {
        description: 'Ingen sykmeldinger',
        scenario: () => ({ sykmeldinger: [] }),
    },
    harUnderBehandling: {
        description: 'Har en innsendt under behandling',
        scenario: harUnderBehandling,
    },
    mangeGamleSykmeldinger: {
        description: 'Mange gamle sykmeldinger',
        scenario: mangeGamleSykmeldinger,
    },
} satisfies Record<string, { description: string; scenario: ScenarioCreator }>

export default scenariosWithDescriptions
