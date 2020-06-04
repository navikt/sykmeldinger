import { FeiloppsummeringFeil, RadioPanelProps } from 'nav-frontend-skjema';

import Arbeidsgiver from '../../../../types/arbeidsgiverTypes';
import {
    Arbeidsforhold,
    ErrorsSchemaType,
    FeilOpplysninger,
    FieldValuesType,
    JaEllerNei,
    Skjemafelt,
} from './skjemaTypes';

export const getErrorMessages = (errors: ErrorsSchemaType) => {
    const definedErrors = Object.entries(errors).filter(([_key, value]) => !!value);

    const errorMessages = definedErrors.map(
        ([key, value]) =>
            ({
                skjemaelementId: `b-${key}`,
                feilmelding: value,
            } as FeiloppsummeringFeil),
    );

    return errorMessages;
};

export const clearDependentValues = (name: Skjemafelt, errors: ErrorsSchemaType, fieldValues: FieldValuesType) => {
    let updatedFieldValues = { ...fieldValues };
    let updatedErrors = { ...errors };

    if (name === Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE) {
        updatedFieldValues = {
            ...updatedFieldValues,
            [Skjemafelt.SYKMELDT_FRA]: undefined,
            [Skjemafelt.FEIL_OPPLYSNINGER]: [],
        };
        updatedErrors = { ...errors, [Skjemafelt.SYKMELDT_FRA]: null, [Skjemafelt.FEIL_OPPLYSNINGER]: null };
    }

    if (name === Skjemafelt.SYKMELDT_FRA) {
        updatedFieldValues = {
            ...updatedFieldValues,
            [Skjemafelt.OPPFOLGING]: undefined,
            [Skjemafelt.FRILANSER_EGENMELDING]: undefined,
            [Skjemafelt.EGENMELDINGSPERIODER]: [[]],
            [Skjemafelt.FRILANSER_FORSIKRING]: undefined,
        };
        updatedErrors = {
            ...errors,
            [Skjemafelt.OPPFOLGING]: null,
            [Skjemafelt.FRILANSER_EGENMELDING]: null,
            [Skjemafelt.EGENMELDINGSPERIODER]: null,
            [Skjemafelt.FRILANSER_FORSIKRING]: null,
        };
    }

    if (name === Skjemafelt.FEIL_OPPLYSNINGER) {
        updatedFieldValues = {
            ...updatedFieldValues,
            [Skjemafelt.SYKMELDT_FRA]: undefined,
            [Skjemafelt.OPPFOLGING]: undefined,
            [Skjemafelt.FRILANSER_EGENMELDING]: undefined,
            [Skjemafelt.FRILANSER_FORSIKRING]: undefined,
        };
        updatedErrors = {
            ...errors,
            [Skjemafelt.SYKMELDT_FRA]: null,
            [Skjemafelt.OPPFOLGING]: null,
            [Skjemafelt.FRILANSER_EGENMELDING]: null,
            [Skjemafelt.FRILANSER_FORSIKRING]: null,
        };
    }

    return { updatedFieldValues, updatedErrors };
};

export const hentValgtArbeidsgiver = (fieldValues: FieldValuesType, arbeidsgivere: Arbeidsgiver[]) => {
    if (fieldValues[Skjemafelt.SYKMELDT_FRA]?.startsWith(Arbeidsforhold.ARBEIDSGIVER)) {
        const orgnummer = fieldValues[Skjemafelt.SYKMELDT_FRA]?.split('-')[1];
        return arbeidsgivere.find(arbeidsgiver => arbeidsgiver.orgnummer === orgnummer);
    }

    return null;
};

export const hentValgtArbeidsgiverNaermesteLederNavn = (
    fieldValues: FieldValuesType,
    arbeidsgivere: Arbeidsgiver[] | null | undefined,
) => {
    if (!arbeidsgivere) {
        return null;
    }

    const arbeidsgiver = hentValgtArbeidsgiver(fieldValues, arbeidsgivere);
    return arbeidsgiver?.naermesteLeder.navn;
};

export const hentArbeidsGiverRadios = (arbeidsgivere: Arbeidsgiver[] | null) => {
    if (!arbeidsgivere) {
        return [];
    }

    return arbeidsgivere.map((arbeidsgiver, index) => {
        const radio: RadioPanelProps = {
            label: `${arbeidsgiver.navn} (Org. nummer: ${arbeidsgiver.orgnummer})`,
            value: Arbeidsforhold.ARBEIDSGIVER.concat('-', arbeidsgiver.orgnummer),
        };

        if (index === 0) {
            return { ...radio, id: `b-${Arbeidsforhold.ARBEIDSGIVER}` };
        }
        return radio;
    });
};

export const brukerTrengerNySykmelding = (fieldValues: FieldValuesType) => {
    if (
        fieldValues[Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE] === JaEllerNei.NEI &&
        fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].some(feil =>
            [FeilOpplysninger.PERIODE, FeilOpplysninger.SYKMELDINGSGRAD].includes(feil as FeilOpplysninger),
        )
    ) {
        return true;
    }

    const sykmeldtFra = fieldValues[Skjemafelt.SYKMELDT_FRA];

    if (sykmeldtFra) {
        if (sykmeldtFra.includes(Arbeidsforhold.ANNEN_ARBEIDSGIVER)) {
            return true;
        }
    }

    return false;
};
