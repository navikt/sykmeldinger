import { BodyLong, Button, GuidePanel } from '@navikt/ds-react'
import Link from 'next/link'
import { ReactElement, useEffect } from 'react'

import { toEarliestSykmelding, useUnsentSykmeldinger } from '../../hooks/useFindOlderSykmeldingId'
import { pluralize } from '../../utils/stringUtils'
import { logAmplitudeEvent } from '../../amplitude/amplitude'

function HintToNextOlderSykmelding(): ReactElement | null {
    const { unsentSykmeldinger, error, isLoading } = useUnsentSykmeldinger()
    const dontShowYet = isLoading || error || unsentSykmeldinger == null
    const isDone = unsentSykmeldinger?.length === 0

    useEffect(() => {
        if (dontShowYet) return
    }, [dontShowYet, isDone])

    if (dontShowYet || isDone) return null

    const earliest = unsentSykmeldinger.reduce(toEarliestSykmelding)
    const earliestId = earliest.id

    return (
        <GuidePanel poster className="mt-8">
            <BodyLong spacing>
                Du har {pluralize('sykmelding', unsentSykmeldinger.length)} du må velge om du skal bruke
            </BodyLong>
            <Link passHref href={`/${earliestId}`} legacyBehavior>
                <Button
                    as="a"
                    variant="primary"
                    onClick={() =>
                        logAmplitudeEvent({
                            eventName: 'navigere',
                            data: { destinasjon: 'neste ubrukte sykmelding', lenketekst: 'Gå til sykmeldingen' },
                        })
                    }
                >
                    {unsentSykmeldinger.length > 1 ? 'Gå videre' : 'Gå til sykmeldingen'}
                </Button>
            </Link>
        </GuidePanel>
    )
}

export default HintToNextOlderSykmelding
