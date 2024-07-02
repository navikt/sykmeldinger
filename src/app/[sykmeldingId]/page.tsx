import Link from 'next/link'
import React, { ReactElement } from 'react'

type Props = {
    params: {
        sykmeldingId: string
    }
}

function Page({ params }: Props): ReactElement {
    return (
        <div>
            dette er en spesifikk sykmelding
            <Link href={`${params.sykmeldingId}/kvittering`}>Gå til kvittering</Link>
        </div>
    )
}

export default Page
