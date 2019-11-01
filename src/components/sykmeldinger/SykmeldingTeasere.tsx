import React, { useState, useEffect } from 'react';
import { Element } from 'nav-frontend-typografi';
import { Select } from 'nav-frontend-skjema';
import './SykmeldingTeasere.less';

import SykmeldingTeaser from './SykmeldingTeaser';
import Vis from '../../utils/vis';

const sorterEtterDato = (sykmeldinger: any[]): any[] => {
    // array.sort(function(a,b){return a.getTime() - b.getTime()});
    return [sykmeldinger.pop()];
};

const sorterEtterArbeidsgiver = (sykmeldinger: any[]): any[] => {
    // some function
    return [...sykmeldinger, {}];
};

export enum SykmeldingTeaserTittel {
    NYE_SYKMELDINGER = 'Nye Sykmeldinger',
    TIDLIGERE_SYKMELDINGER = 'Tidligere sykmeldinger',
}

enum SorterEtter {
    DATO = 'Dato',
    ARBEIDSGIVER = 'Arbeidsgiver',
}

interface SykmeldingTeasereProps {
    sykmeldinger: any[];
    visSorterEtter: boolean;
    tittel: SykmeldingTeaserTittel;
}

const SykmeldingTeasere: React.FC<SykmeldingTeasereProps> = ({
    sykmeldinger,
    visSorterEtter,
    tittel,
}: SykmeldingTeasereProps) => {
    const [sykmeldingerSortert, setSykmeldingerSortert] = useState<any[]>(sykmeldinger);
    const [sorterEtter, setSorterEtter] = useState<string | null>(
        SykmeldingTeaserTittel.TIDLIGERE_SYKMELDINGER ? SorterEtter.DATO : null,
    );

    useEffect(() => {
        if (visSorterEtter) {
            setSykmeldingerSortert(sykmeldinger =>
                sorterEtter === SorterEtter.ARBEIDSGIVER
                    ? sorterEtterArbeidsgiver(sykmeldinger)
                    : sorterEtterDato(sykmeldinger),
            );
        }
    }, [sorterEtter, visSorterEtter]);

    return (
        <div className="teasere">
            <div className="teasere-header">
                <Element className="teasere-header__tittel">{tittel}</Element>
                <Vis hvis={visSorterEtter}>
                    <div className="teasere-header__sorter-etter">
                        <Select
                            defaultValue={
                                sorterEtter === SorterEtter.DATO ? SorterEtter.DATO : SorterEtter.ARBEIDSGIVER
                            }
                            label="Sorter etter"
                            onChange={e => setSorterEtter(e.target.value)}
                        >
                            <option value={SorterEtter.DATO}>{SorterEtter.DATO}</option>
                            <option value={SorterEtter.ARBEIDSGIVER}>{SorterEtter.ARBEIDSGIVER}</option>
                        </Select>
                    </div>
                </Vis>
            </div>
            {sykmeldingerSortert.map((sykmelding, index) => (
                <SykmeldingTeaser key={index} sykmelding={sykmelding} />
            ))}
        </div>
    );
};

export default SykmeldingTeasere;
