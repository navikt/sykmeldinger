import { BodyLong, Button, GuidePanel } from '@navikt/ds-react'
import Link from 'next/link'
import { ReactElement, useEffect } from 'react'

import { toEarliestSykmelding, useUnsentSykmeldinger } from '../../hooks/useFindOlderSykmeldingId'
import { pluralize } from '../../utils/stringUtils'
import { browserEnv } from '../../utils/env'
import { logAmplitudeEvent } from '../../amplitude/amplitude'

function HintToNextOlderSykmelding(): ReactElement | null {
    const { unsentSykmeldinger, error, isLoading } = useUnsentSykmeldinger()
    const dontShowYet = isLoading || error || unsentSykmeldinger == null
    const isDone = unsentSykmeldinger?.length === 0 ?? false

    useEffect(() => {
        if (dontShowYet) return

        if (isDone) {
            logAmplitudeEvent({
                eventName: 'guidepanel vist',
                data: { komponent: 'ingen flere sykmeldinger å sende inn' },
            })
        } else {
            logAmplitudeEvent({ eventName: 'guidepanel vist', data: { komponent: 'hint til neste eldre sykmelding' } })
        }
    }, [dontShowYet, isDone])

    if (dontShowYet) return null
    if (isDone) {
        return (
            <div className="mt-8">
                <Button
                    as="a"
                    href={browserEnv.NEXT_PUBLIC_SYKEFRAVAER_ROOT || '#'}
                    onClick={() =>
                        logAmplitudeEvent({
                            eventName: 'navigere',
                            data: { destinasjon: 'ditt sykefravær', lenketekst: 'Tilbake til Ditt sykefravær' },
                        })
                    }
                >
                    Tilbake til Ditt sykefravær
                </Button>
            </div>
        )
    }

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
