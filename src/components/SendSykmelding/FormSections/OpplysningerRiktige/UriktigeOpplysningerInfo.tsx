import { ReactElement } from 'react'
import { Alert, Heading } from '@navikt/ds-react'

import { UriktigeOpplysningerType } from 'queries'

interface UriktigeOpplysningerInfoProps {
    uriktigeOpplysninger: UriktigeOpplysningerType[]
}

function UriktigeOpplysningerInfo({ uriktigeOpplysninger }: UriktigeOpplysningerInfoProps): ReactElement | null {
    return (
        <Alert variant="info" role="alert" aria-live="polite" className="my-8">
            <Heading spacing size="small" level="3">
                Du kan fortsatt bruke sykmeldingen
            </Heading>
            <ul>
                {uriktigeOpplysninger.map((value) => (
                    <li key={value}>{uriktigeOpplysningerEnumToText(value)}</li>
                ))}
            </ul>
        </Alert>
    )
}

function uriktigeOpplysningerEnumToText(value: UriktigeOpplysningerType): string {
    switch (value) {
        case UriktigeOpplysningerType.ANDRE_OPPLYSNINGER:
            return 'Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at den inneholder feil.'
        case UriktigeOpplysningerType.ARBEIDSGIVER:
            return 'I neste trinn velger du riktig arbeidsgiver. Obs: Feilen vil være synlig for arbeidsgiveren du sender sykmeldingen til.'
        case UriktigeOpplysningerType.DIAGNOSE:
            return 'Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at diagnosen er feil.'
        case UriktigeOpplysningerType.SYKMELDINGSGRAD_FOR_HOY:
            return 'Senere, når du skal fylle ut søknaden om sykepenger, skriver du bare inn hvor mye du faktisk jobbet.'
        case UriktigeOpplysningerType.PERIODE:
        case UriktigeOpplysningerType.SYKMELDINGSGRAD_FOR_LAV:
            throw new Error(
                'Illegal state: Should not render UriktigeOpplysningerInfo for PERIODE or SYKMELDINGSGRAD_FOR_LAV',
            )
    }
}

export default UriktigeOpplysningerInfo
