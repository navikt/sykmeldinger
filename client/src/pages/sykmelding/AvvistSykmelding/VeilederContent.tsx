import './VeilederContent.less';

import React from 'react';
import { Systemtittel, Element, Normaltekst } from 'nav-frontend-typografi';

import Begrunnelser from './Begrunnelser';
import { Behandler, Sykmelding } from '../../../types/sykmeldingTypes';

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

const getIntro = (sykmelding: Sykmelding) => {
    const legenavn = createLegenavn(sykmelding.behandler);
    return `Du trenger en ny sykmelding fordi det er gjort en feil i utfyllingen. Vi har gitt beskjed til ${legenavn} om hva som er feil, og at du må få en ny sykmelding.`;
};

const getReason = (sykmelding: Sykmelding) => {
    // TODO: Is the reason collected directly from the sykmelding object?
    const reason = 'Første sykmelding er tilbakedatert mer enn det som er tillatt.';

    return reason;
};

interface VeilederContentProps {
    sykmelding: Sykmelding;
}

const VeilederContent = ({ sykmelding }: VeilederContentProps) => {
    const intro = getIntro(sykmelding);
    const legenavn = createLegenavn(sykmelding.behandler);
    const reason = getReason(sykmelding);

    return (
        <>
            <Systemtittel className="veiledercontent__title">Sykmeldingen kan dessverre ikke brukes</Systemtittel>
            <hr className="veiledercontent__border" />
            <>
                <Normaltekst>Beklager at vi må bry deg mens du er syk.</Normaltekst>
                <br />
                <Normaltekst>{intro}</Normaltekst>
                <br />
                <Normaltekst>
                    Når du har fått ny sykmelding fra {legenavn}, får du en ny beskjed fra oss om å logge deg inn på
                    nav.no slik at du kan sende inn sykmeldingen. Går det mange dager, bør du kontakte {legenavn} som
                    skal skrive den nye sykmeldingen.
                </Normaltekst>
            </>

            <br />

            <>
                <Element>Grunnen til at sykmeldingen er avvist:</Element>
                <Normaltekst>{reason}</Normaltekst>
            </>
            <Begrunnelser sykmelding={sykmelding} />
        </>
    );
};

export default VeilederContent;
