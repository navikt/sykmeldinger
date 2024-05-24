import { ReactElement } from 'react'
import { InformationIcon } from '@navikt/aksel-icons'

import { toReadableDate } from '../../../../utils/dateUtils'
import { UtenlandskSykmelding } from '../../../../utils/utenlanskUtils'
import { SykmeldingInfo } from '../../../molecules/sykmelding/SykmeldingInfo'
import { SykmeldingGroup } from '../../../molecules/sykmelding/SykmeldingGroup'

interface Props {
    sykmelding: UtenlandskSykmelding
    parentId: string
}

function AnnenInfoUtenlandsk({ sykmelding, parentId }: Props): ReactElement {
    return (
        <SykmeldingGroup parentId={parentId} heading="Annen info" Icon={InformationIcon}>
            <SykmeldingInfo heading="Dato sykmeldingen ble skrevet" variant="blue">
                {toReadableDate(sykmelding.behandletTidspunkt)}
            </SykmeldingInfo>
            <SykmeldingInfo heading="Landet sykmeldingen ble skrevet" variant="blue">
                {sykmelding.utenlandskSykmelding.land}
            </SykmeldingInfo>
            {sykmelding.medisinskVurdering?.hovedDiagnose?.tekst && (
                <SykmeldingInfo heading="Diagnose" variant="blue">
                    {sykmelding.medisinskVurdering.hovedDiagnose.tekst}
                </SykmeldingInfo>
            )}
            {sykmelding.medisinskVurdering?.biDiagnoser.map((bidiagnose) =>
                bidiagnose.tekst ? (
                    <SykmeldingInfo key={bidiagnose.tekst} heading="Bidiagnose" variant="blue">
                        {bidiagnose.tekst}
                    </SykmeldingInfo>
                ) : null,
            )}
        </SykmeldingGroup>
    )
}

export default AnnenInfoUtenlandsk
