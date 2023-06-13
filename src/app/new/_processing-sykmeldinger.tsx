import React, { ReactElement } from 'react'

import { Heading } from '../../canary/components/aksel/server'
import { getProcessingSykmeldnger } from '../../canary/db'
import SykmeldingLinkPanel from '../../canary/components/sykmeldinger/sykmelding-link-panel'

async function ProcessingSykmeldinger(): Promise<ReactElement | ReactElement[] | null> {
    // fake wait 1 second
    //await new Promise((resolve) => setTimeout(resolve, 1000))

    const sykmeldinger = await getProcessingSykmeldnger()
    if (sykmeldinger.length === 0) {
        return null
    }

    return (
        <section aria-labelledby="under-behandling-section" className="mb-16">
            <Heading size="medium" level="2" id="under-behandling-section" className="mb-2">
                Under behandling
            </Heading>
            {sykmeldinger.map((row) => (
                <SykmeldingLinkPanel key={row.sykmelding_id} sykmelding={row} notifying={false} />
            ))}
        </section>
    )
}

export default ProcessingSykmeldinger
