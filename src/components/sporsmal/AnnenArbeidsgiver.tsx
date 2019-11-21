import React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Tekstomrade from 'nav-frontend-tekstomrade';
import tekster from './sporsmal-tekster';
import { Knapp } from 'nav-frontend-knapper';

interface AnnenArbeidsgiverProps {
    vis: boolean;
}

const AnnenArbeidsgiver = ({ vis }: AnnenArbeidsgiverProps) => {
    if (vis) {
        return (
            <AlertStripeAdvarsel>
                <Tekstomrade>{tekster['alertstripe.annen-arbeidsgiver']}</Tekstomrade>
                <span className="knapp--sentrer">
                    <Knapp htmlType="button">{tekster['skriv-ut']}</Knapp>
                </span>
            </AlertStripeAdvarsel>
        );
    }

    return <></>;
};

export default AnnenArbeidsgiver;
