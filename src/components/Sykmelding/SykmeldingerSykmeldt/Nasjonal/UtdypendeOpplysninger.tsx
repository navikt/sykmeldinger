import { ReactElement } from 'react'
import { FileTextIcon } from '@navikt/aksel-icons'
import * as R from 'remeda'

import { UtdypendeOpplysning } from 'queries'

import { SykmeldingGroup } from '../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingInfo } from '../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    utdypendeOpplysninger: Record<string, Record<string, UtdypendeOpplysning>>
    parentId: string
}

type SporsmalSvarTuple = [sporsmal: string, svar: string]

function UtdypendeOpplysninger({ utdypendeOpplysninger, parentId }: Props): ReactElement | null {
    if (Object.keys(utdypendeOpplysninger).length === 0) return null

    const sporsmalsToShow: SporsmalSvarTuple[] = R.pipe(
        utdypendeOpplysninger,
        R.values(),
        R.flatMap(R.values()),
        R.map((it): SporsmalSvarTuple | null => (it.sporsmal != null ? [it.sporsmal, it.svar] : null)),
        R.filter(R.isTruthy),
    )

    return (
        <SykmeldingGroup parentId={parentId} heading="Utdypende opplysninger" Icon={FileTextIcon}>
            {sporsmalsToShow.map(([sporsmal, svar]) => (
                <SykmeldingInfo key={sporsmal} heading={sporsmal} variant="gray">
                    {svar}
                </SykmeldingInfo>
            ))}
        </SykmeldingGroup>
    )
}

export default UtdypendeOpplysninger
