import { ReactElement } from 'react'
import Link from 'next/link'
import { BodyShort, Heading, LinkPanel } from '@navikt/ds-react'

import { SykmeldingFragment } from '../../../fetching/graphql.generated'
import { getReadableSykmeldingLength, getSykmeldingTitle } from '../../../utils/sykmeldingUtils'
import { getDescription } from '../../../utils/periodeUtils'
import { cn } from '../../../utils/tw-utils'

import LenkepanelIcon from './LenkepanelIcon'
import LenkepanelEtikett from './LenkepanelEtikett'

interface LenkepanelProps {
    sykmelding: SykmeldingFragment
    notifying: boolean
}

export function Lenkepanel({ sykmelding, notifying }: LenkepanelProps): ReactElement {
    const status = sykmelding.sykmeldingStatus.statusEvent
    const behandlingsutfallStatus = sykmelding.behandlingsutfall.status
    const arbeidsgiverNavn = sykmelding.sykmeldingStatus.arbeidsgiver?.orgNavn

    return (
        <Link href={`/${sykmelding.id}`} passHref legacyBehavior>
            <LinkPanel
                className={cn('mb-4 p-6 [&>div]:w-full', {
                    'border-orange-300 bg-orange-50 hover:border-orange-500': notifying,
                })}
                border
            >
                <div className="flex gap-3 max-[560px]:flex-col">
                    <div className="mr-8 hidden sm:block">
                        <LenkepanelIcon
                            behandlingsutfall={behandlingsutfallStatus}
                            isPaper={Boolean(sykmelding.papirsykmelding)}
                        />
                    </div>
                    <div className="grow">
                        <BodyShort>{getReadableSykmeldingLength(sykmelding)}</BodyShort>
                        <Heading size="small" level="3">
                            {getSykmeldingTitle(sykmelding)}
                        </Heading>
                        <ul className="list-disc pl-4">
                            {sykmelding.sykmeldingsperioder.map((periode, index) => (
                                <li key={index}>
                                    <BodyShort>{getDescription(periode, arbeidsgiverNavn)}</BodyShort>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex shrink-0 items-center">
                        <LenkepanelEtikett status={status} behandlingsutfall={behandlingsutfallStatus} />
                    </div>
                </div>
            </LinkPanel>
        </Link>
    )
}

export default Lenkepanel
