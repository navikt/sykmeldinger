import React, { useState, useEffect, useRef } from 'react';
import { Sidetittel, Normaltekst } from 'nav-frontend-typografi';
import Tekstomrade from 'nav-frontend-tekstomrade';
import Brodsmuler, { Brodsmule } from '../components/brodsmuler/brodsmuler';
import TidslinjeElement from '../components/tidslinje/TidslinjeElement';
import sykmeldtHvaNa from '../components/tidslinje/sykmeldt-hva-na.svg';

const brodsmuler: Brodsmule[] = [
    {
        tittel: 'Ditt sykefravaer',
        sti: '/',
        erKlikkbar: true,
    },
    {
        tittel: 'Hva skjer under sykefraværet?',
        sti: '/tidslinje',
        erKlikkbar: false,
    },
];

const TidslinjeSide: React.FC = () => {
    return (
        <div className="limit">
            <Brodsmuler brodsmuler={brodsmuler}></Brodsmuler>
            <Sidetittel>Hva skjer under sykefraværet?</Sidetittel>
            <Tekstomrade>
                På tidslinjen ser du hva som forventes av deg i løpet av sykefraværet. Oppgavene kan gjøres på andre
                tidspunkter hvis det er behov for det. Hvis du er for syk til å delta i jobb eller aktivitet, kan du få
                unntak fra enkelte av oppgavene
            </Tekstomrade>
            <span className="tidslinje">
                <TidslinjeElement erEkspanderbar={false} erForsteElement={true} tittel={'Første sykmeldingsdag'} />
                <TidslinjeElement
                    erEkspanderbar={true}
                    tittel={'Når du er blitt syk'}
                    bilde={sykmeldtHvaNa}
                    innhold={
                        <Normaltekst>
                            Du bestemmer selv om du vil bruke sykmeldingen eller avbryte den. Du kan også jobbe i
                            kombinasjon med sykmelding. Det kommer an på hva sykdommen din tillater og hva det er
                            praktisk mulig å få til på arbeidsplassen. Greit å vite: Arbeidsgiveren har plikt til å
                            legge til rette for at du kan jobbe helt eller delvis selv om du er syk. Husk at du alltid
                            kan vurdere gradert sykmelding. Vet du at fraværet blir kort, kan det være like greit med
                            egenmelding, så slipper du å gå til legen. Les mer om sykmelding og sykepenger eller se
                            filmen Hva skjer etter at jeg har sendt sykmeldingen?
                        </Normaltekst>
                    }
                />
                <TidslinjeElement erEkspanderbar={true} tittel={'Snakk med arbeidsgiveren din'} />
                <TidslinjeElement erEkspanderbar={false} tittel={'4 uker'} />
                <TidslinjeElement erEkspanderbar={true} tittel={'Snakk med arbeidsgiveren din'} />
                <TidslinjeElement
                    erEkspanderbar={false}
                    erSisteElement={true}
                    tittel={'52 uker: slutt på sykepenger'}
                />
            </span>
        </div>
    );
};

export default TidslinjeSide;
