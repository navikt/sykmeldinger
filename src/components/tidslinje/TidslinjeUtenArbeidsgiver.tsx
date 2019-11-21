import React from 'react';
import TidslinjeElement from './TidslinjeElement';
import { Normaltekst } from 'nav-frontend-typografi';
import sykmeldtHvaNa from './svg/sykmeldt-hva-na.svg';
import innen8uker from './svg/utenArbeigsgiver/innen-8uker.svg';
import innen12uker from './svg/utenArbeigsgiver/innen-12uker.svg';
import innen39uker from './svg/utenArbeigsgiver/innen-39uker.svg';
import sluttfasen3 from './svg/sluttfasen-3.svg';

const TidslinjeUtenArbeidsgiver = () => (
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
            tittel={'Har du vurdert din mulighet for å være i aktivitet?'}
            bilde={innen8uker}
            innhold={
                <Normaltekst>
                    placeholder
                </Normaltekst>
            }
        />
        <TidslinjeElement tittel={'8 uker'} />
        <TidslinjeElement
            erEkspanderbar
            tittel={'Har du snakket med en veileder på NAV-kontoret?'}
            bilde={innen12uker}
            innhold={
                <Normaltekst>
                    placeholder
                </Normaltekst>
            }
        />
        <TidslinjeElement tittel={'12 uker'} />
        <TidslinjeElement
            erEkspanderbar
            tittel={'Har du og veilederen laget en plan?'}
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

export default TidslinjeUtenArbeidsgiver;
