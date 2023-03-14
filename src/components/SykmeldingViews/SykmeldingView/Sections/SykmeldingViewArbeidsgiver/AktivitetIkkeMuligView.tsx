import { Office2 } from '@navikt/ds-icons'

import { AktivitetIkkeMuligPeriode } from '../../../../../fetching/graphql.generated'
import { arbeidsrelatertArsakToText } from '../../../../../utils/periodeUtils'
import { SykmeldingGroup } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingInfo, SykmeldingListInfo } from '../../../../molecules/sykmelding/SykmeldingInfo'

interface AktivitetIkkeMuligViewProps {
    aktivitetIkkeMulig: AktivitetIkkeMuligPeriode
}

const AktivitetIkkeMuligView = ({ aktivitetIkkeMulig }: AktivitetIkkeMuligViewProps): JSX.Element | null => {
    if (!aktivitetIkkeMulig.arbeidsrelatertArsak) return null

    return (
        <SykmeldingGroup heading="Aktivitet på arbeidsplassen" Icon={Office2}>
            <SykmeldingListInfo
                heading="Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
                texts={aktivitetIkkeMulig.arbeidsrelatertArsak.arsak.map(arbeidsrelatertArsakToText)}
            />
            {aktivitetIkkeMulig.arbeidsrelatertArsak.beskrivelse && (
                <SykmeldingInfo heading="Beskrivelse">
                    {aktivitetIkkeMulig.arbeidsrelatertArsak.beskrivelse}
                </SykmeldingInfo>
            )}
        </SykmeldingGroup>
    )
}

export default AktivitetIkkeMuligView
