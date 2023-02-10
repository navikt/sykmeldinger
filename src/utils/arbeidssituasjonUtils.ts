import { ArbeidssituasjonType } from '../fetching/graphql.generated'

export const isArbeidstaker = (arbeidssituasjon?: ArbeidssituasjonType | null): boolean =>
    arbeidssituasjon === ArbeidssituasjonType.ARBEIDSTAKER

export const isFrilanserOrNaeringsdrivende = (arbeidssituasjon?: ArbeidssituasjonType | null): boolean =>
    arbeidssituasjon === ArbeidssituasjonType.FRILANSER || arbeidssituasjon === ArbeidssituasjonType.NAERINGSDRIVENDE
