import React from 'react';
import AlertStripe, { AlertStripeType } from 'nav-frontend-alertstriper';
import { Element, Normaltekst } from 'nav-frontend-typografi';

interface AlertStripeHjelperProps {
    vis: boolean;
    type: AlertStripeType;
    tittel?: string;
    tekst: string;
}

export const AlertStripeHjelper = ({ vis, type, tittel, tekst }: AlertStripeHjelperProps) => {
    if (!vis) {
        return null;
    }

    return (
        <AlertStripe type={type}>
            {!!tittel && <Element>{tittel}</Element>}
            <Normaltekst>{tekst}</Normaltekst>
        </AlertStripe>
    );
};
