import React from 'react';
import { Sykmelding } from '../../types/sykmeldingTypes';
import { Sidetittel } from 'nav-frontend-typografi';
import EkspanderbartpanelWrapper from './components/ekspanderbartpanelwrapper/EkspanderbartpanelWrapper';
import PanelRad from './components/PanelRad';
import PanelSeksjon from './components/PanelSeksjon';
import SykmeldingPerioder from './components/sykmeldingperiode/SykmeldingPerioder';

import './infopanel.less';

interface InfoPanelProps {
    sykmelding: Sykmelding;
}

/*
perioder:
    liste over perioder
    perioder viser sortert på dato, eldste først
    hver periode:
        har en overskrift
        har en dato (utregnes med fom og tom) og antall dager
        hvis grad er definert:
            vis grad (% sykmeldt)
        hvis grad er udefinert:
            vis reisetilskudd dersom definert (se SykmeldingPeriode.js)
        viser antall behandlingesdager (ledetekst)
        viser reisetilskudd dersom grad er udefinert (ledetekst)
        viser avventende status (ledetekst)
            viser (ledetekst) innspill på avventende
            viser innspill avventede



    todo:
    - sorter på dato, eldste først
    - hent overskrift fra ledetekst
    - hent reisetilskuddtekst fra ledetekst
*/

const InfoPanel = ({ sykmelding }: InfoPanelProps) => {
    console.log(sykmelding);

    return (
        <article className="panel">
            <header className="panel-header">ikon navn</header>
            <div className="panel-content">
                <Sidetittel className="panel-content-header">Sykmelding</Sidetittel>

                <SykmeldingPerioder perioder={sykmelding.perioder} />

                <PanelRad>
                    <PanelSeksjon
                        tittel="Diagnose"
                        verdi="asd"
                        skjultForArbeidsgiverTekst="Diagnosen vises ikke til arbeidsgiveren"
                    />
                    <PanelSeksjon tittel="Diagnosekode" verdi="asd" />
                </PanelRad>
                <PanelRad>
                    <PanelSeksjon
                        tittel="Bidiagnose"
                        verdi="asd"
                        skjultForArbeidsgiverTekst="Diagnosen vises ikke til arbeidsgiveren"
                    />
                    <PanelSeksjon tittel="Diagnosekode" verdi="asd" />
                </PanelRad>
                <PanelRad>
                    <PanelSeksjon tittel="Beskriv fraværet" verdi="asd" />
                </PanelRad>
                <p>spm med checkbox</p>
                <PanelRad>
                    <PanelSeksjon tittel="Skadedato" verdi="asd" />
                </PanelRad>
                <p>spm med checkbox</p>
                <PanelRad>
                    <PanelSeksjon tittel="Beskriv eventuelle hensyn som må tas på arbeidsplassen" verdi="asd" />
                </PanelRad>
                <PanelRad>
                    <PanelSeksjon tittel="Arbeidsgiver som legen har skrevet inn" verdi="asd" />
                </PanelRad>
                <PanelRad>
                    <PanelSeksjon tittel="Lege/sykmelder" verdi={sykmelding.navnFastlege} />
                    <PanelSeksjon tittel="Lege/sykmelder" verdi={sykmelding.navnFastlege} />
                    <PanelSeksjon tittel="Lege/sykmelder" verdi={sykmelding.navnFastlege} />
                </PanelRad>

                <EkspanderbartpanelWrapper />
            </div>
        </article>
    );
};

export default InfoPanel;
