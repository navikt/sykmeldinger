import React, { ReactElement } from 'react'
import { headers } from 'next/headers'

import { getUnsentSykmeldinger } from '../../canary/db'
import SykmeldingLinkPanel from '../../canary/components/sykmeldinger/sykmelding-link-panel'
import { Heading } from '../../canary/components/aksel/server'
import { getServerEnv } from '../../utils/env'
import { getUnsentSykmeldingerFromAPI } from '../../server/sykmeldingerService'
import { getUserContext } from '../../auth/user-context'

async function UnsentSykmeldinger(): Promise<ReactElement | ReactElement[]> {
    const sykmeldinger = await (getServerEnv().NEXT_PUBLIC_RUNTIME_ENVIRONMENT === 'dev'
        ? getUnsentSykmeldingerFromAPI(getUserContext(headers()))
        : getUnsentSykmeldinger())

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
