import Section from '../Layout/Section/Section';
import SykmeldingEntry from '../Layout/SykmeldingEntry/SykmeldingEntry';

const MeldingTilArbeidsgiverView: React.FC<{ meldingTilArbeidsgiver?: string }> = ({ meldingTilArbeidsgiver }) => {
    if (!meldingTilArbeidsgiver) {
        return null;
    }

    return (
        <Section title="Melding til arbeidsgiver">
            <SykmeldingEntry title="Andre innspill til arbeidsgiver" mainText={meldingTilArbeidsgiver} />
        </Section>
    );
};

export default MeldingTilArbeidsgiverView;
