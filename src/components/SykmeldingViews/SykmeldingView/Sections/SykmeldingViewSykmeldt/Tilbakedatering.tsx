import { Historic } from '@navikt/ds-icons';

import { KontaktMedPasient } from '../../../../../models/Sykmelding/KontaktMedPasient';
import { toReadableDate } from '../../../../../utils/dateUtils';
import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading';
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry';

import styles from './Tilbakedatering.module.css';

interface Props {
    kontaktMedPasient: KontaktMedPasient;
}

function TilbakedateringSykmeldt({ kontaktMedPasient }: Props): JSX.Element | null {
    if (!kontaktMedPasient.kontaktDato && !kontaktMedPasient.begrunnelseIkkeKontakt) {
        return null;
    }

    return (
        <>
            <SykmeldtHeading title="Tilbakedatering" Icon={Historic} />
            {!!kontaktMedPasient.kontaktDato && (
                <div className={styles.info}>
                    <SykmeldingEntry
                        title="Dato for dokumenterbar kontakt med pasienten"
                        mainText={toReadableDate(kontaktMedPasient.kontaktDato)}
                        headingLevel="4"
                    />
                </div>
            )}
            {!!kontaktMedPasient.begrunnelseIkkeKontakt && (
                <div className={styles.info}>
                    <SykmeldingEntry
                        title="Begrunnelse for tilbakedatering"
                        mainText={kontaktMedPasient.begrunnelseIkkeKontakt}
                        headingLevel="4"
                    />
                </div>
            )}
        </>
    );
}

export default TilbakedateringSykmeldt;
