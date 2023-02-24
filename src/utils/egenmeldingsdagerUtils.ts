import { SvarUnion_DagerSvar_Fragment, SykmeldingStatusFragment, YesOrNo } from '../fetching/graphql.generated'

export interface EgenmeldingsdagerForm {
    harPerioder: YesOrNo | null
    datoer: Date[] | null
    hasClickedVidere: boolean | null
}

export const hasCompletedEgenmeldingsdager = (egenmeldingsperioder?: EgenmeldingsdagerForm[] | null): boolean =>
    egenmeldingsperioder != null && egenmeldingsperioder[egenmeldingsperioder.length - 1].harPerioder === YesOrNo.NO

export function findEgenmeldingsdager(
    sporsmalOgSvarListe: SykmeldingStatusFragment['sporsmalOgSvarListe'],
): SvarUnion_DagerSvar_Fragment | undefined {
    return sporsmalOgSvarListe
        .flatMap((it) => it.svar)
        .find((it): it is SvarUnion_DagerSvar_Fragment => it.__typename === 'DagerSvar')
}
