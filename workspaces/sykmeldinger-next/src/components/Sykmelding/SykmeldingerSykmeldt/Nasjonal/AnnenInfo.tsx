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
            <SykmeldingInfo heading="Dato sykmeldingen ble skrevet" variant="blue">
                {toReadableDate(sykmelding.behandletTidspunkt)}
            </SykmeldingInfo>
            <SykmeldingMultilineInfo
                heading="Sykmeldingen ble skrevet av"
                variant="blue"
                lines={[
                    getBehandlerName(sykmelding.behandler),
                    sykmelding.behandler.tlf ? `Tlf: ${sykmelding.behandler.tlf}` : 'Tlf: mangler',
                ]}
            />
            {sykmelding.arbeidsgiver && sykmelding.arbeidsgiver?.navn && (
                <SykmeldingInfo heading="Arbeidsgiver som er oppgitt i sykmeldingen" variant="blue">
                    {sykmelding.arbeidsgiver.navn}
                </SykmeldingInfo>
            )}
        </SykmeldingGroup>
    )
}

export default AnnenInfo
