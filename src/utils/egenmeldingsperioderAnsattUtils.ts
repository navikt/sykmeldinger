import { YesOrNo } from '../fetching/graphql.generated'

//TODO: temporary types
export interface EgenmeldingsperioderAnsattForm {
    harPerioder: YesOrNo | null
    datoer: Date[] | null
    hasClickedVidere: boolean | null
}

export const hasCompletedEgenmeldingsperioderAnsatt = (
    egenmeldingsperioder?: EgenmeldingsperioderAnsattForm[] | null,
): boolean =>
    egenmeldingsperioder != null && egenmeldingsperioder[egenmeldingsperioder.length - 1].harPerioder === YesOrNo.NO
