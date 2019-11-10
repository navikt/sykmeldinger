import React from 'react';
import TidslinjeElement from './TidslinjeElement';
import { Normaltekst } from 'nav-frontend-typografi';
import sykmeldtHvaNa from './svg/sykmeldt-hva-na.svg';
import innen4uker from './svg/innen-4uker.svg';
import innen7uker from './svg/innen-7uker.svg';
import innen8uker from './svg/innen-8uker.svg';
import innen26uker from './svg/innen-26uker.svg';
import innen39uker from './svg/innen-39uker.svg';
import sluttfasen3 from './svg/sluttfasen-3.svg';

const TidslinjeMedArbeidsgiver: React.FC = () => (
    <>
        <TidslinjeElement erEkspanderbar={false} erForsteElement={true} tittel={'Første sykmeldingsdag'} />
        <TidslinjeElement
            erEkspanderbar={true}
            tittel={'Når du er blitt syk'}
            bilde={sykmeldtHvaNa}
            innhold={
                <Normaltekst>
                    Du bestemmer selv om du vil bruke sykmeldingen eller avbryte den. Du kan også jobbe i kombinasjon
                    med sykmelding. Det kommer an på hva sykdommen din tillater og hva det er praktisk mulig å få til på
                    arbeidsplassen. Greit å vite: Arbeidsgiveren har plikt til å legge til rette for at du kan jobbe
                    helt eller delvis selv om du er syk. Husk at du alltid kan vurdere gradert sykmelding. Vet du at
                    fraværet blir kort, kan det være like greit med egenmelding, så slipper du å gå til legen. Les mer
                    om sykmelding og sykepenger eller se filmen Hva skjer etter at jeg har sendt sykmeldingen?
                </Normaltekst>
            }
        />
        <TidslinjeElement
            erEkspanderbar={true}
            tittel={'Snakk med arbeidsgiveren din'}
            bilde={innen4uker}
            innhold={'placeholder'}
        />
        <TidslinjeElement erEkspanderbar={false} tittel={'4 uker'} />
        <TidslinjeElement
            erEkspanderbar={true}
            tittel={'Tid for dialogmøte med lederen din'}
            bilde={innen7uker}
            innhold={'placeholder'}
        />
        <TidslinjeElement erEkspanderbar={false} tittel={'7 uker'} />
        <TidslinjeElement
            erEkspanderbar={true}
            tittel={'Oppfyller du aktivitetsplikten?'}
            bilde={innen8uker}
            innhold={'placeholder'}
        />
        <TidslinjeElement
            erEkspanderbar={true}
            tittel={'placeholder for nærmeste leder stuff'}
            innhold={'placeholder'}
        />
        <TidslinjeElement erEkspanderbar={false} tittel={'17 uker'} />
        <TidslinjeElement
            erEkspanderbar={true}
            tittel={'Tid for dialogmøte med NAV'}
            bilde={innen26uker}
            innhold={'placeholder'}
        />
        <TidslinjeElement erEkspanderbar={false} tittel={'26 uker'} />
        <TidslinjeElement
            erEkspanderbar={true}
            tittel={'Når du har vært sykmeldt lenge'}
            bilde={innen39uker}
            innhold={'placeholder'}
        />
        <TidslinjeElement erEkspanderbar={false} tittel={'39 uker'} />
        <TidslinjeElement
            erEkspanderbar={true}
            tittel={'Snart slutt på sykepengene'}
            bilde={sluttfasen3}
            innhold={'placeholder'}
        />
        <TidslinjeElement erEkspanderbar={false} erSisteElement={true} tittel={'52 uker: slutt på sykepenger'} />
    </>
);

export default TidslinjeMedArbeidsgiver;
