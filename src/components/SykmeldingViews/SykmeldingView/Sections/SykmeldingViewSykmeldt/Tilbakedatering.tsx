import { Historic } from '@navikt/ds-icons'

import { KontaktMedPasient } from '../../../../../fetching/graphql.generated'
import { toReadableDate } from '../../../../../utils/dateUtils'
import { SykmeldingSectionHeading } from '../../../../molecules/sykmelding/SykmeldingGroup'
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry'

interface Props {
    kontaktMedPasient: KontaktMedPasient
}

function Tilbakedatering({ kontaktMedPasient }: Props): JSX.Element | null {
    if (!kontaktMedPasient.kontaktDato && !kontaktMedPasient.begrunnelseIkkeKontakt) {
        return null
    }

    return (
        <div>
            <SykmeldingSectionHeading title="Tilbakedatering" Icon={Historic} />
            {!!kontaktMedPasient.kontaktDato && (
                <div className="mb-3 rounded bg-gray-50 p-4">
                    <SykmeldingEntry
                        title="Dato for dokumenterbar kontakt med pasienten"
                        mainText={toReadableDate(kontaktMedPasient.kontaktDato)}
                    />
                </div>
            )}
            {!!kontaktMedPasient.begrunnelseIkkeKontakt && (
                <div className="mb-3 rounded bg-gray-50 p-4">
                    <SykmeldingEntry
                        title="Begrunnelse for tilbakedatering"
                        mainText={kontaktMedPasient.begrunnelseIkkeKontakt}
                    />
                </div>
            )}
        </div>
    )
}

export default Tilbakedatering
