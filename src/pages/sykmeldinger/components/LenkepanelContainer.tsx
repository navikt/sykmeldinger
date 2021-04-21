import React, { useMemo, useState } from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { Select } from 'nav-frontend-skjema';
import './LenkepanelContainer.less';
import Lenkepanel from './Lenkepanel/Lenkepanel';
import { Sykmelding } from '../../../models/Sykmelding/Sykmelding';
import SykmeldingSorter from '../../../utils/SykmeldingSorter';

export enum SortBy {
    DATE = 'DATE',
    ARBEIDSGIVER = 'ARBEIDSGIVER',
}

interface LenkepanelContainerProps {
    sykmeldinger: Sykmelding[];
    type: 'NYE_SYKMELDINGER' | 'TIDLIGERE_SYKMELDINGER';
    defaultSortBy?: SortBy;
}

const LenkepanelContainer: React.FC<LenkepanelContainerProps> = ({
    sykmeldinger,
    type,
    defaultSortBy = SortBy.DATE,
}) => {
    const [sortBy, setSortBy] = useState<SortBy>(defaultSortBy);
    const sykmeldingerSortedByArbeidsgiver = useMemo(
        () => SykmeldingSorter.sortSykmeldingerByArbeidsgiver(sykmeldinger),
        [sykmeldinger],
    );

    const sykmeldingerSortedByDate = useMemo(() => SykmeldingSorter.sortSykmeldingerByDate(sykmeldinger), [
        sykmeldinger,
    ]);
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
        <div className="lenkepanel-container">
            <header className="lenkepanel-container__header">
                <Undertittel tag="h2">{title}</Undertittel>
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
            <ol className="lenkepanel-container__sykmeldinger">
                {sortBy === SortBy.DATE &&
                    sykmeldingerSortedByDate.map((sykmelding, index) => (
                        <li key={index} className="lenkepanel-container__sykmelding">
                            <Lenkepanel sykmelding={sykmelding} />
                        </li>
                    ))}
                {sortBy === SortBy.ARBEIDSGIVER &&
                    sykmeldingerSortedByArbeidsgiver.map((sykmelding, index) => (
                        <li key={index} className="lenkepanel-container__sykmelding">
                            <Lenkepanel sykmelding={sykmelding} />
                        </li>
                    ))}
            </ol>
        </div>
    );
};

export default LenkepanelContainer;
