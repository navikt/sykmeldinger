import { KontaktMedPasient } from '../../../../models/Sykmelding/KontaktMedPasient';
import { toReadableDate } from '../../../../utils/dateUtils';
import Section from '../Layout/Section/Section';
import SykmeldingEntry from '../Layout/SykmeldingEntry/SykmeldingEntry';

interface TilbakedateringViewProps {
    kontaktMedPasient: KontaktMedPasient;
    arbeidsgiver: boolean;
}

function TilbakedateringView({ kontaktMedPasient, arbeidsgiver }: TilbakedateringViewProps): JSX.Element | null {
    if (!kontaktMedPasient.kontaktDato && !kontaktMedPasient.begrunnelseIkkeKontakt) {
        return null;
    }

    return (
        <Section title="Tilbakedatering">
            {!!kontaktMedPasient.kontaktDato && (
                <SykmeldingEntry
                    title="Dato for dokumenterbar kontakt med pasienten"
                    mainText={toReadableDate(kontaktMedPasient.kontaktDato)}
                />
            )}
            {!arbeidsgiver && !!kontaktMedPasient.begrunnelseIkkeKontakt && (
                <SykmeldingEntry
                    title="Begrunnelse for tilbakedatering"
                    mainText={kontaktMedPasient.begrunnelseIkkeKontakt}
                />
            )}
        </Section>
    );
}

export default TilbakedateringView;
