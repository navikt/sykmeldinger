import { ReactElement } from 'react'
import { BodyShort, Link } from '@navikt/ds-react'

import { Periodetype, SykmeldingFragment } from 'queries'

type Props = {
    perioder: SykmeldingFragment['sykmeldingsperioder']
}

function ForklaringUnder20Prosent({ perioder }: Props): ReactElement {
    const grad: number | null = perioder.find((periode) => periode.type === Periodetype.GRADERT)?.gradert?.grad ?? null

    return (
        <>
            {grad == null ? (
                <BodyShort className="pb-5">
                    Behandleren din har oppgitt at sykmeldingsgraden din er under 20%, noe som ikke gir deg rett til
                    sykepenger. Hvis du mener det er feil, kan du kontakte legen din.
                </BodyShort>
            ) : (
                <BodyShort className="pb-5">
                    Behandleren din har oppgitt at du er <strong>{grad}% sykmeldt</strong>. Du må være minst{' '}
                    <strong>20% sykmeldt</strong> for å ha krav på sykepenger. Hvis du mener det er feil, kan du
                    kontakte legen din.
                </BodyShort>
            )}

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
        </>
    )
}

export default ForklaringUnder20Prosent
