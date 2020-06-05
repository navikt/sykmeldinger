import Arbeidsgiver from '../../../../../types/arbeidsgiverTypes';

export type RequiresOneOf = {
    name: Skjemafelt;
    startsWith?: string;
    requiredValue?: string;
    requiredValues?: string[];
};

export type RequiresNoneOf = {
    name: Skjemafelt;
    values: string[];
};

export type ValidationProps = {
    arbeidsgivere?: Arbeidsgiver[];
};

export type ValidatorType = {
    test: (value?: string | string[] | string[][]) => boolean;
    failText: string;
    failTextReplacement?: (fieldValues: FieldValuesType, failText: string, props: ValidationProps) => string;
    requiresOneOf?: RequiresOneOf[];
    requiresNoneOf?: RequiresNoneOf[];
};

export enum Skjemafelt {
    OPPLYSNINGENE_ER_RIKTIGE = 'opplysningeneErRiktige',
    SYKMELDT_FRA = 'sykmeldtFra',
    OPPFOLGING = 'oppfolging',
    FRILANSER_EGENMELDING = 'frilanserEgenmelding',
    EGENMELDINGSPERIODER = 'egenmeldingsperioder',
    FRILANSER_FORSIKRING = 'frilanserForsikring',
    FEIL_OPPLYSNINGER = 'feilOpplysninger',
}

export enum FeilOpplysninger {
    PERIODE = 'periode',
    SYKMELDINGSGRAD = 'sykmeldingsgrad',
    ARBEIDSGIVER = 'arbeidsgiver',
    DIAGNOSE = 'diagnose',
    ANDRE_OPPLYSNINGER = 'andreOpplysninger',
}

export enum JaEllerNei {
    JA = 'ja',
    NEI = 'nei',
}

export enum Arbeidsforhold {
    ARBEIDSGIVER = 'arbeidsgiver',
    SELVSTENDIG_NARINGSDRIVENDE = 'selvstendigNaringsdrivende',
    FRILANSER = 'frilanser',
    ANNEN_ARBEIDSGIVER = 'annenArbeidsgiver',
    ARBEIDSLEDIG = 'arbeidsledig',
    INGENTING_PASSER = 'ingentingPasser',
}

export type FieldValuesType = {
    [Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE]: JaEllerNei | undefined;
    [Skjemafelt.SYKMELDT_FRA]: Arbeidsforhold | undefined;
    [Skjemafelt.FRILANSER_EGENMELDING]: string | undefined;
    [Skjemafelt.EGENMELDINGSPERIODER]: string[][];
    [Skjemafelt.FRILANSER_FORSIKRING]: JaEllerNei | undefined;
    [Skjemafelt.OPPFOLGING]: JaEllerNei | undefined;
    [Skjemafelt.FEIL_OPPLYSNINGER]: string[];
};

export type ErrorsSchemaType = {
    [Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE]: string | null;
    [Skjemafelt.SYKMELDT_FRA]: string | null;
    [Skjemafelt.FRILANSER_EGENMELDING]: string | null;
    [Skjemafelt.EGENMELDINGSPERIODER]: string | null;
    [Skjemafelt.FRILANSER_FORSIKRING]: string | null;
    [Skjemafelt.OPPFOLGING]: string | null;
    [Skjemafelt.FEIL_OPPLYSNINGER]: string | null;
};

export type ValidatorSchemaType = {
    [Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE]: ValidatorType[];
    [Skjemafelt.SYKMELDT_FRA]: ValidatorType[];
    [Skjemafelt.FRILANSER_EGENMELDING]: ValidatorType[];
    [Skjemafelt.EGENMELDINGSPERIODER]: ValidatorType[];
    [Skjemafelt.FRILANSER_FORSIKRING]: ValidatorType[];
    [Skjemafelt.OPPFOLGING]: ValidatorType[];
    [Skjemafelt.FEIL_OPPLYSNINGER]: ValidatorType[];
};
