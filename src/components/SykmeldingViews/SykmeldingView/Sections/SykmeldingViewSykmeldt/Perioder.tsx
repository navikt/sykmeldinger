import { Calender } from '@navikt/ds-icons'

import { getPeriodTitle, getReadableLength } from '../../../../../utils/periodeUtils'
import { Periode } from '../../../../../fetching/graphql.generated'
import { SykmeldingGroup } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { toReadableDatePeriod } from '../../../../../utils/dateUtils'
import {
    SykmeldingInfo,
    SykmeldingInfoSubGroup,
    SykmeldingJaInfo,
    SykmeldingMultilineInfo,
} from '../../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    perioder: Periode[]
    isV3: boolean
}

function Perioder({ perioder, isV3 }: Props): JSX.Element {
    return (
        <SykmeldingGroup heading="Perioder (f.o.m. - t.o.m.)" Icon={Calender} wrap>
            {perioder.map((periode, index) => (
                <SykmeldingInfoSubGroup key={index} variant="blue">
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
                        <SykmeldingJaInfo
                            heading={
                                isV3
                                    ? 'Pasienten kan være delvis i arbeid ved bruk av reisetilskudd'
                                    : 'Kan pasienten være i delvis arbeid ved bruk av reisetilskudd?'
                            }
                        />
                    )}
                </SykmeldingInfoSubGroup>
            ))}
        </SykmeldingGroup>
    )
}

export default Perioder
