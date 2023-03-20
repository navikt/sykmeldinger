'use client'

import React from 'react'
import { groupBy } from 'remeda'
import { Accordion, BodyShort, Link } from '@navikt/ds-react'

import { SykmeldingFragment } from '../../fetching/graphql.generated'
import { isActiveSykmelding, isUnderbehandling } from '../../utils/sykmeldingUtils'
import SykmeldingLinkPanel from '../../components/SykmeldingLinkPanel/SykmeldingLinkPanel'
import InfoOmDigitalSykmelding from '../../components/InfoOmDigitalSykmelding/InfoOmDigitalSykmelding'

function ClientSykmeldingerList({ sykmeldinger }: { sykmeldinger: readonly SykmeldingFragment[] }): JSX.Element {
    const { underBehandling, apenSykmeldinger, pastSykmeldinger } = filterSykmeldinger(sykmeldinger)

    return (
        <div>
            <SykmeldingLinkPanel title="Under behandling" type="UNDER_BEHANDLING" sykmeldinger={underBehandling} />
            <SykmeldingLinkPanel title="Nye sykmeldinger" type="NYE_SYKMELDINGER" sykmeldinger={apenSykmeldinger} />

            <div className="mb-4">
                <InfoOmDigitalSykmelding />
            </div>

            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>Ser du ikke sykmeldingen din her?</Accordion.Header>
                    <Accordion.Content>
                        <div className="mb-4">
                            <BodyShort>
                                Det betyr at den som har sykmeldt deg ikke sender den digitalt til NAV. Da bruker du
                                papirsykmeldingen i stedet.
                            </BodyShort>
                        </div>

                        <Link href="https://www.helsedirektoratet.no/veiledere/sykmelderveileder/sykmelding-og-erklaeringer">
                            Mer informasjon om papirsykmelding finner du her.
                        </Link>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>

            <SykmeldingLinkPanel
                title="Tidligere sykmeldinger"
                type="TIDLIGERE_SYKMELDINGER"
                sykmeldinger={pastSykmeldinger}
            />
        </div>
    )
}

type SykmeldingSections = {
    apenSykmeldinger: SykmeldingFragment[]
    pastSykmeldinger: SykmeldingFragment[]
    underBehandling: SykmeldingFragment[]
}

const groupByPredicate = (sykmelding: SykmeldingFragment): keyof SykmeldingSections => {
    if (isUnderbehandling(sykmelding)) return 'underBehandling'
    else if (isActiveSykmelding(sykmelding)) return 'apenSykmeldinger'
    else return 'pastSykmeldinger'
}

function filterSykmeldinger(sykmeldinger: readonly SykmeldingFragment[]): SykmeldingSections {
    const grouped: Record<keyof SykmeldingSections, SykmeldingFragment[]> = groupBy(sykmeldinger, groupByPredicate)

    return {
        apenSykmeldinger: grouped.apenSykmeldinger ?? [],
        pastSykmeldinger: grouped.pastSykmeldinger ?? [],
        underBehandling: grouped.underBehandling ?? [],
    }
}

export default ClientSykmeldingerList
