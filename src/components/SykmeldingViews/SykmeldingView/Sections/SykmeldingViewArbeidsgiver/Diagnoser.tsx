import { Bandage } from '@navikt/ds-icons'
import { ReactElement } from 'react'
import * as R from 'remeda'

import { MedisinskVurdering } from '../../../../../fetching/graphql.generated'
import { SykmeldingGroup } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingSladd } from '../../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    medisinskVurdering: MedisinskVurdering
}

function Diagnoser({ medisinskVurdering }: Props): ReactElement {
    return (
        <SykmeldingGroup heading="Medisinsk tilstand" Icon={Bandage} tight>
            {medisinskVurdering.hovedDiagnose?.tekst && <SykmeldingSladd heading="Diagnose" />}
            {R.pipe(
                medisinskVurdering.biDiagnoser,
                R.map(R.prop('tekst')),
                R.compact,
                R.map((it) => <SykmeldingSladd key={it} heading="Diagnose" />),
            )}
        </SykmeldingGroup>
    )
}

export default Diagnoser
