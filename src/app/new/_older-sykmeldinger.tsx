import React, { ReactElement } from 'react'

import { getOlderSykmeldinger } from '../../canary/db'
import SortableSykmeldingSection from '../../canary/components/sykmeldinger/sortable-sykmelding-section'

async function OlderSykmeldinger(): Promise<ReactElement | ReactElement[] | null> {
    // await new Promise((resolve) => setTimeout(resolve, 5000))

    const sykmeldinger = await getOlderSykmeldinger()
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
