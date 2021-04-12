import Section from '../Layout/Section';
import SykmeldingEntry from '../Layout/SykmeldingEntry';

interface ArbeidsevneViewProps {
    tiltakArbeidsplassen?: string;
    tiltakNAV?: string;
    andreTiltak?: string;
}
const ArbeidsevneView: React.FC<ArbeidsevneViewProps> = ({ tiltakArbeidsplassen, tiltakNAV, andreTiltak }) => {
    if (!tiltakArbeidsplassen || !tiltakNAV || !andreTiltak) {
        return null;
    }
    return (
        <Section title="Hva skal til for å bedre arbeidsevnen?">
            {!!tiltakArbeidsplassen && (
                <SykmeldingEntry
                    title="Tilrettelegging/hensyn som bør tas på arbeidsplassen"
                    mainText={tiltakArbeidsplassen}
                />
            )}
            {!!tiltakNAV && <SykmeldingEntry title="Tiltak i regi av NAV" mainText={tiltakNAV} />}
            {!!andreTiltak && <SykmeldingEntry title="Andre innspill til NAV" mainText={andreTiltak} />}
        </Section>
    );
};

export default ArbeidsevneView;
