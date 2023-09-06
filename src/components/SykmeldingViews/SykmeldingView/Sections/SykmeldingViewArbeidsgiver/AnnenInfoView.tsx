import { ReactElement } from 'react'
import { InformationIcon } from '@navikt/aksel-icons'

import { SykmeldingGroup } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingFragment } from '../../../../../fetching/graphql.generated'
import { toReadableDate } from '../../../../../utils/dateUtils'
import { getBehandlerName } from '../../../../../utils/behandlerUtils'
import { SykmeldingInfo, SykmeldingMultilineInfo } from '../../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    sykmelding: SykmeldingFragment
}

function AnnenInfoView({ sykmelding }: Props): ReactElement {
    return (
        <SykmeldingGroup heading="Annen info" Icon={InformationIcon}>
            <SykmeldingInfo heading="Dato sykmeldingen ble skrevet">
                {toReadableDate(sykmelding.behandletTidspunkt)}
            </SykmeldingInfo>
            <SykmeldingMultilineInfo
                heading="Sykmeldingen ble skrevet av"
                lines={[
                    getBehandlerName(sykmelding.behandler),
                    sykmelding.behandler.tlf ? `Tlf: ${sykmelding.behandler.tlf}` : 'Tlf: —',
                ]}
            />
            {sykmelding.arbeidsgiver && sykmelding.arbeidsgiver?.navn && (
                <SykmeldingInfo heading="Arbeidsgiver som er oppgitt i sykmeldingen">
                    {sykmelding.arbeidsgiver.navn}
                </SykmeldingInfo>
            )}
        </SykmeldingGroup>
    )
}

export default AnnenInfoView
