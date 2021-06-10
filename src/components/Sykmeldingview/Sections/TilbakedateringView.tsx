import KontaktMedPasient from '../../../models/Sykmelding/KontaktMedPasient';
import DateFormatter from '../../../utils/DateFormatter';
import Section from '../Layout/Section/Section';
import SykmeldingEntry from '../Layout/SykmeldingEntry/SykmeldingEntry';

interface TilbakedateringViewProps {
    kontaktMedPasient: KontaktMedPasient;
    arbeidsgiver?: boolean;
}

const TilbakedateringView: React.FC<TilbakedateringViewProps> = ({ kontaktMedPasient, arbeidsgiver = false }) => {
    if (!kontaktMedPasient.kontaktDato && !kontaktMedPasient.begrunnelseIkkeKontakt) {
        return null;
    }

    return (
        <Section title="Tilbakedatering">
            {!!kontaktMedPasient.kontaktDato && (
                <SykmeldingEntry
                    title="Dato for dokumenterbar kontakt med pasienten"
                    mainText={DateFormatter.toReadableDate(kontaktMedPasient.kontaktDato)}
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
};

export default TilbakedateringView;
