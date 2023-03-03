import { SvarUnion_DagerSvar_Fragment, SykmeldingStatusFragment, YesOrNo } from '../fetching/graphql.generated'

export interface EgenmeldingsdagerForm {
    harPerioder: YesOrNo | null
    datoer: Date[] | null
    hasClickedVidere: boolean | null
}

export const hasCompletedEgenmeldingsdager = (egenmeldingsperioder?: EgenmeldingsdagerForm[] | null): boolean => {
    if (egenmeldingsperioder == null) return false

    const lastElement = egenmeldingsperioder[egenmeldingsperioder.length - 1]
    if (lastElement.harPerioder === YesOrNo.NO) return true

    if (
        lastElement.harPerioder === YesOrNo.YES &&
        !(lastElement.datoer == null || lastElement.datoer.length === 0 || lastElement.hasClickedVidere == null)
    ) {
        return true
    }

    return false
}

export function findEgenmeldingsdager(
    sporsmalOgSvarListe: SykmeldingStatusFragment['sporsmalOgSvarListe'],
): SvarUnion_DagerSvar_Fragment | undefined {
    return sporsmalOgSvarListe
        .flatMap((it) => it.svar)
        .find((it): it is SvarUnion_DagerSvar_Fragment => it.__typename === 'DagerSvar')
}
