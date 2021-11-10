import Behandler from '../../../models/Sykmelding/Behandler';
import Section from '../Layout/Section/Section';
import SykmeldingEntry from '../Layout/SykmeldingEntry/SykmeldingEntry';

const AnnetView: React.FC<{ behandler: Behandler }> = ({ behandler }) => {
    return (
        <Section title="Annet">
            {behandler.tlf && <SykmeldingEntry title="Telefon til behandler" mainText={behandler.tlf} />}
        </Section>
    );
};

export default AnnetView;
