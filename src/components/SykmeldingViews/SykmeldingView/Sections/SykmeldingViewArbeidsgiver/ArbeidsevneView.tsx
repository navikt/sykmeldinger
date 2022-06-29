import Section from '../../Layout/Section/Section';
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry';

interface ArbeidsevneViewProps {
    tiltakArbeidsplassen?: string | null;
}

const ArbeidsevneView: React.FC<ArbeidsevneViewProps> = ({ tiltakArbeidsplassen }) => {
    if (!tiltakArbeidsplassen) return null;

    return (
        <Section title="Hva skal til for å bedre arbeidsevnen?">
            <SykmeldingEntry
                title="Tilrettelegging/hensyn som bør tas på arbeidsplassen"
                mainText={tiltakArbeidsplassen}
                headingLevel="4"
            />
        </Section>
    );
};

export default ArbeidsevneView;
