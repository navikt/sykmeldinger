import { Historic } from '@navikt/ds-icons'

import { KontaktMedPasient } from '../../../../../fetching/graphql.generated'
import { toReadableDate } from '../../../../../utils/dateUtils'
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry'
import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading'

import styles from './TilbakedateringView.module.css'

interface TilbakedateringViewProps {
    kontaktMedPasient: KontaktMedPasient
}

function TilbakedateringView({ kontaktMedPasient }: TilbakedateringViewProps): JSX.Element | null {
    if (!kontaktMedPasient.kontaktDato) {
        return null
    }

    return (
        <div>
            <SykmeldtHeading title="Tilbakedatering" Icon={Historic} />
            <div className={styles.tilbakedatering}>
                <SykmeldingEntry
                    title="Dato for dokumenterbar kontakt med pasienten"
                    mainText={toReadableDate(kontaktMedPasient.kontaktDato)}
                />
            </div>
        </div>
    )
}

export default TilbakedateringView
