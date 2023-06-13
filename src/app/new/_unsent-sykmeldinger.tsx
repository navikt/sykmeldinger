import React, { ReactElement } from 'react'

import { getUnsentSykmeldinger } from '../../canary/db'
import SykmeldingLinkPanel from '../../canary/components/sykmeldinger/sykmelding-link-panel'
import { Heading } from '../../canary/components/aksel/server'

async function UnsentSykmeldinger(): Promise<ReactElement | ReactElement[]> {
    // await new Promise((resolve) => setTimeout(resolve, 2000))

    const sykmeldinger = await getUnsentSykmeldinger()
    if (sykmeldinger.length === 0) {
        return <div className="mt-8">Du har ingen nye sykmeldinger</div>
    }

    return (
        <section aria-labelledby="nye-sykmeldinger-section" className="mb-16">
            <Heading size="medium" level="2" id="nye-sykmeldinger-section" className="mb-2">
                Nye sykmeldinger
            </Heading>
            {sykmeldinger.map((row) => (
                <SykmeldingLinkPanel key={row.sykmelding_id} notifying sykmelding={row} />
            ))}
        </section>
    )
}

export default UnsentSykmeldinger
