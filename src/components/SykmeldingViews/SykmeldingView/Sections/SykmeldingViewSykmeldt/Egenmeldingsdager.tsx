import { BodyShort, Button, Heading } from '@navikt/ds-react'
import Link from 'next/link'

import { SvarUnion_DagerSvar_Fragment, SykmeldingFragment } from '../../../../../fetching/graphql.generated'
import { toReadableDate } from '../../../../../utils/dateUtils'
import useGetSykmeldingIdParam from '../../../../../hooks/useGetSykmeldingIdParam'
import { getPublicEnv } from '../../../../../utils/env'

const publicEnv = getPublicEnv()

interface EgenmeldingsdagerProps {
    egenmeldingsdager: SvarUnion_DagerSvar_Fragment
    sykmelding: SykmeldingFragment
    editableEgenmelding: boolean
}

function Egenmeldingsdager({ egenmeldingsdager, editableEgenmelding }: EgenmeldingsdagerProps): JSX.Element {
    const sykmedingId = useGetSykmeldingIdParam()
    return (
        <>
            <div className="mb-3 rounded bg-blue-50 p-4 ">
                <Heading size="xsmall" level="4">
                    Egenmeldingsdager (lagt til av deg)
                </Heading>
                <ul className="list-none p-0">
                    {[...egenmeldingsdager.dager].sort().map((date: string) => (
                        <li key={toReadableDate(date)}>
                            <BodyShort size="small">{toReadableDate(date)}</BodyShort>
                        </li>
                    ))}
                    <BodyShort
                        size="small"
                        as="li"
                        className="mt-2"
                    >{`(${egenmeldingsdager.dager.length} dager)`}</BodyShort>
                </ul>
            </div>
            {publicEnv.DISPLAY_EGENMELDING === 'true' && editableEgenmelding && (
                <Link passHref href={`/${sykmedingId}/endre-egenmeldingsdager`} legacyBehavior>
                    <Button as="a" variant="secondary">
                        Endre egenmeldingsdager
                    </Button>
                </Link>
            )}
        </>
    )
}

export default Egenmeldingsdager
