import React, { ReactElement } from 'react'
import { Heading, Skeleton } from '@navikt/ds-react'
import { range } from 'remeda'

import { cn } from '../../utils/tw-utils'

export function SykmeldingerListSkeleton(): ReactElement {
    return (
        <section aria-labelledby="sykmeldinger-list-skeleton">
            <Heading size="small" level="2" hidden id="sykmeldinger-list-skeleton">
                Henter dine sykmeldinger
            </Heading>
            <Skeleton variant="text" height="var(--a-font-size-heading-xlarge)" width="40%" className="mb-2" />
            <SingleSykmeldingSkeleton />
            <Skeleton variant="text" height="var(--a-font-size-heading-xlarge)" width="40%" className="mb-2 mt-16" />
            <div className="flex flex-col gap-4">
                <SingleSykmeldingSkeleton />
                <SingleSykmeldingSkeleton />
            </div>
            <Skeleton variant="text" height="var(--a-font-size-heading-xlarge)" width="40%" className="mb-2 mt-16" />
            <div className="flex flex-col gap-4">
                {range(0, 10).map((index) => (
                    <SingleSykmeldingSkeleton key={index} />
                ))}
            </div>
        </section>
    )
}

export function SingleSykmeldingSkeleton({ className, noTag }: { className?: string; noTag?: boolean }): ReactElement {
    return (
        <div className={cn(className, 'flex rounded border border-border-subtle p-6 max-[560px]:flex-col')}>
            <div className="mr-8 max-[560px]:hidden">
                <Skeleton variant="circle" width="48px" height="48px" />
            </div>
            <div className="grow">
                <Skeleton width="29%" />
                <Skeleton width="20%" height="2rem" />
                <Skeleton width="49%" />
            </div>
            {!noTag && (
                <div className="mr-16 mt-2 flex items-center">
                    <Skeleton width="120px" />
                </div>
            )}
        </div>
    )
}
