import { SvarUnion_DagerSvar_Fragment, SykmeldingStatusFragment, YesOrNo } from 'queries'

import { EgenmeldingsdagerFormValue } from '../components/FormComponents/Egenmelding/EgenmeldingerField'

export const hasCompletedEgenmeldingsdager = (egenmeldingsperioder?: EgenmeldingsdagerFormValue[] | null): boolean => {
    if (egenmeldingsperioder == null) return false

    const lastElement: EgenmeldingsdagerFormValue = egenmeldingsperioder[egenmeldingsperioder.length - 1]
    return lastElement.harPerioder === YesOrNo.NO
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
