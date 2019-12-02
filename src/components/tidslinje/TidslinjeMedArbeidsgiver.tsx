import React from 'react';
import TidslinjeElement from './TidslinjeElement';
import { Normaltekst } from 'nav-frontend-typografi';
import sykmeldtHvaNa from './svg/sykmeldt-hva-na.svg';
import innen4uker from './svg/medArbeidsgiver/innen-4uker.svg';
import innen7uker from './svg/medArbeidsgiver/innen-7uker.svg';
import innen8uker from './svg/medArbeidsgiver/innen-8uker.svg';
import innen26uker from './svg/medArbeidsgiver/innen-26uker.svg';
import innen39uker from './svg/medArbeidsgiver/innen-39uker.svg';
import sluttfasen3 from './svg/sluttfasen-3.svg';

const TidslinjeMedArbeidsgiver = () => (
    <>
        <TidslinjeElement erForsteElement tittel={'Første sykmeldingsdag'} />
        <TidslinjeElement
            erEkspanderbar
            tittel={'Når du er blitt syk'}
            bilde={sykmeldtHvaNa}
            innhold={
                <Normaltekst>
                    placeholder
                </Normaltekst>
            }
        />
        <TidslinjeElement
            erEkspanderbar
            tittel={'Snakk med arbeidsgiveren din'}
            bilde={innen4uker}
            innhold={
                <Normaltekst>
                    placeholder
                </Normaltekst>
            }
        />
        <TidslinjeElement tittel={'4 uker'} />
        <TidslinjeElement
            erEkspanderbar
            tittel={'Tid for dialogmøte med lederen din'}
            bilde={innen7uker}
            innhold={
                <Normaltekst>
                    placeholder
                </Normaltekst>
            }
        />
        <TidslinjeElement tittel={'7 uker'} />
        <TidslinjeElement
            erEkspanderbar
            tittel={'Oppfyller du aktivitetsplikten?'}
            bilde={innen8uker}
            innhold={
                <Normaltekst>
                    placeholder
                </Normaltekst>
            }
        />
        <TidslinjeElement
            erEkspanderbar
            tittel={'placeholder for nærmeste leder stuff'}
            innhold={
                <Normaltekst>
                    placeholder
                </Normaltekst>
            }
        />
        <TidslinjeElement tittel={'17 uker'} />
        <TidslinjeElement
            erEkspanderbar
            tittel={'Tid for dialogmøte med NAV'}
            bilde={innen26uker}
            innhold={
                <Normaltekst>
                    placeholder
                </Normaltekst>
            }
        />
        <TidslinjeElement tittel={'26 uker'} />
        <TidslinjeElement
            erEkspanderbar
            tittel={'Når du har vært sykmeldt lenge'}
            bilde={innen39uker}
            innhold={
                <Normaltekst>
                    placeholder
                </Normaltekst>
            }
        />
        <TidslinjeElement tittel={'39 uker'} />
        <TidslinjeElement
            erEkspanderbar
            tittel={'Snart slutt på sykepengene'}
            bilde={sluttfasen3}
            innhold={
                <Normaltekst>
                    placeholder
                </Normaltekst>
            }
        />
        <TidslinjeElement erSisteElement tittel={'52 uker: slutt på sykepenger'} />
    </>
);

export default TidslinjeMedArbeidsgiver;
