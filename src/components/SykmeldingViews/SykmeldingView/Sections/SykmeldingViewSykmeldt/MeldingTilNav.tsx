import { PeopleDialogOutline } from '@navikt/ds-icons';

import { MeldingTilNAV } from '../../../../../models/Sykmelding/MeldingTilNav';
import JaEntry from '../../Layout/JaEntry/JaEntry';
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry';
import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading';

import styles from './MeldingTilNav.module.css';

interface Props {
    meldingTilNav?: MeldingTilNAV | null;
}

function MeldingTilNav({ meldingTilNav }: Props): JSX.Element | null {
    if (!meldingTilNav || (meldingTilNav.bistandUmiddelbart === false && !meldingTilNav.beskrivBistand)) {
        return null;
    }

    return (
        <>
            <SykmeldtHeading title="Melding til NAV" Icon={PeopleDialogOutline} />
            {meldingTilNav.bistandUmiddelbart && (
                <div className={styles.info}>
                    <JaEntry title="Ønskes bistand fra NAV nå?" headingLevel="4" />
                </div>
            )}
            {meldingTilNav.beskrivBistand && (
                <div className={styles.info}>
                    <SykmeldingEntry
                        title="Nærmere beskrivelse"
                        mainText={meldingTilNav.beskrivBistand}
                        small
                        headingLevel="4"
                    />
                </div>
            )}
        </>
    );
}

export default MeldingTilNav;
