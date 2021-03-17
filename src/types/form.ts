import { Arbeidsgiver } from './arbeidsgiver';

export enum FeilaktigeOpplysninger {
    PERIODE = 'Periode',
    SYKMELDINGSGRAD_HOY = 'Sykmeldingsgraden er for høy',
    SYKMELDINGSGRAD_LAV = 'Sykmeldingsgraden er for lav',
    ARBEIDSGIVER = 'Arbeidsgiver',
    DIAGNOSE = 'Diagnose',
    ANNET = 'Andre opplysninger',
}

export enum Arbeidssituasjoner {
    ARBEIDSTAKER = 'ARBEIDSTAKER',
    FRILANSER = 'FRILANSER',
    NAERINGSDRIVENDE = 'NAERINGSDRIVENDE',
    ARBEIDSLEDIG = 'ARBEIDSLEDIG',
    ANNEN_ARBEIDSGIVER = 'ANNEN_ARBEIDSGIVER',
    ANNET = 'ANNET',
}
export interface FormInputs {
    opplysningeneErRiktige: boolean;
    feilaktigeOpplysninger: (keyof typeof FeilaktigeOpplysninger)[] | undefined;
    valgtArbeidssituasjon: string | undefined;
    valgtArbeidsgiver: Arbeidsgiver | undefined;
    beOmNyNaermesteLeder: boolean | undefined;
    harAnnetFravaer: boolean | undefined;
    fravaersperioder: { fom: Date; tom: Date }[] | undefined;
    harForsikring: boolean | undefined;
}
