import React, { useMemo, useState } from 'react';
import { BodyShort, Heading, Select } from '@navikt/ds-react';

import { SykmeldingFragment } from '../../fetching/graphql.generated';
import { sortSykmeldingerByArbeidsgiver, sykmeldingByDateAsc } from '../../utils/sykmeldingSortUtils';

import Lenkepanel from './Lenkepanel/Lenkepanel';
import styles from './SykmeldingLinkPanel.module.css';

export enum SortBy {
    DATE = 'DATE',
    ARBEIDSGIVER = 'ARBEIDSGIVER',
}

interface LenkepanelContainerProps {
    sykmeldinger: SykmeldingFragment[];
    type: 'NYE_SYKMELDINGER' | 'TIDLIGERE_SYKMELDINGER' | 'UNDER_BEHANDLING';
    title: string;
    defaultSortBy?: SortBy;
}

const SykmeldingLinkPanel: React.FC<LenkepanelContainerProps> = ({
    sykmeldinger,
    type,
    title,
    defaultSortBy = SortBy.DATE,
}) => {
    const [sortBy, setSortBy] = useState<SortBy>(defaultSortBy);
    const sykmeldingerSortedByArbeidsgiver = useMemo(
        () => sortSykmeldingerByArbeidsgiver(sykmeldinger),
        [sykmeldinger],
    );

    const sykmeldingerSortedByDate = useMemo(() => {
        const sykmeldings = [...sykmeldinger].sort(sykmeldingByDateAsc).reverse();

        return type === 'NYE_SYKMELDINGER' ? sykmeldings.reverse() : sykmeldings;
    }, [sykmeldinger, type]);

    if (sykmeldinger.length === 0) {
        if (type === 'TIDLIGERE_SYKMELDINGER' || type === 'UNDER_BEHANDLING') {
            return null;
        }

        if (type === 'NYE_SYKMELDINGER') {
            return <BodyShort style={{ marginBottom: '2rem' }}>Du har ingen nye sykmeldinger</BodyShort>;
        }
    }

    return (
        <section aria-labelledby={type} className={styles.lenkepanelContainer}>
            <header className={styles.lenkepanelContainerHeader}>
                <Heading size="medium" level="2" id={type}>
                    {title}
                </Heading>
                {type === 'TIDLIGERE_SYKMELDINGER' && (
                    <Select
                        value={sortBy}
                        label="Sorter etter"
                        onChange={(event) => setSortBy(event.target.value as SortBy)}
                    >
                        <option value={SortBy.DATE}>Dato</option>
                        <option value={SortBy.ARBEIDSGIVER}>Arbeidsgiver</option>
                    </Select>
                )}
            </header>
            <ol className={styles.lenkepanelContainerSykmeldinger}>
                {sortBy === SortBy.DATE &&
                    sykmeldingerSortedByDate.map((sykmelding, index) => (
                        <li key={index} className="lenkepanel-container__sykmelding">
                            <Lenkepanel sykmelding={sykmelding} isNew={type === 'NYE_SYKMELDINGER'} />
                        </li>
                    ))}
                {sortBy === SortBy.ARBEIDSGIVER &&
                    sykmeldingerSortedByArbeidsgiver.map((sykmelding, index) => (
                        <li key={index} className="lenkepanel-container__sykmelding">
                            <Lenkepanel sykmelding={sykmelding} isNew={type === 'NYE_SYKMELDINGER'} />
                        </li>
                    ))}
            </ol>
        </section>
    );
};

export default SykmeldingLinkPanel;
