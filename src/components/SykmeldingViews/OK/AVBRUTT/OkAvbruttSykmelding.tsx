import { ReactElement } from 'react'
import { Alert, Button, Detail, Heading } from '@navikt/ds-react'
import { PencilWritingIcon } from '@navikt/aksel-icons'

import { SykmeldingFragment } from 'queries'

import { toReadableDate } from '../../../../utils/dateUtils'
import HintToNextOlderSykmelding from '../../../ForceOrder/HintToNextOlderSykmelding'
import SykmeldingSykmeldtSection from '../../../Sykmelding/SykmeldingerSykmeldt/SykmeldingSykmeldtSection'

interface OkAvbruttSykmeldingProps {
    sykmelding: SykmeldingFragment
    reopen: () => void
}

function OkAvbruttSykmelding({ sykmelding, reopen }: OkAvbruttSykmeldingProps): ReactElement {
    return (
        <div className="sykmelding-container">
            <div className="mb-4">
                <Alert variant="info">
                    <Heading size="small" level="2">
                        {sykmelding.egenmeldt ? 'Egenmelding' : 'Sykmelding'}en ble avbrutt av deg
                    </Heading>
                    <Detail>{toReadableDate(sykmelding.sykmeldingStatus.timestamp)}</Detail>
                </Alert>
            </div>
            {!Boolean(sykmelding.egenmeldt) && (
                <div className="mb-8">
                    <div className="mb-4">
                        <Button
                            size="small"
                            variant="secondary"
                            onClick={() => {
                                reopen()
                            }}
                            icon={<PencilWritingIcon aria-hidden />}
                        >
                            GJØR UTFYLLINGEN PÅ NYTT
                        </Button>
                    </div>
                </div>
            )}
            <SykmeldingSykmeldtSection sykmelding={sykmelding} />

            <HintToNextOlderSykmelding />
        </div>
    )
}

export default OkAvbruttSykmelding
