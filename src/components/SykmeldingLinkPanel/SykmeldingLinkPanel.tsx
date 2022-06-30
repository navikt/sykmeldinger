import React, { useMemo, useState } from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { Select } from 'nav-frontend-skjema';

import { SykmeldingFragment } from '../../fetching/graphql.generated';
import SykmeldingSorter from '../../utils/SykmeldingSorter';

import Lenkepanel from './Lenkepanel/Lenkepanel';
import styles from './SykmeldingLinkPanel.module.css';

export enum SortBy {
    DATE = 'DATE',
    ARBEIDSGIVER = 'ARBEIDSGIVER',
}

interface LenkepanelContainerProps {
    sykmeldinger: SykmeldingFragment[];
    type: 'NYE_SYKMELDINGER' | 'TIDLIGERE_SYKMELDINGER';
    defaultSortBy?: SortBy;
}

const SykmeldingLinkPanel: React.FC<LenkepanelContainerProps> = ({
    sykmeldinger,
    type,
    defaultSortBy = SortBy.DATE,
}) => {
    const [sortBy, setSortBy] = useState<SortBy>(defaultSortBy);
    const sykmeldingerSortedByArbeidsgiver = useMemo(
        () => SykmeldingSorter.sortSykmeldingerByArbeidsgiver(sykmeldinger),
        [sykmeldinger],
    );

    const sykmeldingerSortedByDate = useMemo(() => {
        const sykmeldings = SykmeldingSorter.sortSykmeldingerByDate(sykmeldinger);

        return type === 'NYE_SYKMELDINGER' ? sykmeldings.reverse() : sykmeldings;
    }, [sykmeldinger, type]);
    const title = type === 'NYE_SYKMELDINGER' ? 'Nye sykmeldinger' : 'Tidligere sykmeldinger';

    if (sykmeldinger.length === 0) {
        if (type === 'TIDLIGERE_SYKMELDINGER') {
            return null;
        }

        if (type === 'NYE_SYKMELDINGER') {
            return <Normaltekst style={{ marginBottom: '2rem' }}>Du har ingen nye sykmeldinger</Normaltekst>;
        }
    }

    return (
        <section aria-labelledby={type} className={styles.lenkepanelContainer}>
            <header className={styles.lenkepanelContainerHeader}>
                <Undertittel id={type} tag="h2">
                    {title}
                </Undertittel>
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
