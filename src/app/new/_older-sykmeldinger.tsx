import React, { ReactElement } from 'react'
import { headers } from 'next/headers'

import { getOlderSykmeldinger } from '../../canary/db'
import SortableSykmeldingSection from '../../canary/components/sykmeldinger/sortable-sykmelding-section'
import { getServerEnv } from '../../utils/env'
import { getOlderSykmeldingerFromAPI } from '../../server/sykmeldingerService'
import { getUserContext } from '../../auth/rsc-user-context'

async function OlderSykmeldinger(): Promise<ReactElement | ReactElement[] | null> {
    const sykmeldinger = await (getServerEnv().NEXT_PUBLIC_RUNTIME_ENVIRONMENT === 'dev'
        ? getOlderSykmeldingerFromAPI(getUserContext(headers()))
        : getOlderSykmeldinger())
    if (sykmeldinger.length === 0) {
        return null
    }

    return (
        <section aria-labelledby="older-sykmeldinger-section" className="mb-16">
            <SortableSykmeldingSection sykmeldinger={sykmeldinger} />
        </section>
    )
}

export default OlderSykmeldinger
