import { ReactElement } from 'react'
import { Buildings2Icon } from '@navikt/aksel-icons'

import { AktivitetIkkeMuligPeriode } from 'queries'

import { arbeidsrelatertArsakToText, medisinskArsakToText } from '../../../../utils/periodeUtils'
import { SykmeldingGroup } from '../../../molecules/sykmelding/SykmeldingGroup'
import {
    SykmeldingInfo,
    SykmeldingInfoMissing,
    SykmeldingInfoSubGroup,
    SykmeldingListInfo,
} from '../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    aktivitetIkkeMulig: AktivitetIkkeMuligPeriode
    isV3: boolean
    parentId: string
}

const AktivitetIkkeMulig = ({ aktivitetIkkeMulig, isV3, parentId }: Props): ReactElement | null => {
    return (
        <SykmeldingGroup parentId={parentId} heading="Aktivitet på arbeidsplassen" Icon={Buildings2Icon}>
            {aktivitetIkkeMulig.medisinskArsak != null && (
                <SykmeldingInfoSubGroup variant="gray">
                    <SykmeldingListInfo
                        heading="Medisinske årsaker hindrer arbeidsrelatert aktivitet"
                        texts={aktivitetIkkeMulig.medisinskArsak.arsak.map((it) => medisinskArsakToText(it, isV3))}
                    />
                    {aktivitetIkkeMulig.medisinskArsak?.beskrivelse && (
                        <SykmeldingInfo heading="Beskrivelse">
                            {aktivitetIkkeMulig.medisinskArsak.beskrivelse}
                        </SykmeldingInfo>
                    )}
                </SykmeldingInfoSubGroup>
            )}
            {aktivitetIkkeMulig.arbeidsrelatertArsak ? (
                <SykmeldingInfoSubGroup variant="gray">
                    <SykmeldingListInfo
                        heading="Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
                        texts={aktivitetIkkeMulig.arbeidsrelatertArsak.arsak.map(arbeidsrelatertArsakToText)}
                    />
                    {aktivitetIkkeMulig.arbeidsrelatertArsak?.beskrivelse != null && (
                        <SykmeldingInfo heading="Beskrivelse">
                            {aktivitetIkkeMulig.arbeidsrelatertArsak.beskrivelse}
                        </SykmeldingInfo>
                    )}
                </SykmeldingInfoSubGroup>
            ) : (
                <SykmeldingInfoMissing
                    heading="Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
                    text="Ikke utfylt av behandler"
                    variant="gray"
                />
            )}
        </SykmeldingGroup>
    )
}

export default AktivitetIkkeMulig
