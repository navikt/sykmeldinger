import { ReactElement } from 'react'
import Link from 'next/link'
import { Button } from '@navikt/ds-react'

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
            <Link passHref href={`/${sykmeldingId}/endre-egenmeldingsdager`} legacyBehavior>
                <Button as="a" variant="secondary" className="mt-4">
                    {typeOfEditEgenmeldingsdager} egenmeldingsdager
                </Button>
            </Link>
        </div>
    )
}

export default RedigerEgenmeldingsdagerLink
