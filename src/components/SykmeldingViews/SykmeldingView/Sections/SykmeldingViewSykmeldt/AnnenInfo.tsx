import React from 'react'
import { Information } from '@navikt/ds-icons'

import { SykmeldingGroup } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingFragment } from '../../../../../fetching/graphql.generated'
import { toReadableDate } from '../../../../../utils/dateUtils'
import { getBehandlerName } from '../../../../../utils/behandlerUtils'
import { SykmeldingInfo, SykmeldingMultilineInfo } from '../../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    sykmelding: SykmeldingFragment
}

function AnnenInfo({ sykmelding }: Props): JSX.Element {
    return (
        <SykmeldingGroup heading="Annen info" Icon={Information}>
            <SykmeldingInfo heading="Dato sykmeldingen ble skrevet" variant="blue">
                {toReadableDate(sykmelding.behandletTidspunkt)}
            </SykmeldingInfo>
            <SykmeldingMultilineInfo
                heading="Sykmeldingen ble skrevet av"
                variant="blue"
                lines={[
                    getBehandlerName(sykmelding.behandler),
                    sykmelding.behandler.tlf ? `Tlf: ${sykmelding.behandler.tlf}` : 'Tlf: —',
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
