import React from 'react';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';

interface AnnenArbeidsgiverProps {
    vis: boolean;
}

const AnnenArbeidsgiver = ({ vis }: AnnenArbeidsgiverProps) => {
    if (!vis) {
        return null;
    }

    return (
        <AlertStripeAdvarsel>
            <Tekstomrade>
                Siden du ikke finner arbeidsgiveren din i denne listen, kan du ikke sende sykmeldingen digitalt. Du bør
                spørre arbeidsgiveren din om hvorfor de ikke har registrert deg som arbeidstaker i A-meldingen.
            </Tekstomrade>
            <span className="knapp--sentrer">
                <Knapp htmlType="button">SKRIV UT</Knapp>
            </span>
        </AlertStripeAdvarsel>
    );
};

export default AnnenArbeidsgiver;
