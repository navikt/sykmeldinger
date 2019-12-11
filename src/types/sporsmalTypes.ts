import { CustomLocale } from "flatpickr/dist/types/locale";

export enum Skjemafelt {
    OPPLYSNINGENE_ER_RIKTIGE = 'opplysningeneErRiktige',
    PERIODE = 'periode',
    SYKMELDINGSGRAD = 'sykmeldingsgrad',
    ARBEIDSGIVER = 'arbeidsgiver',
    DIAGNOSE = 'diagnose',
    ANDRE_OPPLYSNINGER = 'andreOpplysninger',
    SYKMELDT_FRA = 'sykmeldtFra',
    OPPFOLGING = 'oppfolging',
    FRILANSER_EGENMELDING = 'frilanserEgenmelding',
    EGENMELDINGSPERIODER = 'egenmeldingsperioder',
    FRILANSER_FORSIKRING = 'frilanserForsikring',
}

export enum JaEllerNei {
    JA = 'ja',
    NEI = 'nei',
}

export enum Arbeidsforhold {
    ARBEIDSGIVER = 'arbeidsgiver',
    SELSTENDIG_NARINGSDRIVENDE = 'selvstendigNaringsdrivende',
    FRILANSER = 'frilanser',
    ANNEN_ARBEIDSGIVER = 'annenArbeidsgiver',
    ARBEIDSLEDIG = 'arbeidsledig',
    INGENTING_PASSER = 'ingentingPasser',
}

export const locale: CustomLocale = {
    rangeSeparator: ' til ',
    firstDayOfWeek: 1,
    weekdays: {
        shorthand: ['søn', 'man', 'tirs', 'ons', 'tors', 'fre', 'lør'],
        longhand: ['søndag', 'mandag', 'tirsadg', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
    },
    months: {
        shorthand: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'],
        longhand: [
            'januar',
            'februar',
            'mars',
            'april',
            'mai',
            'juni',
            'juli',
            'aug',
            'september',
            'oktober',
            'november',
            'desember',
        ],
    },
};
