import { BodyShort, Label, ReadMore, Chat } from '@navikt/ds-react'

import VeilederMaleSvg from '../../../../../Veileder/svg/VeilederMaleSvg'

import styles from './VeilederSenderSykmeldingen.module.css'

function VeilederSenderSykmeldingen(): JSX.Element {
    const veilederSectionId = 'veilederSenderSykmeldingen'
    return (
        <section className={styles.veilederSenderSykmeldingen} aria-labelledby={veilederSectionId}>
            <Chat avatar={<VeilederMaleSvg />} position="left">
                <Chat.Bubble backgroundColor="white">
                    <Label id={veilederSectionId}>Sykmeldingen sendes til jobben din</Label>
                    <BodyShort>
                        Under ser du hva jobben din får se hvis du sender sykmeldingen. Diagnosen og annen sensitiv data
                        sendes for eksempel ikke.
                    </BodyShort>
                    <ReadMore size="medium" header="Ønsker du ikke å sende informasjonen til jobben?">
                        <div className={styles.content}>
                            <BodyShort>
                                Arbeidsgiveren din trenger sykmeldingen som dokumentasjon på at du er syk, enten den
                                digitale sykmeldingen du finner her, eller papirsykmeldingen som du kan få hos legen.
                            </BodyShort>
                            <BodyShort>
                                Ønsker du ikke å sende den slik du ser den her, kan du snakke med legen om å få en ny
                                sykmelding. Da kan du ta stilling til om du vil gi den nye sykmeldingen til
                                arbeidsgiveren din i stedet.
                            </BodyShort>
                        </div>
                    </ReadMore>
                </Chat.Bubble>
            </Chat>
        </section>
    )
}

export default VeilederSenderSykmeldingen
