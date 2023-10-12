import { ReactElement } from 'react'
import { InformationIcon } from '@navikt/aksel-icons'
import * as R from 'remeda'

import { SykmeldingGroup } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { toReadableDate } from '../../../../../utils/dateUtils'
import { UtenlandskSykmelding } from '../../../../../utils/utenlanskUtils'
import { SykmeldingInfo, SykmeldingSladd } from '../../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    sykmelding: UtenlandskSykmelding
    parentId: string
}

function AnnenInfoView({ sykmelding, parentId }: Props): ReactElement {
    return (
        <SykmeldingGroup parentId={parentId} heading="Annen info" Icon={InformationIcon} tight>
            <SykmeldingInfo heading="Dato sykmeldingen ble skrevet">
                {toReadableDate(sykmelding.behandletTidspunkt)}
            </SykmeldingInfo>
            <SykmeldingInfo heading="Landet sykmeldingen ble skrevet">
                {sykmelding.utenlandskSykmelding.land}
            </SykmeldingInfo>
            {sykmelding.medisinskVurdering?.hovedDiagnose?.tekst && <SykmeldingSladd heading="Diagnose" />}
            {R.pipe(
                sykmelding.medisinskVurdering?.biDiagnoser ?? [],
                R.map(R.prop('tekst')),
                R.compact,
                R.map((text) => <SykmeldingSladd key={text} heading="Bidiagnose" />),
            )}
        </SykmeldingGroup>
    )
}

export default AnnenInfoView
