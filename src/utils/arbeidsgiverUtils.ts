import { Arbeidsgiver } from '../fetching/graphql.generated'

export function findValgtArbeidsgiver(
    arbeidsgivere: readonly Arbeidsgiver[],
    orgnummer: string | null,
): Arbeidsgiver | undefined {
    return arbeidsgivere.find((arbeidsgiver) => arbeidsgiver.orgnummer === orgnummer)
}

export function isActiveArbeidsgiver(arbeidsgivere: readonly Arbeidsgiver[], orgnummer: string | null): boolean {
    const valgtArbeidsgiver: Arbeidsgiver | undefined = findValgtArbeidsgiver(arbeidsgivere, orgnummer)
    return valgtArbeidsgiver?.aktivtArbeidsforhold === true && valgtArbeidsgiver.naermesteLeder != null
}
