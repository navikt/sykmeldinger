import { ReactElement } from 'react'
import { Calender } from '@navikt/ds-icons'
import * as R from 'remeda'

import { getPeriodTitle, getReadableLength } from '../../../../../utils/periodeUtils'
import { Periode, SvarUnion_DagerSvar_Fragment } from '../../../../../fetching/graphql.generated'
import { SykmeldingGroup } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { toReadableDate, toReadableDatePeriod } from '../../../../../utils/dateUtils'
import {
    SykmeldingInfo,
    SykmeldingInfoSubGroup,
    SykmeldingJaInfo,
    SykmeldingListInfo,
    SykmeldingMultilineInfo,
} from '../../../../molecules/sykmelding/SykmeldingInfo'

interface PeriodeViewProps {
    perioder: Periode[]
    /**
     * Egenmeldingsdager can either be the answer from a sykmelding, or the current values in the form.
     */
    egenmeldingsdager?: (SvarUnion_DagerSvar_Fragment | string[]) | null
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
            {egenmeldingsdager && <Egenmeldingsdager className="w-full" egenmeldingsdager={egenmeldingsdager} />}
        </SykmeldingGroup>
    )
}

interface EgenmeldingsdagerProps {
    className?: string
    egenmeldingsdager: SvarUnion_DagerSvar_Fragment | readonly string[]
}

function Egenmeldingsdager({ className, egenmeldingsdager }: EgenmeldingsdagerProps): ReactElement | null {
    const dager = R.pipe(
        egenmeldingsdager,
        (it) => ('dager' in it ? it.dager : it),
        R.sortBy((it) => it),
        R.map(toReadableDate),
    )

    if (dager.length === 0) {
        return null
    }

    return (
        <SykmeldingListInfo
            className={className}
            heading="Egenmeldingsdager (oppgitt av den sykmeldte)"
            texts={[...dager, `(${dager.length} dager)`]}
        />
    )
}

export default PeriodeView
