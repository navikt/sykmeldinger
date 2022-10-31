import { Alert, Heading } from '@navikt/ds-react'

import { UriktigeOpplysningerType } from './Form'

const uriktigOpplysningTekst: Record<keyof typeof UriktigeOpplysningerType, string> = {
    PERIODE: '',
    SYKMELDINGSGRAD_FOR_LAV: '',
    SYKMELDINGSGRAD_FOR_HOY:
        'Senere, når du skal fylle ut søknaden om sykepenger, skriver du bare inn hvor mye du faktisk jobbet.',
    ARBEIDSGIVER:
        'I neste trinn velger du riktig arbeidsgiver. Obs: Feilen vil være synlig for arbeidsgiveren du sender sykmeldingen til.',
    DIAGNOSE:
        'Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at diagnosen er feil.',
    ANDRE_OPPLYSNINGER:
        'Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at den inneholder feil.',
}

interface UriktigeOpplysningerInfoProps {
    uriktigeOpplysninger?: (keyof typeof UriktigeOpplysningerType)[]
}

function UriktigeOpplysningerInfo({ uriktigeOpplysninger }: UriktigeOpplysningerInfoProps): JSX.Element | null {
    if (!uriktigeOpplysninger || uriktigeOpplysninger.length === 0) return null

    if (uriktigeOpplysninger.includes('PERIODE') || uriktigeOpplysninger.includes('SYKMELDINGSGRAD_FOR_LAV')) {
        return null
    }

    return (
        <Alert variant="info" role="alert" aria-live="polite">
            <Heading spacing size="small" level="3">
                Du kan fortsatt bruke sykmeldingen
            </Heading>
            <ul>
                {uriktigeOpplysninger.map((opplysning, index) => (
                    <li key={index}>{uriktigOpplysningTekst[opplysning]}</li>
                ))}
            </ul>
        </Alert>
    )
}

export default UriktigeOpplysningerInfo
