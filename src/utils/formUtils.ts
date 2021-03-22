import { Arbeidsgiver } from '../types/arbeidsgiver';
import { RadioPanelProps } from 'nav-frontend-skjema';
import { Arbeidssituasjoner, FeilaktigeOpplysninger } from '../types/form';
import Periode from '../types/sykmelding/Periode';

// helper function for infering types with Object.entries
export const getEntries = <T extends {}>(object: T): Array<[keyof T, T[keyof T]]> =>
    Object.entries(object) as Array<[keyof T, T[keyof T]]>;

export const getUpdatedFeilaktigeOpplysninger = (
    value: keyof typeof FeilaktigeOpplysninger,
    feilaktigeOpplysninger: (keyof typeof FeilaktigeOpplysninger)[] | undefined,
): (keyof typeof FeilaktigeOpplysninger)[] => {
    if (!feilaktigeOpplysninger) {
        return [value];
    }

    if (feilaktigeOpplysninger.includes(value)) {
        return feilaktigeOpplysninger.filter((opplysning) => opplysning !== value);
    }

    return [...feilaktigeOpplysninger, value];
};

export const getArbeidssituasjon = (valgtArbeidssituasjon: string | undefined, arbeidsgivere: Arbeidsgiver[]) => {
    if (valgtArbeidssituasjon?.includes(Arbeidssituasjoner.ARBEIDSTAKER)) {
        const arbeidsgiver = arbeidsgivere.find((arbeidsgiver) =>
            valgtArbeidssituasjon?.includes(arbeidsgiver.orgnummer),
        );
        return `${Arbeidssituasjoner.ARBEIDSTAKER}-${arbeidsgiver?.orgnummer}`;
    }
    if (valgtArbeidssituasjon === Arbeidssituasjoner.FRILANSER) {
        return Arbeidssituasjoner.FRILANSER;
    }
    if (valgtArbeidssituasjon === Arbeidssituasjoner.NAERINGSDRIVENDE) {
        return Arbeidssituasjoner.NAERINGSDRIVENDE;
    }
    if (valgtArbeidssituasjon === Arbeidssituasjoner.ANNEN_ARBEIDSGIVER) {
        return Arbeidssituasjoner.ANNEN_ARBEIDSGIVER;
    }
    if (valgtArbeidssituasjon === Arbeidssituasjoner.ARBEIDSLEDIG) {
        return Arbeidssituasjoner.ARBEIDSLEDIG;
    }
    if (valgtArbeidssituasjon === Arbeidssituasjoner.ANNET) {
        return Arbeidssituasjoner.ANNET;
    }
    return undefined;
};

export const getArbeidsgiverRadios = (arbeidsgivere: Arbeidsgiver[]): RadioPanelProps[] => {
    return arbeidsgivere.map((arbeidsgiver) => ({
        label: arbeidsgiver.navn,
        value: `${Arbeidssituasjoner.ARBEIDSTAKER}-${arbeidsgiver.orgnummer}`,
        id: `${Arbeidssituasjoner.ARBEIDSTAKER}-${arbeidsgiver.orgnummer}`,
    }));
};

export const skalViseFrilansersporsmal = (
    valgtArbeidssituasjon: string | undefined,
    erUtenforVentetid: boolean,
    sykmeldingsperioder: Periode[],
): boolean => {
    if (
        valgtArbeidssituasjon === Arbeidssituasjoner.FRILANSER ||
        valgtArbeidssituasjon === Arbeidssituasjoner.NAERINGSDRIVENDE
    ) {
        if (
            !erUtenforVentetid ||
            !sykmeldingsperioder.some(
                (periode) =>
                    periode.type === 'AVVENTENDE' ||
                    periode.type === 'REISETILSKUDD' ||
                    periode.type === 'BEHANDLINGSDAGER',
            )
        ) {
            return true;
        }
    }
    return false;
};
