import { ReactElement } from 'react'
import { Button } from '@navikt/ds-react'
import { PencilWritingIcon } from '@navikt/aksel-icons'

import { SykmeldingFragment } from 'queries'

import StatusBanner from '../../../StatusBanner/StatusBanner'
import SykmeldingSykmeldtSection from '../../../Sykmelding/SykmeldingerSykmeldt/SykmeldingSykmeldtSection'

interface OkBekreftetSykmeldingProps {
    sykmelding: SykmeldingFragment
    reopen: () => void
}

function OkBekreftetSykmelding({ sykmelding, reopen }: OkBekreftetSykmeldingProps): ReactElement {
    return (
        <div className="sykmelding-container">
            <div className="mb-4">
                <StatusBanner
                    sykmeldingStatus={sykmelding.sykmeldingStatus}
                    behandlingsutfall={sykmelding.behandlingsutfall}
                    egenmeldt={sykmelding.egenmeldt}
                />
            </div>

            {!(sykmelding.egenmeldt != null && sykmelding.egenmeldt) && (
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
        </div>
    )
}

export default OkBekreftetSykmelding
