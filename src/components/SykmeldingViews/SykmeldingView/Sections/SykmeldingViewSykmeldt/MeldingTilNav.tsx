import { PeopleDialogOutline } from '@navikt/ds-icons';

import { MeldingTilNav } from '../../../../../fetching/graphql.generated';
import JaEntry from '../../Layout/JaEntry/JaEntry';
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry';
import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading';

import styles from './MeldingTilNav.module.css';

interface Props {
    meldingTilNav?: MeldingTilNav | null;
}

function MeldingTilNav({ meldingTilNav }: Props): JSX.Element | null {
    if (!meldingTilNav || (meldingTilNav.bistandUmiddelbart === false && !meldingTilNav.beskrivBistand)) {
        return null;
    }

    return (
        <div>
            <SykmeldtHeading title="Melding til NAV" Icon={PeopleDialogOutline} />
            {meldingTilNav.bistandUmiddelbart && (
                <div className={styles.bistandUmiddelbart}>
                    <JaEntry title="Ønskes bistand fra NAV nå?" headingLevel="4" />
                </div>
            )}
            {meldingTilNav.beskrivBistand && (
                <div className={styles.beskrivBistand}>
                    <SykmeldingEntry
                        title="Nærmere beskrivelse"
                        mainText={meldingTilNav.beskrivBistand}
                        small
                        headingLevel="4"
                    />
                </div>
            )}
        </div>
    );
}

export default MeldingTilNav;
