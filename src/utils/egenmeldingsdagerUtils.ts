import { EgenmeldingsdagerFormValue } from '../components/FormComponents/Egenmelding/EgenmeldingerField'
import { SvarUnion_DagerSvar_Fragment, SykmeldingStatusFragment, YesOrNo } from '../fetching/graphql.generated'

export const hasCompletedEgenmeldingsdager = (egenmeldingsperioder?: EgenmeldingsdagerFormValue[] | null): boolean => {
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
): SvarUnion_DagerSvar_Fragment | null {
    return (
        sporsmalOgSvarListe
            .flatMap((it) => it.svar)
            .find((it): it is SvarUnion_DagerSvar_Fragment => it.__typename === 'DagerSvar') ?? null
    )
}
