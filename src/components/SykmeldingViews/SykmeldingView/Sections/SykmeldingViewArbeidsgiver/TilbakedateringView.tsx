import { KontaktMedPasient } from '../../../../../models/Sykmelding/KontaktMedPasient';
import { toReadableDate } from '../../../../../utils/dateUtils';
import Section from '../../Layout/Section/Section';
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry';

interface TilbakedateringViewProps {
    kontaktMedPasient: KontaktMedPasient;
}

function TilbakedateringView({ kontaktMedPasient }: TilbakedateringViewProps): JSX.Element | null {
    if (!kontaktMedPasient.kontaktDato) {
        return null;
    }

    return (
        <Section title="Tilbakedatering">
            <SykmeldingEntry
                title="Dato for dokumenterbar kontakt med pasienten"
                mainText={toReadableDate(kontaktMedPasient.kontaktDato)}
            />
        </Section>
    );
}

export default TilbakedateringView;
