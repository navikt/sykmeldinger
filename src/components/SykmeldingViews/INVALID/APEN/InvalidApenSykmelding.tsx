import { Alert, Button, ConfirmationPanel } from '@navikt/ds-react'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'

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
    const sykmeldingId = useGetSykmeldingIdParam()
    useHotjarTrigger('SYKMELDING_INVALID_APEN')
    useLogAmplitudeEvent({ eventName: 'skjema åpnet', data: { skjemanavn } })

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>()
    const [{ loading: fetchingBekreft, error: errorBekreft }, bekreft] = useChangeSykmeldingStatus(
        sykmeldingId,
        SykmeldingChangeStatus.BEKREFT_AVVIST,
        () => logAmplitudeEvent({ eventName: 'skjema fullført', data: { skjemanavn } }),
        () => logAmplitudeEvent({ eventName: 'skjema innsending feilet', data: { skjemanavn } }),
    )

    useEffect(() => {
        if (errors.bekreftetLest) {
            logAmplitudeEvent({ eventName: 'skjema validering feilet', data: { skjemanavn } })
        }
    }, [errors.bekreftetLest])

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
                onSubmit={handleSubmit(() => {
                    bekreft()
                })}
            >
                <CenterItems horizontal>
                    <Controller
                        control={control}
                        name="bekreftetLest"
                        defaultValue={false}
                        rules={{
                            validate: (value) =>
                                value === true || 'Du må bekrefte at du har lest at sykmeldingen er avvist.',
                        }}
                        render={({ field, fieldState }) => (
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
                        )}
                    />

                    {errorBekreft && (
                        <Spacing amount="small">
                            <Alert variant="error" role="alert" aria-live="polite">
                                {errorBekreft.message}
                            </Alert>
                        </Spacing>
                    )}

                    <Button variant="primary" type="submit" disabled={fetchingBekreft} loading={fetchingBekreft}>
                        Bekreft
                    </Button>
                </CenterItems>
            </form>
        </div>
    )
}

export default InvalidApenSykmelding
