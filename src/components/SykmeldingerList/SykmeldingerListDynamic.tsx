import React, { ReactElement, useState } from 'react'
import { Accordion, Alert, BodyShort, Button, Heading, Link, Select, Skeleton } from '@navikt/ds-react'
import { NetworkStatus, useQuery } from '@apollo/client'

import { InfoOmDigitalSykmelding, SerIkkeSykmelding } from '../InfoOmDigitalSykmelding/InfoOmDigitalSykmelding'
import SykmeldingLinkPanel, { SortBy } from '../SykmeldingLinkPanel/SykmeldingLinkPanel'
import { MinimalSykmeldingerDocument, SykmeldingCategory } from '../../fetching/graphql.generated'

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
                <Skeleton variant="text" height="var(--a-font-size-heading-xlarge)" width="40%" />
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
        <div className="flex justify-between items-end mb-2">
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
    const [shouldLoadOlder, setShouldLoadOlder] = useState(false)

    const { loading, data, error, refetch, networkStatus } = useQuery(MinimalSykmeldingerDocument, {
        variables: { category: SykmeldingCategory.OLDER },
        notifyOnNetworkStatusChange: true,
        skip: !shouldLoadOlder,
    })

    if (!shouldLoadOlder) {
        return (
            <div className="mt-16 relative">
                <OlderSectionPlaceholderHeader />
                <div className="flex flex-col gap-4">
                    <SingleSykmeldingSkeleton className="[&>*>*]:animate-none opacity-50" />
                    <SingleSykmeldingSkeleton className="[&>*>*]:animate-none opacity-50" />
                </div>
                <div className="bg-gradient-to-t from-white absolute top-0 left-0 right-0 bottom-0" />
                <Button
                    variant="secondary-neutral"
                    className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    onClick={() => setShouldLoadOlder(true)}
                >
                    Vis tidligere sykmeldinger
                </Button>
            </div>
        )
    }

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
