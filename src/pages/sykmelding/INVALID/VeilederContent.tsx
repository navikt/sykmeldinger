import './VeilederContent.less';

import React from 'react';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { Sykmelding } from '../../../models/Sykmelding/Sykmelding';
import Behandler from '../../../models/Sykmelding/Behandler';

interface VeilederContentProps {
    sykmelding: Sykmelding;
}

const VeilederContent: React.FC<VeilederContentProps> = ({ sykmelding }) => {
    const createLegenavn = (behandler: Behandler) => {
        const { fornavn, mellomnavn, etternavn } = behandler;
        let navn = fornavn;
        if (mellomnavn) {
            navn += ` ${mellomnavn}`;
        }
        if (etternavn) {
            navn += ` ${etternavn}`;
        }
        return navn;
    };

    const legenavn = createLegenavn(sykmelding.behandler);

    return (
        <>
            <Undertittel className="veiledercontent__title">Sykmeldingen kan dessverre ikke brukes</Undertittel>
            <hr aria-hidden className="veiledercontent__underline" />
            <Normaltekst>Beklager at vi må bry deg mens du er syk.</Normaltekst>
            <br />
            <Normaltekst>
                Du trenger en ny sykmelding fordi det er gjort en feil i utfyllingen. Vi har gitt beskjed til {legenavn}{' '}
                om hva som er feil, og at du må få en ny sykmelding.
            </Normaltekst>
            <br />
            <Normaltekst>
                Når du har fått ny sykmelding fra {legenavn}, får du en ny beskjed fra oss om å logge deg inn på nav.no
                slik at du kan sende inn sykmeldingen. Går det mange dager, bør du kontakte {legenavn} som skal skrive
                den nye sykmeldingen.
            </Normaltekst>
            <br />
            <Element>Grunnen til at sykmeldingen er avvist:</Element>
            <ul>
                {sykmelding.behandlingsutfall.ruleHits.map((ruleHit, index) => (
                    <li key={index}>
                        <Normaltekst>{ruleHit.messageForUser}</Normaltekst>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default VeilederContent;
