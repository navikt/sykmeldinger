import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

interface ForklaringAndreProps {
    behandlerNavn: string;
}

const ForklaringAndre: React.FC<ForklaringAndreProps> = ({ behandlerNavn }) => {
    return (
        <>
            <Normaltekst>
                Du trenger en ny sykmelding fordi det er gjort en feil i utfyllingen. Vi har gitt beskjed til{' '}
                {behandlerNavn} om hva som er feil, og at du må få en ny sykmelding.
            </Normaltekst>
            <br />
            <Normaltekst>
                Når du har fått ny sykmelding fra {behandlerNavn}, får du en ny beskjed fra oss om å logge deg
                inn på nav.no slik at du kan sende inn sykmeldingen. Går det mange dager, bør du kontakte{' '}
                {behandlerNavn} som skal skrive den nye sykmeldingen.
            </Normaltekst>
        </>
    );
};

export default ForklaringAndre;
