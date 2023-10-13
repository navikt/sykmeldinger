import { ReactElement } from 'react'
import { TasklistIcon } from '@navikt/aksel-icons'

import { StatusEvent, SykmeldingFragment, SykmeldingStatusFragment, YesOrNo } from '../../../fetching/graphql.generated'
import { SykmeldingGroup } from '../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingInfo, SykmeldingListInfo } from '../../molecules/sykmelding/SykmeldingInfo'
import { arbeidsSituasjonEnumToText } from '../../../utils/sporsmal'
import { toReadableDate, toReadableDatePeriod } from '../../../utils/dateUtils'

type Props = {
    sykmelding: SykmeldingFragment
}

function SykmeldingDineSvar({ sykmelding }: Props): ReactElement {
    const svarType = sykmelding.sykmeldingStatus.statusEvent === StatusEvent.BEKREFTET ? 'bekreftet' : 'sendte'

    return (
        <div className="mt-4">
            <SykmeldingGroup
                parentId="sykmelding-dine-svar"
                heading={`Det du svarte når du ${svarType} sykmeldingen`}
                Icon={TasklistIcon}
            >
                {sykmelding.sykmeldingStatus.sporsmalOgSvarListe.map(sporsmalToSection)}
            </SykmeldingGroup>
        </div>
    )
}

function sporsmalToSection(sporsmal: SykmeldingStatusFragment['sporsmalOgSvarListe'][number]): ReactElement | null {
    switch (sporsmal.svar.__typename) {
        case 'ArbeidssituasjonSvar':
            return (
                <SykmeldingInfo heading="Arbeidssituasjon" variant="gray">
                    {arbeidsSituasjonEnumToText(sporsmal.svar.arbeidsituasjon)}
                </SykmeldingInfo>
            )
        case 'DagerSvar':
            if (sporsmal.svar.dager.length === 0) return null

            return (
                <SykmeldingListInfo
                    heading="Egenmeldingsdager"
                    texts={[
                        ...[...sporsmal.svar.dager].sort().map(toReadableDate),
                        `(${sporsmal.svar.dager.length} dager)`,
                    ]}
                    variant="gray"
                />
            )
        case 'JaNeiSvar':
            return (
                <SykmeldingInfo heading={sporsmal.tekst} variant="gray">
                    {sporsmal.svar.jaNei === YesOrNo.YES ? 'Ja' : 'Nei'}
                </SykmeldingInfo>
            )
        case 'PerioderSvar':
            return (
                <SykmeldingListInfo
                    heading="Egenmeldingsdager"
                    texts={[...sporsmal.svar.perioder].sort().map((it) => toReadableDatePeriod(it.fom, it.tom))}
                    variant="gray"
                />
            )
    }
}

export default SykmeldingDineSvar
