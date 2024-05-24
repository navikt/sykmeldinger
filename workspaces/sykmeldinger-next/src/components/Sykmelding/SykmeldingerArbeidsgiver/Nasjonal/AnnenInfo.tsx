import { ReactElement } from 'react'
import { InformationIcon } from '@navikt/aksel-icons'

import { SykmeldingFragment } from 'queries'

import { SykmeldingGroup } from '../../../molecules/sykmelding/SykmeldingGroup'
import { toReadableDate } from '../../../../utils/dateUtils'
import { getBehandlerName } from '../../../../utils/behandlerUtils'
import { SykmeldingInfo, SykmeldingMultilineInfo } from '../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    sykmelding: SykmeldingFragment
    parentId: string
}

function AnnenInfo({ sykmelding, parentId }: Props): ReactElement {
    return (
        <SykmeldingGroup parentId={parentId} heading="Annen info" Icon={InformationIcon}>
            <SykmeldingInfo heading="Dato sykmeldingen ble skrevet">
                {toReadableDate(sykmelding.behandletTidspunkt)}
            </SykmeldingInfo>
            <SykmeldingMultilineInfo
                heading="Sykmeldingen ble skrevet av"
                lines={[
                    getBehandlerName(sykmelding.behandler),
                    sykmelding.behandler.tlf ? `Tlf: ${sykmelding.behandler.tlf}` : 'Tlf: mangler',
                ]}
            />
        </SykmeldingGroup>
    )
}

export default AnnenInfo
