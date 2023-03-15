import { Button } from '@navikt/ds-react'
import Link from 'next/link'

import { SvarUnion_DagerSvar_Fragment, SykmeldingFragment } from '../../../../../fetching/graphql.generated'
import { toReadableDate } from '../../../../../utils/dateUtils'
import { getPublicEnv } from '../../../../../utils/env'
import { SykmeldingListInfo } from '../../../../molecules/sykmelding/SykmeldingInfo'

const publicEnv = getPublicEnv()

interface EgenmeldingsdagerProps {
    sykmeldingId: string
    egenmeldingsdager: SvarUnion_DagerSvar_Fragment
    sykmelding: SykmeldingFragment
    editableEgenmelding: boolean
}

function Egenmeldingsdager({
    sykmeldingId,
    egenmeldingsdager,
    editableEgenmelding,
}: EgenmeldingsdagerProps): JSX.Element {
    return (
        <>
            <SykmeldingListInfo
                heading="Egenmeldingsdager (lagt til av deg)"
                texts={[
                    ...[...egenmeldingsdager.dager].sort().map(toReadableDate),
                    `(${egenmeldingsdager.dager.length} dager)`,
                ]}
                variant="blue"
            />
            {publicEnv.DISPLAY_EGENMELDING === 'true' && editableEgenmelding && (
                <Link passHref href={`/${sykmeldingId}/endre-egenmeldingsdager`} legacyBehavior>
                    <Button as="a" variant="secondary" className="mt-4">
                        Endre egenmeldingsdager
                    </Button>
                </Link>
            )}
        </>
    )
}

export default Egenmeldingsdager
