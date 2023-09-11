import React, { ReactElement } from 'react'
import { Accordion } from '@navikt/ds-react'
import { useQuery } from '@apollo/client'

import { InfoOmDigitalSykmelding, SerIkkeSykmelding } from '../InfoOmDigitalSykmelding/InfoOmDigitalSykmelding'
import SykmeldingLinkPanel from '../SykmeldingLinkPanel/SykmeldingLinkPanel'
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

            <div>TODO: Below the fold based loading:</div>
            <SykmeldingLinkPanel title="Tidligere sykmeldinger" type="TIDLIGERE_SYKMELDINGER" sykmeldinger={[]} />
        </div>
    )
}

function SykmeldingSection({
    category,
}: {
    category: SykmeldingCategory.UNSENT | SykmeldingCategory.PROCESSING
}): ReactElement {
    const { loading, data, error } = useQuery(MinimalSykmeldingerDocument, { variables: { category } })

    if (loading) {
        return <SingleSykmeldingSkeleton />
    }

    if (error || data == null) {
        return <div>TODO</div>
    }

    return (
        <SykmeldingLinkPanel
            title={categoryToTitle[category]}
            type={categoryToType[category]}
            sykmeldinger={[...data.minimalSykmeldinger]}
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
