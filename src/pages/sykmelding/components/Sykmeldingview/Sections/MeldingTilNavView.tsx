import MeldingTilNAV from '../../../../../models/Sykmelding/MeldingTilNav';
import CheckboxEntry from '../Layout/CheckboxEntry';
import Section from '../Layout/Section';
import SykmeldingEntry from '../Layout/SykmeldingEntry';

const MeldingTilNavView: React.FC<{ meldingTilNav: MeldingTilNAV }> = ({ meldingTilNav }) => {
    return (
        <Section title="Melding til NAV">
            <CheckboxEntry show={meldingTilNav.bistandUmiddelbart} checkboxText="Ønskes bistand fra NAV nå" />
            {meldingTilNav.beskrivBistand && (
                <SykmeldingEntry title="Nærmere beskrivelse" mainText={meldingTilNav.beskrivBistand} small />
            )}
        </Section>
    );
};

export default MeldingTilNavView;
