import { MeldingTilNAV } from '../../../../models/Sykmelding/MeldingTilNav';
import JaEntry from '../Layout/JaEntry/JaEntry';
import Section from '../Layout/Section/Section';
import SykmeldingEntry from '../Layout/SykmeldingEntry/SykmeldingEntry';

interface MeldingTilNavViewProps {
    meldingTilNav?: MeldingTilNAV | null;
    arbeidsgiver: boolean;
}

function MeldingTilNavView({ meldingTilNav, arbeidsgiver }: MeldingTilNavViewProps): JSX.Element | null {
    if (arbeidsgiver) {
        return null;
    }

    if (!meldingTilNav || (meldingTilNav.bistandUmiddelbart === false && !meldingTilNav.beskrivBistand)) {
        return null;
    }

    return (
        <Section title="Melding til NAV">
            {meldingTilNav.bistandUmiddelbart && <JaEntry title="Ønskes bistand fra NAV nå?" />}
            {meldingTilNav.beskrivBistand && (
                <SykmeldingEntry title="Nærmere beskrivelse" mainText={meldingTilNav.beskrivBistand} small />
            )}
        </Section>
    );
}

export default MeldingTilNavView;
