import { ReactElement } from 'react'
import { ClockDashedIcon } from '@navikt/aksel-icons'

import { KontaktMedPasient } from '../../../../../fetching/graphql.generated'
import { toReadableDate } from '../../../../../utils/dateUtils'
import { SykmeldingGroup } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingInfo } from '../../../../molecules/sykmelding/SykmeldingInfo'

interface TilbakedateringViewProps {
    kontaktMedPasient: KontaktMedPasient
}

function TilbakedateringView({ kontaktMedPasient }: TilbakedateringViewProps): ReactElement | null {
    if (!kontaktMedPasient.kontaktDato) {
        return null
    }

    return (
        <SykmeldingGroup heading="Tilbakedatering" Icon={ClockDashedIcon}>
            <SykmeldingInfo heading="Dato for dokumenterbar kontakt med pasienten">
                {toReadableDate(kontaktMedPasient.kontaktDato)}
            </SykmeldingInfo>
        </SykmeldingGroup>
    )
}

export default TilbakedateringView
