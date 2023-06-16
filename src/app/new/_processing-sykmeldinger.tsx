import React, { ReactElement } from 'react'
import { headers } from 'next/headers'

import { Heading } from '../../canary/components/aksel/server'
import { getProcessingSykmeldnger } from '../../canary/db'
import SykmeldingLinkPanel from '../../canary/components/sykmeldinger/sykmelding-link-panel'
import { getServerEnv } from '../../utils/env'
import { getProcessingSykmeldngerFromAPI } from '../../server/sykmeldingerService'
import { getUserContext } from '../../auth/rsc-user-context'

async function ProcessingSykmeldinger(): Promise<ReactElement | ReactElement[] | null> {
    const sykmeldinger = await (getServerEnv().NEXT_PUBLIC_RUNTIME_ENVIRONMENT === 'dev'
        ? getProcessingSykmeldngerFromAPI(getUserContext(headers()))
        : getProcessingSykmeldnger())

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
