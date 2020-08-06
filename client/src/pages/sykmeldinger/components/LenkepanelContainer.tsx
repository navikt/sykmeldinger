import React, { useState } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Select } from 'nav-frontend-skjema';
import './LenkepanelContainer.less';
import Lenkepanel from './Lenkepanel/Lenkepanel';
import { Sykmelding } from '../../../types/sykmelding';
import { sortSykmeldingerNewestFirst, sortSykmeldingerArbeidsgiver } from '../../../utils/sorterSykemeldingUtils';

export enum SortBy {
    DATE = 'DATE',
    ARBEIDSGIVER = 'ARBEIDSGIVER',
}

interface LenkepanelContainerProps {
    title: string;
    sykmeldinger: Sykmelding[];
    showSortBy?: boolean;
}

const LenkepanelContainer = ({ title, sykmeldinger, showSortBy = false }: LenkepanelContainerProps) => {
    const [sortBy, setSortBy] = useState(SortBy.DATE); // Sort by date as default
    const [sykmeldingerSorted, setSykmeldingerSorted] = useState<Sykmelding[]>(
        sortSykmeldingerNewestFirst(sykmeldinger),
    );

    const handleSortChange = (sortBy: SortBy): void => {
        setSortBy(sortBy);
        switch (sortBy) {
            case 'DATE':
                setSykmeldingerSorted(sortSykmeldingerNewestFirst(sykmeldinger));
                break;
            case 'ARBEIDSGIVER':
                setSykmeldingerSorted(sortSykmeldingerArbeidsgiver(sykmeldinger));
                break;
        }
    };

    return (
        <div className="lenkepanel-container">
            <header className="lenkepanel-container__header">
                <Undertittel>{title}</Undertittel>
                {showSortBy ? (
                    <Select
                        value={sortBy}
                        label="Sorter etter"
                        onChange={(event) => handleSortChange(event.target.value as SortBy)}
                    >
                        <option value={SortBy.DATE}>Dato</option>
                        <option value={SortBy.ARBEIDSGIVER}>Arbeidsgiver</option>
                    </Select>
                ) : null}
            </header>
            <ol className="lenkepanel-container__sykmeldinger">
                {sykmeldingerSorted.map((sykmelding, index) => (
                    <li key={index} className="lenkepanel-container__sykmelding">
                        <Lenkepanel
                            sykmeldingId={sykmelding.id}
                            sykmeldingsstatus={sykmelding.sykmeldingStatus.statusEvent}
                            sykmeldingBehandlingsutvall={sykmelding.behandlingsutfall.status}
                            sykmeldingsperioder={sykmelding.sykmeldingsperioder}
                            arbeidsgiverNavn={sykmelding.sykmeldingStatus.arbeidsgiver?.orgNavn}
                            erEgenmeldt={!!sykmelding.egenmeldt}
                            erPapir={!!sykmelding.papirsykmelding}
                        />
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default LenkepanelContainer;
