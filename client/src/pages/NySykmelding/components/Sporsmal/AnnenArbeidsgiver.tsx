import React from 'react';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';

import tekster from './Sporsmal-tekster';

interface AnnenArbeidsgiverProps {
    vis: boolean;
}

const AnnenArbeidsgiver = ({ vis }: AnnenArbeidsgiverProps) => {
    if (!vis) {
        return null;
    }

    return (
        <AlertStripeAdvarsel>
            <Tekstomrade>{tekster['alertstripe.annen-arbeidsgiver']}</Tekstomrade>
            <span className="knapp--sentrer">
                <Knapp htmlType="button">{tekster['skriv-ut']}</Knapp>
            </span>
        </AlertStripeAdvarsel>
    );
};

export default AnnenArbeidsgiver;
