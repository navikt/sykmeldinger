import Section from '../Layout/Section';
import SykmeldingEntry from '../Layout/SykmeldingEntry';

const AnnetView: React.FC<{ behandlerTlf?: string }> = ({ behandlerTlf }) => {
    if (!behandlerTlf) {
        return null;
    }

    return (
        <Section title="Annet">
            <SykmeldingEntry title="Telefon til lege/sykmelder" mainText={behandlerTlf} />
        </Section>
    );
};

export default AnnetView;
