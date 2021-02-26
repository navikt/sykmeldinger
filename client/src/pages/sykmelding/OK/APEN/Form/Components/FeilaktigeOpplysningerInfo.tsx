import React from 'react';
import { FeilaktigeOpplysninger } from '../../../../../../types/form';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Element, Normaltekst } from 'nav-frontend-typografi';

interface FeilaktigeOpplysningerInfoProps {
    feilaktigeOpplysninger?: (keyof typeof FeilaktigeOpplysninger)[];
}

/**
 * Represents a book.
 * @param {FeilaktigeOpplysninger[] | undefined} title - List of feilaktigeOpplysninger thats checked off in the ApenSykmelding form.
 * @return {JSX.Element | null} JSX element cointaining information about actions the use must take based on the faults present in the sykmelding.
 */
const FeilaktigeOpplysningerInfo = ({ feilaktigeOpplysninger }: FeilaktigeOpplysningerInfoProps) => {
    const trengerNySykmelding =
        feilaktigeOpplysninger?.includes('PERIODE') || feilaktigeOpplysninger?.includes('SYKMELDINGSGRAD_LAV');

    const kanBrukeSykmeldingen_sykmeldingsgradHoyArbeidsgiverDiagnoseAndre =
        feilaktigeOpplysninger?.includes('SYKMELDINGSGRAD_HOY') &&
        feilaktigeOpplysninger?.includes('ARBEIDSGIVER') &&
        feilaktigeOpplysninger?.includes('DIAGNOSE');

    const kanBrukeSykmeldingen_arbeidsgiverDiagnoseAndre =
        feilaktigeOpplysninger?.includes('ARBEIDSGIVER') &&
        feilaktigeOpplysninger.includes('DIAGNOSE') &&
        feilaktigeOpplysninger.includes('ANNET');

    const kanBrukeSykmeldingen_sykmeldingsgradHoyArbeidsgiver =
        feilaktigeOpplysninger?.includes('SYKMELDINGSGRAD_HOY') && feilaktigeOpplysninger.includes('ARBEIDSGIVER');

    const kanBrukeSykmeldingen_arbeidsgiverDiagnose =
        feilaktigeOpplysninger?.includes('ARBEIDSGIVER') && feilaktigeOpplysninger.includes('DIAGNOSE');

    const kanBrukeSykmeldingen_diagnoseAnnet =
        feilaktigeOpplysninger?.includes('DIAGNOSE') && feilaktigeOpplysninger.includes('ANNET');

    const kanBrukeSykmeldingen_sykmeldingsgradHoy = feilaktigeOpplysninger?.includes('SYKMELDINGSGRAD_HOY');

    const kanBrukeSykmeldingen_arbeidsgiver = feilaktigeOpplysninger?.includes('ARBEIDSGIVER');

    const kanBrukeSykmeldingen_diagnose = feilaktigeOpplysninger?.includes('DIAGNOSE');

    const kanBrukeSykmeldingen_annet = feilaktigeOpplysninger?.includes('ANNET');

    if (trengerNySykmelding) {
        return (
            <AlertStripeAdvarsel className="margin-bottom--2">
                <Element>Du trenger ny sykmelding</Element>
                <br />
                Du må avbryte denne sykmeldingen og kontakte den som har sykmeldt deg for å få en ny.
            </AlertStripeAdvarsel>
        );
    }
    if (kanBrukeSykmeldingen_sykmeldingsgradHoyArbeidsgiverDiagnoseAndre) {
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
    }
    if (kanBrukeSykmeldingen_arbeidsgiverDiagnoseAndre) {
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
    }
    if (kanBrukeSykmeldingen_sykmeldingsgradHoyArbeidsgiver) {
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
    } else if (kanBrukeSykmeldingen_arbeidsgiverDiagnose) {
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
    }
    if (kanBrukeSykmeldingen_diagnoseAnnet) {
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
    if (kanBrukeSykmeldingen_sykmeldingsgradHoy) {
        return (
            <AlertStripeInfo className="margin-bottom--2">
                <Element>Du kan likevel bruke denne sykmeldingen</Element>
                <br />
                <Normaltekst>
                    Senere, når du skal fylle ut søknaden om sykepenger, skriver du bare inn hvor mye du faktisk jobbet.
                </Normaltekst>
            </AlertStripeInfo>
        );
    } else if (kanBrukeSykmeldingen_arbeidsgiver) {
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
    } else if (kanBrukeSykmeldingen_diagnose) {
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
    }
    if (kanBrukeSykmeldingen_annet) {
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
