import { BodyShort, ReadMore, GuidePanel, Heading } from '@navikt/ds-react'
import { ReactElement } from 'react'

function VeilederSenderSykmeldingenInfo(): ReactElement {
    const veilederSectionId = 'veilederSenderSykmeldingen'
    return (
        <section className="mb-8" aria-labelledby={veilederSectionId}>
            <GuidePanel poster>
                <Heading id={veilederSectionId} size="small" level="3" spacing>
                    Sykmeldingen sendes til jobben din
                </Heading>
                <BodyShort>
                    Under ser du hva jobben din får se hvis du sender sykmeldingen. Diagnosen og annen sensitiv data
                    sendes for eksempel ikke.
                </BodyShort>
                <ReadMore className="mt-4" size="medium" header="Ønsker du ikke å sende informasjonen til jobben?">
                    <BodyShort spacing>
                        Arbeidsgiveren din trenger sykmeldingen som dokumentasjon på at du er syk, enten den digitale
                        sykmeldingen du finner her, eller papirsykmeldingen som du kan få hos legen.
                    </BodyShort>
                    <BodyShort>
                        Ønsker du ikke å sende den slik du ser den her, kan du snakke med legen om å få en ny
                        sykmelding. Da kan du ta stilling til om du vil gi den nye sykmeldingen til arbeidsgiveren din i
                        stedet.
                    </BodyShort>
                </ReadMore>
            </GuidePanel>
        </section>
    )
}

export default VeilederSenderSykmeldingenInfo
