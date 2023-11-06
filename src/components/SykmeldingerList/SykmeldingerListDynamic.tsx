import React, { ReactElement } from 'react'
import { Accordion, Alert, BodyShort, Heading, Link, Select, Skeleton } from '@navikt/ds-react'
import { NetworkStatus, useQuery } from '@apollo/client'

import { MinimalSykmeldingerDocument, SykmeldingCategory } from 'queries'

import { InfoOmDigitalSykmelding, SerIkkeSykmelding } from '../InfoOmDigitalSykmelding/InfoOmDigitalSykmelding'
import SykmeldingLinkPanel, { SortBy } from '../SykmeldingLinkPanel/SykmeldingLinkPanel'

import { SingleSykmeldingSkeleton } from './SykmeldingerSkeletons'

function SykmeldingerListDynamic(): ReactElement {
    return (
        <div>
            <SykmeldingSection category={SykmeldingCategory.PROCESSING} />
            <SykmeldingSection category={SykmeldingCategory.UNSENT} />

            <Accordion>
                <InfoOmDigitalSykmelding />
                <SerIkkeSykmelding />
            </Accordion>

            <OlderSykmeldingerSection />
        </div>
    )
}

function SykmeldingSection({
    category,
}: {
    category: SykmeldingCategory.UNSENT | SykmeldingCategory.PROCESSING
}): ReactElement {
    const { loading, data, error, refetch, networkStatus } = useQuery(MinimalSykmeldingerDocument, {
        variables: { category },
        notifyOnNetworkStatusChange: true,
    })

    if ((loading && category === SykmeldingCategory.UNSENT) || networkStatus === NetworkStatus.refetch) {
        return (
            <div className="flex flex-col gap-4 mb-8">
                <Skeleton variant="text" height="var(--a-font-size-heading-medium)" width="40%" />
                <SingleSykmeldingSkeleton noTag />
            </div>
        )
    }

    if (error) {
        return (
            <Alert variant="error" role="alert" aria-live="polite" className="my-4">
                En uventet feil oppsto. Vennligst kontakt NAV dersom problemet vedvarer.
                <div>
                    Du kan prøve å{' '}
                    <Link as="button" onClick={() => refetch()}>
                        laste sykmeldingene på nytt
                    </Link>
                    .
                </div>
            </Alert>
        )
    }

    return (
        <SykmeldingLinkPanel
            title={categoryToTitle[category]}
            type={categoryToType[category]}
            sykmeldinger={[...(data?.minimalSykmeldinger ?? [])]}
        />
    )
}

function OlderSectionPlaceholderHeader(): ReactElement {
    return (
        <div className="flex justify-between items-end">
            <Heading size="medium" level="2" id={categoryToType[SykmeldingCategory.OLDER]}>
                {categoryToTitle[SykmeldingCategory.OLDER]}
            </Heading>
            <Select value={SortBy.DATE} label="Sorter etter" disabled>
                <option value={SortBy.DATE}>Dato</option>
                <option value={SortBy.ARBEIDSGIVER}>Arbeidsgiver</option>
            </Select>
        </div>
    )
}

function OlderSykmeldingerSection(): ReactElement {
    const { loading, data, error, refetch, networkStatus } = useQuery(MinimalSykmeldingerDocument, {
        variables: { category: SykmeldingCategory.OLDER },
        notifyOnNetworkStatusChange: true,
    })

    if (loading || networkStatus === NetworkStatus.refetch) {
        return (
            <div className="flex flex-col gap-4 mb-8 mt-16">
                <OlderSectionPlaceholderHeader />
                <SingleSykmeldingSkeleton />
                <SingleSykmeldingSkeleton />
            </div>
        )
    }

    if (error) {
        return (
            <Alert variant="error" role="alert" aria-live="polite" className="my-4">
                En uventet feil oppsto. Vennligst kontakt NAV dersom problemet vedvarer.
                <div>
                    Du kan prøve å{' '}
                    <Link as="button" onClick={() => refetch()}>
                        laste sykmeldingene på nytt
                    </Link>
                    .
                </div>
            </Alert>
        )
    }

    if (data?.minimalSykmeldinger.length === 0) {
        return (
            <div className="mb-8 mt-16">
                <OlderSectionPlaceholderHeader />
                <BodyShort className="mt-8">Du har ingen tidligere sykmeldinger</BodyShort>
            </div>
        )
    }

    return (
        <SykmeldingLinkPanel
            title={categoryToTitle[SykmeldingCategory.OLDER]}
            type={categoryToType[SykmeldingCategory.OLDER]}
            sykmeldinger={[...(data?.minimalSykmeldinger ?? [])]}
        />
    )
}

const categoryToTitle = {
    [SykmeldingCategory.PROCESSING]: 'Under behandling',
    [SykmeldingCategory.UNSENT]: 'Nye sykmeldinger',
    [SykmeldingCategory.OLDER]: 'Tidligere sykmeldinger',
} as const

const categoryToType = {
    [SykmeldingCategory.PROCESSING]: 'UNDER_BEHANDLING',
    [SykmeldingCategory.UNSENT]: 'NYE_SYKMELDINGER',
    [SykmeldingCategory.OLDER]: 'TIDLIGERE_SYKMELDINGER',
} as const

export default SykmeldingerListDynamic
