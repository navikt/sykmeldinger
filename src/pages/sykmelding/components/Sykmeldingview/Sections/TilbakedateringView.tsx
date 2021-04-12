import KontaktMedPasient from '../../../../../models/Sykmelding/KontaktMedPasient';
import DateFormatter from '../../../../../utils/DateFormatter';
import Section from '../Layout/Section';
import SykmeldingEntry from '../Layout/SykmeldingEntry';

const TilbakedateringView: React.FC<{ kontaktMedPasient: KontaktMedPasient }> = ({ kontaktMedPasient }) => {
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
            {!!kontaktMedPasient.begrunnelseIkkeKontakt && (
                <SykmeldingEntry
                    title="Begrunnelse for tilbakedatering"
                    mainText={kontaktMedPasient.begrunnelseIkkeKontakt}
                />
            )}
        </Section>
    );
};

export default TilbakedateringView;
