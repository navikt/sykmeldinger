import { Sykmelding } from '../../api-models/sykmelding/Sykmelding'
import { Merknadtype, StatusEvent } from '../resolver-types.generated'

import { SykmeldingBuilder } from './data-creators'

export type Scenarios = 'normal' | 'emptyState' | 'harUnderBehandling'

export type Scenario = {
    sykmeldinger: Sykmelding[]
}

type ScenarioCreator = () => Scenario

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

const emptyState: ScenarioCreator = () => ({
    sykmeldinger: [],
})

const scenarios: Record<Scenarios, () => Scenario> = {
    normal,
    emptyState,
    harUnderBehandling,
}

export default scenarios
