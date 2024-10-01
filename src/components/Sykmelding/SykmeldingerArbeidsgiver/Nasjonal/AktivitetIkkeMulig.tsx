import { ReactElement } from 'react'
import { Buildings2Icon } from '@navikt/aksel-icons'

import { AktivitetIkkeMuligPeriode } from 'queries'

import { arbeidsrelatertArsakToText } from '../../../../utils/periodeUtils'
import { SykmeldingGroup } from '../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingInfo, SykmeldingInfoMissing, SykmeldingListInfo } from '../../../molecules/sykmelding/SykmeldingInfo'

interface AktivitetIkkeMuligViewProps {
    aktivitetIkkeMulig: AktivitetIkkeMuligPeriode
    parentId: string
}

const AktivitetIkkeMulig = ({ aktivitetIkkeMulig, parentId }: AktivitetIkkeMuligViewProps): ReactElement | null => {
    return (
        <SykmeldingGroup parentId={parentId} heading="Aktivitet på arbeidsplassen" Icon={Buildings2Icon}>
            {aktivitetIkkeMulig.arbeidsrelatertArsak ? (
                <>
                    <SykmeldingListInfo
                        heading="Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
                        texts={aktivitetIkkeMulig.arbeidsrelatertArsak.arsak.map(arbeidsrelatertArsakToText)}
                    />
                    {aktivitetIkkeMulig.arbeidsrelatertArsak.beskrivelse && (
                        <SykmeldingInfo heading="Beskrivelse">
                            {aktivitetIkkeMulig.arbeidsrelatertArsak.beskrivelse}
                        </SykmeldingInfo>
                    )}
                </>
            ) : (
                <SykmeldingInfoMissing
                    heading="Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
                    text="Ikke utfylt av behandler"
                />
            )}
        </SykmeldingGroup>
    )
}

export default AktivitetIkkeMulig
