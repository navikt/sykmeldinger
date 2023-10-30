import { ReactElement } from 'react'
import { Alert, Detail, Heading } from '@navikt/ds-react'

import { SykmeldingFragment } from '../../../../fetching/graphql.generated'
import { toReadableDate } from '../../../../utils/dateUtils'
import SykmeldingSykmeldtContainer from '../../SykmeldingView/SykmeldingSykmeldtContainer'

interface OkUtgattSykmeldingProps {
    sykmelding: SykmeldingFragment
}

function OkUtgattSykmelding({ sykmelding }: OkUtgattSykmeldingProps): ReactElement {
    return (
        <div className="sykmelding-container">
            <div className="mb-8">
                <Alert variant="info">
                    <Heading size="small" level="2">
                        Sykmeldingen er utgått
                    </Heading>
                    <Detail>{toReadableDate(sykmelding.sykmeldingStatus.timestamp)}</Detail>
                </Alert>
            </div>
            <SykmeldingSykmeldtContainer sykmelding={sykmelding} />
        </div>
    )
}

export default OkUtgattSykmelding
