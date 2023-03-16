import { Calender } from '@navikt/ds-icons'

import { getPeriodTitle, getReadableLength } from '../../../../../utils/periodeUtils'
import { Periode, SvarUnion_DagerSvar_Fragment } from '../../../../../fetching/graphql.generated'
import { SykmeldingGroup } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { toReadableDate, toReadableDatePeriod } from '../../../../../utils/dateUtils'
import { isEgenmeldingsdagerEnabled } from '../../../../../utils/env'
import {
    SykmeldingInfo,
    SykmeldingInfoSubGroup,
    SykmeldingJaInfo,
    SykmeldingListInfo,
    SykmeldingMultilineInfo,
} from '../../../../molecules/sykmelding/SykmeldingInfo'

interface PeriodeViewProps {
    perioder: Periode[]
    egenmeldingsdager?: SvarUnion_DagerSvar_Fragment | null
}

function PeriodeView({ perioder, egenmeldingsdager }: PeriodeViewProps): JSX.Element {
    return (
        <SykmeldingGroup heading="Perioder (f.o.m. - t.o.m.)" Icon={Calender} wrap>
            {perioder.map((periode, index) => (
                <SykmeldingInfoSubGroup key={index}>
                    <SykmeldingMultilineInfo
                        heading={getPeriodTitle(periode)}
                        lines={[toReadableDatePeriod(periode.fom, periode.tom), getReadableLength(periode)]}
                    />
                    {!!periode.innspillTilArbeidsgiver && (
                        <SykmeldingInfo heading="Innspill til arbeidsgiver om tilrettelegging">
                            {periode.innspillTilArbeidsgiver}
                        </SykmeldingInfo>
                    )}
                    {periode.gradert?.reisetilskudd && (
                        <SykmeldingJaInfo heading="Kan pasienten være i delvis arbeid ved bruk av reisetilskudd?" />
                    )}
                </SykmeldingInfoSubGroup>
            ))}
            {isEgenmeldingsdagerEnabled() && egenmeldingsdager && (
                <Egenmeldingsdager egenmeldingsdager={egenmeldingsdager} />
            )}
        </SykmeldingGroup>
    )
}

interface EgenmeldingsdagerProps {
    egenmeldingsdager: SvarUnion_DagerSvar_Fragment
}

function Egenmeldingsdager({ egenmeldingsdager }: EgenmeldingsdagerProps): JSX.Element {
    return (
        <SykmeldingListInfo
            heading="Egenmeldingsdager (oppgitt av den sykmeldte)"
            texts={[
                ...[...egenmeldingsdager.dager].sort().map(toReadableDate),
                `(${egenmeldingsdager.dager.length} dager)`,
            ]}
        />
    )
}

export default PeriodeView
