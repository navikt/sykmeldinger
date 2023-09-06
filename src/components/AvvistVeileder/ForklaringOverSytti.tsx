import { ReactElement } from 'react'
import { BodyShort, Link } from '@navikt/ds-react'

function ForklaringOverSytti(): ReactElement {
    return (
        <>
            <BodyShort className="pb-5">Du har ikke rett til sykepenger, fordi du er over 70 år.</BodyShort>
            <BodyShort className="pb-5">
                Dersom du likevel ønsker å søke, må du først sende inn en{' '}
                <Link
                    href="https://www.nav.no/soknader/nb/person/helse/sykepenger/NAV%2008-07.04D/dokumentinnsending"
                    target="_blank"
                >
                    papirsøknad
                </Link>
                , slik at vi kan vurdere saken manuelt. Du vil da få et skriftlig vedtak som du kan klage på.
            </BodyShort>
            <BodyShort>
                Hvis du trenger dokumentasjon på at du er syk, kan du be legen om en skriftlig bekreftelse.
            </BodyShort>
        </>
    )
}

export default ForklaringOverSytti
