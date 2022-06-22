import { BodyShort, Label, ReadMore } from '@navikt/ds-react';
import Veileder from 'nav-frontend-veileder';

import Bubble from '../../../../../InformationBanner/Bubble';
import VeilederMaleSvg from '../../../../../Veileder/svg/VeilederMaleSvg';

import styles from './VeilederSenderSykmeldingen.module.css';

function VeilederSenderSykmeldingen(): JSX.Element {
    return (
        <div className={styles.veilederSenderSykmeldingen}>
            <Veileder className={styles.navVeileder} storrelse="S" fargetema="info">
                <VeilederMaleSvg />
            </Veileder>
            <Bubble whiteBackground>
                <Label>Sykmeldingen sendes til jobben din</Label>
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
                            sykmelding. Da kan du ta stilling til om du vil gi den nye sykmeldingen til arbeidsgiveren
                            din i stedet.
                        </BodyShort>
                    </div>
                </ReadMore>
            </Bubble>
        </div>
    );
}

export default VeilederSenderSykmeldingen;
