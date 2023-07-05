import { BodyLong, BodyShort, GuidePanel, Heading } from '@navikt/ds-react'

import { Behandlingsutfall } from '../../fetching/graphql.generated'

import ForklaringZDiagnose from './ForklaringZDiagnose'
import ForklaringAndre from './ForklaringAndre'
import ForklaringOverSytti from './ForklaringOverSytti'

interface AvvistVeilederProps {
    behandlerNavn: string
    behandlingsutfall: Behandlingsutfall
}

function AvvistVeileder({ behandlerNavn, behandlingsutfall }: AvvistVeilederProps): JSX.Element {
    const isNotValidInHPR = behandlingsutfall.ruleHits.some((regel) => regel.ruleName === 'BEHANDLER_IKKE_GYLDIG_I_HPR')
    const isMissingAuthorization = behandlingsutfall.ruleHits.some(
        (regel) => regel.ruleName === 'BEHANDLER_MANGLER_AUTORISASJON_I_HPR',
    )
    const isNotCorrectRole = behandlingsutfall.ruleHits.some(
        (regel) => regel.ruleName === 'BEHANDLER_IKKE_LE_KI_MT_TL_FT_I_HPR',
    )
    const isSuspended = behandlingsutfall.ruleHits.some((regel) => regel.ruleName === 'BEHANDLER_SUSPENDERT')
    const isOver12Weeks = behandlingsutfall.ruleHits.some(
        (regel) => regel.ruleName === 'BEHANDLER_MT_FT_KI_OVER_12_UKER',
    )
    const isOver70 = behandlingsutfall.ruleHits.some((regel) => regel.ruleName === 'PASIENT_ELDRE_ENN_70')
    const isZDiagnosis = behandlingsutfall.ruleHits.some((regel) => regel.ruleName === 'ICPC_2_Z_DIAGNOSE')

    return (
        <GuidePanel poster>
            <Heading size="small" className="my-4 text-center">
                Sykmeldingen kan dessverre ikke behandles automatisk
            </Heading>
            <div className="mt-6">
                {isNotValidInHPR || isMissingAuthorization || isNotCorrectRole || isSuspended ? (
                    <BodyShort>
                        Den som har skrevet sykmeldingen, har ikke autorisasjon til å gjøre det. Du må derfor få en
                        annen til å skrive sykmeldingen.
                    </BodyShort>
                ) : isOver12Weeks ? (
                    <>
                        <BodyLong className="pb-5">
                            Kiropraktorer og manuellterapeuter har ikke lov til å skrive en sykmelding som gjør at det
                            totale sykefraværet ditt blir lenger enn 12 uker.
                        </BodyLong>
                        <BodyLong>Du må få en lege til å skrive sykmeldingen.</BodyLong>
                    </>
                ) : isOver70 ? (
                    <ForklaringOverSytti />
                ) : isZDiagnosis ? (
                    <ForklaringZDiagnose />
                ) : (
                    <ForklaringAndre behandlerNavn={behandlerNavn} ruleHits={behandlingsutfall.ruleHits} />
                )}
            </div>
        </GuidePanel>
    )
}

export default AvvistVeileder
