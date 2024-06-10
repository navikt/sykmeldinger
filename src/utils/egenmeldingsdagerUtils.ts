import * as R from 'remeda'

import { SvarUnion_DagerSvar_Fragment, SykmeldingStatusFragment, YesOrNo } from 'queries'

import {
    EgenmeldingsdagerFormValue,
    MAX_EGENMELDINGSDAGER,
} from '../components/FormComponents/Egenmelding/EgenmeldingerField'

const hasMoreThan16Dates: (perioder: EgenmeldingsdagerFormValue[]) => boolean = R.piped(
    R.flatMap(R.prop('datoer')),
    R.filter(R.isTruthy),
    R.length(),
    (it) => it >= MAX_EGENMELDINGSDAGER,
)

export const hasCompletedEgenmeldingsdager = (egenmeldingsperioder?: EgenmeldingsdagerFormValue[] | null): boolean => {
    if (egenmeldingsperioder == null) return false

    const lastElement: EgenmeldingsdagerFormValue = egenmeldingsperioder[egenmeldingsperioder.length - 1]

    if (hasMoreThan16Dates(egenmeldingsperioder) && lastElement.hasClickedVidere) return true

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
