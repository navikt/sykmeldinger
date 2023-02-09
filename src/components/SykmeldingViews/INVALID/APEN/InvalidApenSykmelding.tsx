import { Alert, Button, ConfirmationPanel } from '@navikt/ds-react'
import { useController, useForm } from 'react-hook-form'
import { ApolloError } from '@apollo/client'

import { SykmeldingChangeStatus, SykmeldingFragment } from '../../../../fetching/graphql.generated'
import AvvistVeileder from '../../../AvvistVeileder/AvvistVeileder'
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger'
import Spacing from '../../../Spacing/Spacing'
import CenterItems from '../../../CenterItems/CenterItems'
import useGetSykmeldingIdParam from '../../../../hooks/useGetSykmeldingIdParam'
import { getBehandlerName } from '../../../../utils/behandlerUtils'
import { useChangeSykmeldingStatus } from '../../../../hooks/useMutations'
import { logAmplitudeEvent, useLogAmplitudeEvent } from '../../../../amplitude/amplitude'
import SykmeldingSykmeldtContainer from '../../SykmeldingView/SykmeldingSykmeldtContainer'

interface InvalidApenSykmeldingProps {
    sykmelding: SykmeldingFragment
}

interface FormData {
    bekreftetLest: boolean
}

const skjemanavn = 'invalid åpen sykmelding'

function InvalidApenSykmelding({ sykmelding }: InvalidApenSykmeldingProps): JSX.Element {
    useHotjarTrigger('SYKMELDING_INVALID_APEN')
    useLogAmplitudeEvent({ eventName: 'skjema åpnet', data: { skjemanavn } })

    const { bekreftInvalid, mutationLoading, mutationError } = useBekreftInvalid()
    const { control, handleSubmit } = useForm<FormData>()
    const { field, fieldState } = useController({
        name: 'bekreftetLest',
        control,
        defaultValue: false,
        rules: {
            validate: (value) =>
                value !== true ? 'Du må bekrefte at du har lest at sykmeldingen er avvist.' : undefined,
        },
    })

    return (
        <div className="sykmelding-container">
            <Spacing>
                <AvvistVeileder
                    behandlerNavn={getBehandlerName(sykmelding.behandler)}
                    behandlingsutfall={sykmelding.behandlingsutfall}
                />
            </Spacing>

            <Spacing>
                <SykmeldingSykmeldtContainer sykmelding={sykmelding} />
            </Spacing>

            <form
                onSubmit={handleSubmit(bekreftInvalid, () => {
                    logAmplitudeEvent({ eventName: 'skjema validering feilet', data: { skjemanavn } })
                })}
            >
                <CenterItems horizontal>
                    <Spacing>
                        <ConfirmationPanel
                            {...field}
                            checked={field.value}
                            label="Jeg bekrefter at jeg har lest at sykmeldingen er avvist"
                            error={fieldState.error?.message}
                            onChange={() => {
                                const newValue = !field.value
                                logAmplitudeEvent({
                                    eventName: 'skjema spørsmål besvart',
                                    data: {
                                        skjemanavn,
                                        [`spørsmål`]: 'bekreftet lest',
                                        svar: newValue ? 'Ja' : 'Nei',
                                    },
                                })
                                field.onChange(newValue)
                            }}
                        />
                    </Spacing>

                    {mutationError && (
                        <Spacing amount="small">
                            <Alert variant="error" role="alert" aria-live="polite">
                                {mutationError.message}
                            </Alert>
                        </Spacing>
                    )}

                    <Button variant="primary" type="submit" loading={mutationLoading}>
                        Bekreft
                    </Button>
                </CenterItems>
            </form>
        </div>
    )
}

function useBekreftInvalid(): {
    bekreftInvalid: () => void
    mutationError: ApolloError | undefined
    mutationLoading: boolean
} {
    const sykmeldingId = useGetSykmeldingIdParam()
    const [{ loading: mutationLoading, error: mutationError }, bekreftInvalid] = useChangeSykmeldingStatus(
        sykmeldingId,
        SykmeldingChangeStatus.BEKREFT_AVVIST,
        () => logAmplitudeEvent({ eventName: 'skjema fullført', data: { skjemanavn } }),
        () => logAmplitudeEvent({ eventName: 'skjema innsending feilet', data: { skjemanavn } }),
    )

    return {
        bekreftInvalid,
        mutationLoading,
        mutationError,
    }
}

export default InvalidApenSykmelding
