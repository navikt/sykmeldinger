import { Historic } from '@navikt/ds-icons'

import { Prognose } from '../../../../../fetching/graphql.generated'
import { toReadableDate } from '../../../../../utils/dateUtils'
import JaEntry from '../../Layout/JaEntry/JaEntry'
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry'
import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading'

interface Props {
    prognose?: Prognose | null
    isV3: boolean
}

function Prognose({ prognose, isV3 }: Props): JSX.Element | null {
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
        <div>
            <SykmeldtHeading title="Prognose" Icon={Historic} />
            {prognose.arbeidsforEtterPeriode && (
                <div className="mb-3 rounded bg-gray-50 p-4">
                    <JaEntry
                        title={
                            isV3
                                ? 'Pasienten er 100% arbeidsfør etter denne perioden'
                                : 'Er pasienten 100% arbeidsfør etter denne perioden?'
                        }
                    />
                </div>
            )}
            {!!prognose.hensynArbeidsplassen && (
                <div className="mb-3 rounded bg-gray-50 p-4">
                    <SykmeldingEntry
                        title="Hensyn som må tas på arbeidsplassen"
                        mainText={prognose.hensynArbeidsplassen}
                        small
                    />
                </div>
            )}
            {!!prognose.erIArbeid && (
                <div className="mb-3 rounded bg-gray-50 p-4">
                    {prognose.erIArbeid.egetArbeidPaSikt && (
                        <JaEntry title="Antas pasienten å kunne komme tilbake til samme arbeidsgiver på sikt?" />
                    )}
                    {prognose.erIArbeid.annetArbeidPaSikt && (
                        <JaEntry title="Antas pasienten å kunne komme tilbake til annen arbeidsgiver på sikt?" />
                    )}
                    {!!prognose.erIArbeid.arbeidFOM && (
                        <SykmeldingEntry
                            title="Pasienten anslås å være tilbake"
                            mainText={toReadableDate(prognose.erIArbeid.arbeidFOM)}
                            small
                        />
                    )}
                    {!!prognose.erIArbeid.vurderingsdato && (
                        <SykmeldingEntry
                            title="Behandler kan gi tilbakemelding på dette"
                            mainText={toReadableDate(prognose.erIArbeid.vurderingsdato)}
                            small
                        />
                    )}
                </div>
            )}
            {!!prognose.erIkkeIArbeid && (
                <div className="mb-3 rounded bg-gray-50 p-4">
                    {prognose.erIkkeIArbeid.arbeidsforPaSikt && (
                        <JaEntry title="Antas pasienten å kunne komme i arbeid på sikt?" />
                    )}
                    {!!prognose.erIkkeIArbeid.arbeidsforFOM && (
                        <SykmeldingEntry
                            title="Pasienten anslås å vær være arbeidsfør"
                            mainText={toReadableDate(prognose.erIkkeIArbeid.arbeidsforFOM)}
                            small
                        />
                    )}
                    {!!prognose.erIkkeIArbeid.vurderingsdato && (
                        <SykmeldingEntry
                            title="Behandler kan gi tilbakemelding på dette"
                            mainText={toReadableDate(prognose.erIkkeIArbeid.vurderingsdato)}
                            small
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default Prognose
