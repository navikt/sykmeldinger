import { ReactElement } from 'react'
import { ClockDashedIcon } from '@navikt/aksel-icons'

import type { Prognose } from 'queries'

import { toReadableDate } from '../../../../utils/dateUtils'
import { SykmeldingGroup } from '../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingInfo, SykmeldingInfoSubGroup, SykmeldingJaInfo } from '../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    prognose?: Prognose | null
    isV3: boolean
    parentId: string
}

function Prognose({ prognose, isV3, parentId }: Props): ReactElement | null {
    if (!prognose) return null

    if (
        !prognose.arbeidsforEtterPeriode &&
        !prognose.erIArbeid &&
        !prognose.erIkkeIArbeid &&
        !prognose.hensynArbeidsplassen
    ) {
        return null
    }

    return (
        <SykmeldingGroup parentId={parentId} heading="Prognose" Icon={ClockDashedIcon}>
            {prognose.arbeidsforEtterPeriode && (
                <SykmeldingJaInfo
                    heading={
                        isV3
                            ? 'Pasienten er 100% arbeidsfør etter denne perioden'
                            : 'Er pasienten 100% arbeidsfør etter denne perioden?'
                    }
                    variant="gray"
                />
            )}
            {prognose.hensynArbeidsplassen != null && (
                <SykmeldingInfo heading="Hensyn som må tas på arbeidsplassen" variant="gray">
                    {prognose.hensynArbeidsplassen}
                </SykmeldingInfo>
            )}
            {!!prognose.erIArbeid && (
                <SykmeldingInfoSubGroup variant="gray">
                    {prognose.erIArbeid.egetArbeidPaSikt && (
                        <SykmeldingJaInfo heading="Antas pasienten å kunne komme tilbake til samme arbeidsgiver på sikt?" />
                    )}
                    {prognose.erIArbeid.annetArbeidPaSikt && (
                        <SykmeldingJaInfo heading="Antas pasienten å kunne komme tilbake til annen arbeidsgiver på sikt?" />
                    )}
                    {prognose.erIArbeid.arbeidFOM != null && (
                        <SykmeldingInfo heading="Pasienten anslås å være tilbake">
                            {toReadableDate(prognose.erIArbeid.arbeidFOM)}
                        </SykmeldingInfo>
                    )}
                    {prognose.erIArbeid.vurderingsdato != null && (
                        <SykmeldingInfo heading="Behandler kan gi tilbakemelding på dette">
                            {toReadableDate(prognose.erIArbeid.vurderingsdato)}
                        </SykmeldingInfo>
                    )}
                </SykmeldingInfoSubGroup>
            )}
            {!!prognose.erIkkeIArbeid && (
                <SykmeldingInfoSubGroup variant="gray">
                    {prognose.erIkkeIArbeid.arbeidsforPaSikt && (
                        <SykmeldingJaInfo heading="Antas pasienten å kunne komme i arbeid på sikt?" />
                    )}
                    {!!prognose.erIkkeIArbeid.arbeidsforFOM && (
                        <SykmeldingInfo heading="Pasienten anslås å vær være arbeidsfør">
                            {toReadableDate(prognose.erIkkeIArbeid.arbeidsforFOM)}
                        </SykmeldingInfo>
                    )}
                    {!!prognose.erIkkeIArbeid.vurderingsdato && (
                        <SykmeldingInfo heading="Behandler kan gi tilbakemelding på dette">
                            {toReadableDate(prognose.erIkkeIArbeid.vurderingsdato)}
                        </SykmeldingInfo>
                    )}
                </SykmeldingInfoSubGroup>
            )}
        </SykmeldingGroup>
    )
}

export default Prognose
