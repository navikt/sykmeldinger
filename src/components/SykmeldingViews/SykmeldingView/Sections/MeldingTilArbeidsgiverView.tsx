import Section from '../Layout/Section/Section';
import SykmeldingEntry from '../Layout/SykmeldingEntry/SykmeldingEntry';

interface Props {
    meldingTilArbeidsgiver?: string | null;
}

function MeldingTilArbeidsgiverView({ meldingTilArbeidsgiver }: Props): JSX.Element | null {
    if (!meldingTilArbeidsgiver) {
        return null;
    }

    return (
        <Section title="Melding til arbeidsgiver">
            <SykmeldingEntry title="Andre innspill til arbeidsgiver" mainText={meldingTilArbeidsgiver} />
        </Section>
    );
}

export default MeldingTilArbeidsgiverView;
