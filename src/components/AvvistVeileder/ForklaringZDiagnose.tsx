import { ReactElement } from 'react'
import { BodyLong, Link } from '@navikt/ds-react'

function ForklaringZDiagnose(): ReactElement {
    return (
        <>
            <BodyLong className="pb-5">
                Legen har skrevet en diagnose i sykmeldingen som ikke gir deg rett til sykepenger. Hvis du mener det er
                feil, kan du kontakte legen din.
            </BodyLong>
            <BodyLong className="pb-5">
                Dersom du likevel ønsker å søke, må du først sende inn en{' '}
                <Link
                    href="https://www.nav.no/soknader/nb/person/helse/sykepenger/NAV%2008-07.04D/dokumentinnsending"
                    target="_blank"
                >
                    papirsøknad
                </Link>
                , slik at vi kan vurdere saken manuelt. Du vil da få et skriftlig vedtak som du kan klage på.
            </BodyLong>
            <BodyLong>
                Du kan også kontakte arbeidsgiveren din og høre om du kan bruke egenmelding eller permisjon i stedet.
            </BodyLong>
        </>
    )
}

export default ForklaringZDiagnose
