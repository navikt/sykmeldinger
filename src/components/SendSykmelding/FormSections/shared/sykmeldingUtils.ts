import { useFormContext } from 'react-hook-form'

import { UriktigeOpplysningerType, YesOrNo } from '../../../../fetching/graphql.generated'
import { FormValues } from '../../SendSykmeldingForm'

export function useShouldArbeidssituasjonShow(): boolean {
    const { watch } = useFormContext<FormValues>()
    const [erOpplysningeneRiktige, uriktigeOpplysninger] = watch(['erOpplysningeneRiktige', 'uriktigeOpplysninger'])

    // Don't show section when user hasn't yet answered question
    if (erOpplysningeneRiktige == null) return false

    // "Yes" should always show the section
    if (erOpplysningeneRiktige === YesOrNo.YES) return true

    // "No" but no uriktigeOpplysninger should not show the section
    if (uriktigeOpplysninger == null || uriktigeOpplysninger.length === 0) return false

    // "No" should show the section if uriktigeOpplysninger is not Periode og SykmeldingsgradForLav
    return !getTrengerNySykmelding(uriktigeOpplysninger)
}

export function getTrengerNySykmelding(uriktigeOpplysninger: UriktigeOpplysningerType[] | null): boolean {
    if (uriktigeOpplysninger == null) return false

    return (
        uriktigeOpplysninger?.includes(UriktigeOpplysningerType.PERIODE) ||
        uriktigeOpplysninger?.includes(UriktigeOpplysningerType.SYKMELDINGSGRAD_FOR_LAV)
    )
}
