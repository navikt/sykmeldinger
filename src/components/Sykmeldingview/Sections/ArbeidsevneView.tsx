import Section from '../Layout/Section/Section';
import SykmeldingEntry from '../Layout/SykmeldingEntry/SykmeldingEntry';

interface ArbeidsevneViewProps {
    tiltakArbeidsplassen?: string;
    tiltakNAV?: string;
    andreTiltak?: string;
    arbeidsgiver: boolean;
}

const ArbeidsevneView: React.FC<ArbeidsevneViewProps> = ({
    tiltakArbeidsplassen,
    tiltakNAV,
    andreTiltak,
    arbeidsgiver,
}) => {
    if (!tiltakArbeidsplassen && !tiltakNAV && !andreTiltak) {
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
            {!arbeidsgiver && !!tiltakNAV && <SykmeldingEntry title="Tiltak i regi av NAV" mainText={tiltakNAV} />}
            {!arbeidsgiver && !!andreTiltak && (
                <SykmeldingEntry title="Andre innspill til NAV" mainText={andreTiltak} />
            )}
        </Section>
    );
};

export default ArbeidsevneView;
