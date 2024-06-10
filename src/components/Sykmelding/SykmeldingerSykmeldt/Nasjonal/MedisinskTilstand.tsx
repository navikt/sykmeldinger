import { ReactElement } from 'react'
import { BandageIcon } from '@navikt/aksel-icons'
import * as R from 'remeda'
import { BodyShort } from '@navikt/ds-react'

import { MedisinskVurdering } from 'queries'

import { toReadableDate } from '../../../../utils/dateUtils'
import { SykmeldingGroup } from '../../../molecules/sykmelding/SykmeldingGroup'
import { annenFraverGrunnToText } from '../../../../utils/periodeUtils'
import { SykmeldingInfo, SykmeldingJaInfo } from '../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    medisinskVurdering: MedisinskVurdering | null | undefined
    isV3: boolean
    parentId: string
}

function MedisinskTilstand({ isV3, medisinskVurdering, parentId }: Props): ReactElement | null {
    if (!medisinskVurdering) return null

    return (
        <SykmeldingGroup parentId={parentId} heading="Medisinsk tilstand" Icon={BandageIcon}>
            <BodyShort as="em">
                Diagnose, bidiagnose og medisinsk tilstand blir ikke sendt til din eventuelle arbeidsgiver.
            </BodyShort>
            {medisinskVurdering.hovedDiagnose?.tekst && (
                <SykmeldingInfo heading="Diagnose" variant="gray">
                    {medisinskVurdering.hovedDiagnose.tekst}
                </SykmeldingInfo>
            )}
            {R.pipe(
                medisinskVurdering.biDiagnoser,
                R.map(R.prop('tekst')),
                R.filter(R.isTruthy),
                R.map((tekst) => (
                    <SykmeldingInfo key={tekst} heading="Bidiagnose" variant="gray">
                        {tekst}
                    </SykmeldingInfo>
                )),
            )}
            <>
                {medisinskVurdering.annenFraversArsak?.grunn &&
                    medisinskVurdering.annenFraversArsak?.grunn?.length > 0 && (
                        <SykmeldingInfo heading="Annen lovfestet fraværsgrunn" variant="gray">
                            {medisinskVurdering.annenFraversArsak.grunn.map(annenFraverGrunnToText).join('. ')}
                        </SykmeldingInfo>
                    )}
                {medisinskVurdering.annenFraversArsak?.beskrivelse != null && (
                    <SykmeldingInfo heading="Beskrivelse av fraværsgrunn" variant="gray">
                        {medisinskVurdering.annenFraversArsak.beskrivelse}
                    </SykmeldingInfo>
                )}
                {medisinskVurdering.svangerskap && (
                    <SykmeldingJaInfo heading="Er sykdommen svangerskapsrelatert?" variant="gray" />
                )}
                {medisinskVurdering.yrkesskade && (
                    <SykmeldingJaInfo
                        heading={
                            isV3
                                ? 'Kan sykmeldingen skyldes en yrkesskade/yrkessykdom?'
                                : 'Kan sykdommen skyldes en yrkesskade/yrkessykdom?'
                        }
                        variant="gray"
                    />
                )}
            </>
            {medisinskVurdering.yrkesskadeDato != null && (
                <SykmeldingInfo heading="Skadedato" variant="gray">
                    {toReadableDate(medisinskVurdering.yrkesskadeDato)}
                </SykmeldingInfo>
            )}
        </SykmeldingGroup>
    )
}

export default MedisinskTilstand
