import React from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'
import { Information } from '@navikt/ds-icons'

import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading'
import { SykmeldingFragment } from '../../../../../fetching/graphql.generated'
import { toReadableDate } from '../../../../../utils/dateUtils'
import { getBehandlerName } from '../../../../../utils/behandlerUtils'

interface Props {
    sykmelding: SykmeldingFragment
}

function AnnenInfoView({ sykmelding }: Props): JSX.Element {
    return (
        <div>
            <SykmeldtHeading title="Annen info" Icon={Information} />
            <div className="p-4">
                <Heading size="xsmall" level="4" spacing>
                    Dato sykmeldingen ble skrevet
                </Heading>
                <BodyShort size="small">{toReadableDate(sykmelding.behandletTidspunkt)}</BodyShort>
            </div>
            <div className="p-4">
                <Heading size="xsmall" level="4" spacing>
                    Sykmeldingen ble skrevet av
                </Heading>
                <BodyShort size="small" spacing>
                    {getBehandlerName(sykmelding.behandler)}
                </BodyShort>
                <BodyShort size="small">
                    {sykmelding.behandler.tlf ? `Tlf: ${sykmelding.behandler.tlf}` : 'Tlf: —'}
                </BodyShort>
            </div>

            {sykmelding.arbeidsgiver && sykmelding.arbeidsgiver?.navn && (
                <div className="p-4">
                    <Heading size="xsmall" level="4" spacing>
                        Arbeidsgiver som er oppgitt i sykmeldingen
                    </Heading>
                    <BodyShort size="small">{sykmelding.arbeidsgiver.navn}</BodyShort>
                </div>
            )}
        </div>
    )
}

export default AnnenInfoView
