import { ReactElement } from 'react'

import { SvarUnion_DagerSvar_Fragment, SykmeldingFragment } from '../../../../../fetching/graphql.generated'
import { toReadableDate } from '../../../../../utils/dateUtils'
import { SykmeldingListInfo } from '../../../../molecules/sykmelding/SykmeldingInfo'

interface EgenmeldingsdagerProps {
    sykmeldingId: string
    egenmeldingsdager: SvarUnion_DagerSvar_Fragment
    sykmelding: SykmeldingFragment
    editableEgenmelding: boolean
}

function Egenmeldingsdager({ egenmeldingsdager }: EgenmeldingsdagerProps): ReactElement | null {
    return (
        <SykmeldingListInfo
            heading="Egenmeldingsdager (lagt til av deg)"
            texts={[
                ...[...egenmeldingsdager.dager].sort().map(toReadableDate),
                `(${egenmeldingsdager.dager.length} dager)`,
            ]}
            variant="blue"
        />
    )
}

export default Egenmeldingsdager
