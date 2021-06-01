import { Feiloppsummering, FeiloppsummeringFeil } from 'nav-frontend-skjema';
import React, { useEffect, useRef } from 'react';
import { DeepMap, FieldErrors } from 'react-hook-form';
import { FormShape } from './Form';

interface FeiloppsummeringContainerProps {
    errors: DeepMap<FormShape, FieldErrors>;
}

interface CustomErrors extends Record<keyof FormShape, string | undefined> {}

const FeiloppsummeringContainer: React.FC<FeiloppsummeringContainerProps> = ({ errors }) => {
    const summaryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        summaryRef.current?.focus();
    }, [errors, summaryRef]);

    const customErrors: CustomErrors = {
        erOpplysningeneRiktige: errors.erOpplysningeneRiktige?.svar?.message,
        // safe for now, but could be refactored
        // @ts-ignore
        uriktigeOpplysninger: errors.uriktigeOpplysninger?.svar?.message,
        arbeidssituasjon: errors.arbeidssituasjon?.svar?.message,
        arbeidsgiverOrgnummer: errors.arbeidsgiverOrgnummer?.svar?.message,
        riktigNarmesteLeder: errors.riktigNarmesteLeder?.svar?.message,
        harBruktEgenmelding: errors.harBruktEgenmelding?.svar?.message,
        egenmeldingsperioder:
            errors.egenmeldingsperioder?.svar?.find((ep) => ep?.fom)?.fom?.message ||
            errors.egenmeldingsperioder?.svar?.find((ep) => ep?.tom)?.tom?.message,
        harForsikring: errors.harForsikring?.svar?.message,
    };

    const feiloppsummeringsfeil: FeiloppsummeringFeil[] = Object.entries(customErrors)
        .filter(([_key, value]) => value !== undefined)
        .map(([key, value]) => ({ skjemaelementId: key, feilmelding: value }));

    if (feiloppsummeringsfeil.length === 0) {
        return null;
    }

    return (
        <Feiloppsummering
            innerRef={summaryRef}
            tittel="For å gå videre må du rette opp følgende:"
            feil={feiloppsummeringsfeil}
        />
    );
};

export default FeiloppsummeringContainer;
