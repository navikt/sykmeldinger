import React, { ReactElement } from 'react'

function SykmeldingPage({ params }: { params: { sykmeldingId: string } }): ReactElement {
    return <div>I am specific sykmelding {params.sykmeldingId}</div>
}

export default SykmeldingPage
