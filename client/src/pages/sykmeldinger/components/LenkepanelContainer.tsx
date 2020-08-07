import React, { useState, useEffect } from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
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
    type: 'NYE_SYKMELDINGER' | 'TIDLIGERE_SYKMELDINGER';
    sykmeldinger: Sykmelding[];
}

const LenkepanelContainer = ({ type, sykmeldinger }: LenkepanelContainerProps) => {
    const [sortBy, setSortBy] = useState(SortBy.DATE); // Sort by date as default
    const [sykmeldingerSorted, setSykmeldingerSorted] = useState<Sykmelding[]>(
        sortSykmeldingerNewestFirst(sykmeldinger),
    );
    const title = type === 'NYE_SYKMELDINGER' ? 'Nye sykmeldinger' : 'Tidligere sykmeldinger';

    //console.log(sortSykmeldingerNewestFirst(sykmeldinger));
    //console.log(sortSykmeldingerArbeidsgiver(sykmeldinger));
    useEffect(() => {
        //console.log(sykmeldingerSorted);
    }, [sykmeldingerSorted]);

    const handleSortChange = (sortBy: SortBy): void => {
        switch (sortBy) {
            case 'DATE':
                console.log(sortSykmeldingerNewestFirst(sykmeldinger));
                setSykmeldingerSorted(sortSykmeldingerNewestFirst(sykmeldinger));
                break;
            case 'ARBEIDSGIVER':
                console.log(sortSykmeldingerArbeidsgiver(sykmeldinger));
                setSykmeldingerSorted(sortSykmeldingerArbeidsgiver(sykmeldinger));
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
                <Undertittel>{title}</Undertittel>
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
                            <Lenkepanel
                                sykmeldingId={sykmelding.id}
                                sykmeldingsstatus={sykmelding.sykmeldingStatus.statusEvent}
                                sykmeldingBehandlingsutfall={sykmelding.behandlingsutfall.status}
                                sykmeldingsperioder={sykmelding.sykmeldingsperioder}
                                arbeidsgiverNavn={sykmelding.sykmeldingStatus.arbeidsgiver?.orgNavn}
                                erEgenmeldt={!!sykmelding.egenmeldt}
                                erPapir={!!sykmelding.papirsykmelding}
                            />
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
