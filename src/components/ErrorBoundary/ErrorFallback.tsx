import { ReactElement } from 'react'
import { GuidePanel } from '@navikt/ds-react'

const ErrorFallback = (): ReactElement => {
    return (
        <div style={{ maxWidth: '40rem', margin: 'auto', marginTop: '2rem' }}>
            <GuidePanel>
                Beklager! En uventet feil har oppstått. Sannsynligvis jobber vi med saken allerede, men ta kontakt med
                oss hvis det ikke har løst seg til i morgen.
            </GuidePanel>
        </div>
    )
}

export default ErrorFallback
