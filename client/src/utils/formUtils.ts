import { Arbeidsgiver } from '../types/arbeidsgiver';
import { RadioPanelProps } from 'nav-frontend-skjema';
import { Periode } from '../types/sykmelding';
import { Arbeidssituasjoner } from '../types/form';

// helper function for infering types with Object.entries
export const getEntries = <T extends {}>(object: T): Array<[keyof T, T[keyof T]]> =>
    Object.entries(object) as Array<[keyof T, T[keyof T]]>;

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
