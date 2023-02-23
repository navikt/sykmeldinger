import { ShortName, Sporsmal, YesOrNo } from '../fetching/graphql.generated'

export interface EgenmeldingsperioderAnsattForm {
    harPerioder: YesOrNo | null
    datoer: Date[] | null
    hasClickedVidere: boolean | null
}

export const hasCompletedEgenmeldingsperioderAnsatt = (
    egenmeldingsperioder?: EgenmeldingsperioderAnsattForm[] | null,
): boolean =>
    egenmeldingsperioder != null && egenmeldingsperioder[egenmeldingsperioder.length - 1].harPerioder === YesOrNo.NO

export function findEgenmeldingsdager(sporsmalOgSvarListe: readonly Sporsmal[]): string | undefined {
    return sporsmalOgSvarListe.find(
        (sporsmalOgSvar: Sporsmal) => sporsmalOgSvar.shortName === ShortName.EGENMELDINGSDAGER,
    )?.svar.svar
}
