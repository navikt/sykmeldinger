import React, { useState } from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { Select } from 'nav-frontend-skjema';
import './LenkepanelContainer.less';
import Lenkepanel from './Lenkepanel/Lenkepanel';
import { Sykmelding } from '../../../models/Sykmelding/Sykmelding';
import dayjs from 'dayjs';

export enum SortBy {
    DATE = 'DATE',
    ARBEIDSGIVER = 'ARBEIDSGIVER',
}

function sortSykmeldingerByDate(sykmeldinger: Sykmelding[]): Sykmelding[] {
    return [...sykmeldinger].sort((a, b) => {
        if (dayjs(a.getSykmeldingStartDate()).isAfter(dayjs(b.getSykmeldingStartDate()))) {
            return -1;
        } else if (dayjs(a.getSykmeldingStartDate()).isBefore(b.getSykmeldingStartDate())) {
            return 0;
        }
        return 1;
    });
}

function sortSykmeldingerByArbeidsgiver(sykmeldinger: Sykmelding[]): Sykmelding[] {
    return [...sykmeldinger].sort((a, b) => {
        if (a.arbeidsgiver?.navn && b.arbeidsgiver?.navn) {
            if (a.arbeidsgiver.navn > b.arbeidsgiver.navn) {
                return 1;
            }
            if (a.arbeidsgiver.navn < b.arbeidsgiver.navn) {
                return -1;
            }
        }
        return 0;
    });
}

interface LenkepanelContainerProps {
    type: 'NYE_SYKMELDINGER' | 'TIDLIGERE_SYKMELDINGER';
    sykmeldinger: Sykmelding[];
}

const LenkepanelContainer: React.FC<LenkepanelContainerProps> = ({ type, sykmeldinger }) => {
    const [sortBy, setSortBy] = useState(SortBy.DATE); // Sort by date as default
    const [sykmeldingerSorted, setSykmeldingerSorted] = useState<Sykmelding[]>(sortSykmeldingerByDate(sykmeldinger));
    const title = type === 'NYE_SYKMELDINGER' ? 'Nye sykmeldinger' : 'Tidligere sykmeldinger';

    const handleSortChange = (sortBy: SortBy): void => {
        switch (sortBy) {
            case 'DATE':
                setSykmeldingerSorted(sortSykmeldingerByDate(sykmeldinger));
                break;
            case 'ARBEIDSGIVER':
                setSykmeldingerSorted(sortSykmeldingerByArbeidsgiver(sykmeldinger));
                break;
        }
        setSortBy(sortBy);
    };

    if (type === 'TIDLIGERE_SYKMELDINGER' && sykmeldinger.length === 0) {
        return null;
    }

    return (
        <div className="lenkepanel-container">
            <header className="lenkepanel-container__header">
                <Undertittel tag="h2">{title}</Undertittel>
                {type === 'TIDLIGERE_SYKMELDINGER' ? (
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
            {sykmeldingerSorted.length ? (
                <ol className="lenkepanel-container__sykmeldinger">
                    {sykmeldingerSorted.map((sykmelding, index) => (
                        <li key={index} className="lenkepanel-container__sykmelding">
                            <Lenkepanel sykmelding={sykmelding} />
                        </li>
                    ))}
                </ol>
            ) : (
                <Normaltekst>Du har ingen nye sykmeldinger</Normaltekst>
            )}
        </div>
    );
};

export default LenkepanelContainer;
