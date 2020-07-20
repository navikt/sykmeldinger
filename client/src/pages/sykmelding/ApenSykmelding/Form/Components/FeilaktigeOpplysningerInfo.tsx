import React from 'react';
import { FeilaktigeOpplysninger } from '../../../../../types/form';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Element, Normaltekst } from 'nav-frontend-typografi';

interface FeilaktigeOpplysningerInfoProps {
    feilaktigeOpplysninger?: (keyof typeof FeilaktigeOpplysninger)[];
}

const FeilaktigeOpplysningerInfo = ({ feilaktigeOpplysninger }: FeilaktigeOpplysningerInfoProps) => {
    if (feilaktigeOpplysninger?.includes('PERIODE') || feilaktigeOpplysninger?.includes('SYKMELDINGSGRAD_LAV')) {
        return (
            <AlertStripeAdvarsel className="margin-bottom--2">
                <Element>Du trenger ny sykmelding</Element>
                <br />
                Du må avbryte denne sykmeldingen og kontakte den som har sykmeldt deg for å få en ny.
            </AlertStripeAdvarsel>
        );
    } else if (
        feilaktigeOpplysninger?.includes('SYKMELDINGSGRAD_HOY') &&
        feilaktigeOpplysninger?.includes('ARBEIDSGIVER') &&
        feilaktigeOpplysninger?.includes('DIAGNOSE')
    ) {
        return (
            <AlertStripeInfo className="margin-bottom--2">
                <Element>Du kan likevel bruke denne sykmeldingen</Element>
                <br />
                <Normaltekst>
                    Når du senere skal fylle ut søknaden om sykepenger, skriver du inn hvor mye du faktisk jobbet.
                </Normaltekst>
                <br />
                <Normaltekst>
                    I neste trinn velger du riktig arbeidsgiver. Hvis sykmeldingen senere skal forlenges, må du gi
                    beskjed til den som sykmelder deg om at den inneholder feil.
                </Normaltekst>
            </AlertStripeInfo>
        );
    } else if (
        feilaktigeOpplysninger?.includes('ARBEIDSGIVER') &&
        feilaktigeOpplysninger.includes('DIAGNOSE') &&
        feilaktigeOpplysninger.includes('ANNET')
    ) {
        return (
            <AlertStripeInfo className="margin-bottom--2">
                <Element>Du kan likevel bruke denne sykmeldingen</Element>
                <br />
                <Normaltekst>I neste trinn velger du riktig arbeidsgiver.</Normaltekst>
                <br />
                <Normaltekst>
                    Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at den
                    inneholder feil.
                </Normaltekst>
            </AlertStripeInfo>
        );
    } else if (
        feilaktigeOpplysninger?.includes('SYKMELDINGSGRAD_HOY') &&
        feilaktigeOpplysninger.includes('ARBEIDSGIVER')
    ) {
        return (
            <AlertStripeInfo className="margin-bottom--2">
                <Element>Du kan likevel bruke denne sykmeldingen</Element>
                <br />
                <Normaltekst>
                    Når du senere skal fylle ut søknaden om sykepenger, skriver du inn hvor mye du faktisk jobbet.
                </Normaltekst>
                <br />
                <Normaltekst>
                    I neste trinn velger du riktig arbeidsgiver. Obs: Feilen vil være synlig for arbeidsgiveren du
                    sender sykmeldingen til.
                </Normaltekst>
            </AlertStripeInfo>
        );
    } else if (feilaktigeOpplysninger?.includes('ARBEIDSGIVER') && feilaktigeOpplysninger.includes('DIAGNOSE')) {
        return (
            <AlertStripeInfo className="margin-bottom--2">
                <Element>Du kan likevel bruke denne sykmeldingen</Element>
                <br />
                <Normaltekst>I neste trinn velger du riktig arbeidsgiver.</Normaltekst>
                <br />
                <Normaltekst>
                    Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at diagnosen
                    er feil.
                </Normaltekst>
            </AlertStripeInfo>
        );
    } else if (feilaktigeOpplysninger?.includes('DIAGNOSE') && feilaktigeOpplysninger.includes('ANNET')) {
        return (
            <AlertStripeInfo className="margin-bottom--2">
                <Element>Du kan likevel bruke denne sykmeldingen</Element>
                <br />
                <Normaltekst>
                    Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at den
                    inneholder feil.
                </Normaltekst>
            </AlertStripeInfo>
        );
    } else if (feilaktigeOpplysninger?.includes('SYKMELDINGSGRAD_HOY')) {
        return (
            <AlertStripeInfo className="margin-bottom--2">
                <Element>Du kan likevel bruke denne sykmeldingen</Element>
                <br />
                <Normaltekst>
                    Senere, når du skal fylle ut søknaden om sykepenger, skriver du bare inn hvor mye du faktisk jobbet.
                </Normaltekst>
            </AlertStripeInfo>
        );
    } else if (feilaktigeOpplysninger?.includes('ARBEIDSGIVER')) {
        return (
            <AlertStripeInfo className="margin-bottom--2">
                <Element>Du kan likevel bruke denne sykmeldingen</Element>
                <br />
                <Normaltekst>
                    I neste trinn velger du riktig arbeidsgiver. Obs: Feilen vil være synlig for arbeidsgiveren du
                    sender sykmeldingen til.
                </Normaltekst>
            </AlertStripeInfo>
        );
    } else if (feilaktigeOpplysninger?.includes('DIAGNOSE')) {
        return (
            <AlertStripeInfo className="margin-bottom--2">
                <Element>Du kan likevel bruke denne sykmeldingen</Element>
                <br />
                <Normaltekst>
                    Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at diagnosen
                    er feil.
                </Normaltekst>
            </AlertStripeInfo>
        );
    } else if (feilaktigeOpplysninger?.includes('ANNET')) {
        return (
            <AlertStripeInfo className="margin-bottom--2">
                <Element>Du kan likevel bruke denne sykmeldingen</Element>
                <br />
                <Normaltekst>
                    Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at den
                    inneholder feil.
                </Normaltekst>
            </AlertStripeInfo>
        );
    }

    return null;
};

export default FeilaktigeOpplysningerInfo;
