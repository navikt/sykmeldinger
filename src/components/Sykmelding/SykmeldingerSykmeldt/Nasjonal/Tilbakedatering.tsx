import { ReactElement } from 'react'
import { ClockDashedIcon } from '@navikt/aksel-icons'

import { KontaktMedPasient } from 'queries'

import { toReadableDate } from '../../../../utils/dateUtils'
import { SykmeldingGroup } from '../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingInfo } from '../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    kontaktMedPasient: KontaktMedPasient
    parentId: string
}

function Tilbakedatering({ kontaktMedPasient, parentId }: Props): ReactElement | null {
    if (!kontaktMedPasient.kontaktDato && !kontaktMedPasient.begrunnelseIkkeKontakt) {
        return null
    }

    return (
        <SykmeldingGroup parentId={parentId} heading="Tilbakedatering" Icon={ClockDashedIcon}>
            {kontaktMedPasient.kontaktDato != null && (
                <SykmeldingInfo heading="Dato for dokumenterbar kontakt med pasienten" variant="gray">
                    {toReadableDate(kontaktMedPasient.kontaktDato)}
                </SykmeldingInfo>
            )}
            {kontaktMedPasient.begrunnelseIkkeKontakt != null && (
                <SykmeldingInfo heading="Begrunnelse for tilbakedatering" variant="gray">
                    {kontaktMedPasient.begrunnelseIkkeKontakt}
                </SykmeldingInfo>
            )}
        </SykmeldingGroup>
    )
}

export default Tilbakedatering
