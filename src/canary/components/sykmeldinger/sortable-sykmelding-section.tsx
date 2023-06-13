'use client'

import React, { ReactElement, useState } from 'react'
import { sortBy } from 'remeda'
import { min } from 'date-fns'
import { Select, Heading } from '@navikt/ds-react'

import { Sykmelding } from '../../db'
import { toDate } from '../../../utils/dateUtils'

import SykmeldingLinkPanel from './sykmelding-link-panel'

type Props = {
    sykmeldinger: Sykmelding[]
}

export enum SortBy {
    DATE = 'DATE',
    ARBEIDSGIVER = 'ARBEIDSGIVER',
}

function SortableSykmeldingSection({ sykmeldinger }: Props): ReactElement {
    const [sort, setSort] = useState<SortBy>(SortBy.DATE)

    const sorter = (sykmeldinger: Sykmelding[]): Sykmelding[] => {
        switch (sort) {
            case SortBy.DATE:
                return sortBy(sykmeldinger, (it) => min(it.sykmelding.sykmeldingsperioder.map((it) => toDate(it.tom))))
            case SortBy.ARBEIDSGIVER:
                return sortBy(sykmeldinger, (it) => it.arbeidsgiver?.orgNavn ?? '')
            default:
                return sykmeldinger
        }
    }

    return (
        <div>
            <div className="mb-2 flex items-end justify-between">
                <Heading size="medium" level="2" id="older-sykmeldinger-section">
                    Tidligere sykmeldinger
                </Heading>
                <Select value={sort} label="Sorter etter" onChange={(event) => setSort(event.target.value as SortBy)}>
                    <option value={SortBy.DATE}>Dato</option>
                    <option value={SortBy.ARBEIDSGIVER}>Arbeidsgiver</option>
                </Select>
            </div>
            {sorter(sykmeldinger).map((row) => (
                <SykmeldingLinkPanel key={row.sykmelding_id} notifying={false} sykmelding={row} />
            ))}
        </div>
    )
}

export default SortableSykmeldingSection
