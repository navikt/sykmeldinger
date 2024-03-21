import { ReactElement } from 'react'
import Link from 'next/link'
import { Button } from '@navikt/ds-react'

import { logAmplitudeEvent } from '../../../../amplitude/amplitude'

function RedigerEgenmeldingsdagerLink({
    sykmeldingId,
    hasEgenmeldingsdager,
}: {
    sykmeldingId: string
    hasEgenmeldingsdager: boolean
}): ReactElement {
    const typeOfEditEgenmeldingsdager: string = hasEgenmeldingsdager ? 'Endre' : 'Legg til'

    return (
        <div className="w-full">
            <Button
                as={Link}
                href={`/${sykmeldingId}/endre-egenmeldingsdager`}
                variant="secondary"
                className="mt-4"
                onClick={() => {
                    logAmplitudeEvent({
                        eventName: 'skjema startet',
                        data: { skjemanavn: `${typeOfEditEgenmeldingsdager} egenmeldingsdager i kvittering` },
                    })
                }}
            >
                {typeOfEditEgenmeldingsdager} egenmeldingsdager
            </Button>
        </div>
    )
}

export default RedigerEgenmeldingsdagerLink
