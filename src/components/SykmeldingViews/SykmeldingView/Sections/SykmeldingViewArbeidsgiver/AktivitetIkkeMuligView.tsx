import { ReactElement } from 'react'
import { Buldings2Icon } from '@navikt/aksel-icons'

import { AktivitetIkkeMuligPeriode } from 'queries'

import { arbeidsrelatertArsakToText } from '../../../../../utils/periodeUtils'
import { SykmeldingGroup } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingInfo, SykmeldingListInfo } from '../../../../molecules/sykmelding/SykmeldingInfo'

interface AktivitetIkkeMuligViewProps {
    aktivitetIkkeMulig: AktivitetIkkeMuligPeriode
    parentId: string
}

const AktivitetIkkeMuligView = ({ aktivitetIkkeMulig, parentId }: AktivitetIkkeMuligViewProps): ReactElement | null => {
    if (!aktivitetIkkeMulig.arbeidsrelatertArsak) return null

    return (
        <SykmeldingGroup parentId={parentId} heading="Aktivitet på arbeidsplassen" Icon={Buldings2Icon}>
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
