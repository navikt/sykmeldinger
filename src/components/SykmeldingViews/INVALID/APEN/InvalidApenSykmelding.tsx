import { Alert, Button, ConfirmationPanel } from '@navikt/ds-react'
import { useController, useForm } from 'react-hook-form'
import { ApolloError } from '@apollo/client'
import { ReactElement } from 'react'

import { SykmeldingChangeStatus, SykmeldingFragment } from 'queries'

import AvvistVeileder from '../../../AvvistVeileder/AvvistVeileder'
import useGetSykmeldingIdParam from '../../../../hooks/useGetSykmeldingIdParam'
import { getBehandlerName } from '../../../../utils/behandlerUtils'
import { useChangeSykmeldingStatus } from '../../../../hooks/useMutations'
import { logAmplitudeEvent } from '../../../../amplitude/amplitude'
import SykmeldingSykmeldtSection from '../../../Sykmelding/SykmeldingerSykmeldt/SykmeldingSykmeldtSection'

type InvalidApenSykmeldingProps = {
    sykmelding: SykmeldingFragment
}

interface FormData {
    bekreftetLest: boolean
}

const skjemanavn = 'invalid åpen sykmelding'

function InvalidApenSykmelding({ sykmelding }: InvalidApenSykmeldingProps): ReactElement {
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
            <div className="mb-8">
                <AvvistVeileder
                    behandlerNavn={getBehandlerName(sykmelding.behandler)}
                    behandlingsutfall={sykmelding.behandlingsutfall}
                    perioder={sykmelding.sykmeldingsperioder}
                />
            </div>

            <div className="mb-8">
                <SykmeldingSykmeldtSection sykmelding={sykmelding} />
            </div>

            <form className="flex flex-col items-center" onSubmit={handleSubmit(bekreftInvalid)}>
                <div className="mb-8">
                    <ConfirmationPanel
                        {...field}
                        checked={field.value}
                        label="Jeg bekrefter at jeg har lest at sykmeldingen er avvist"
                        error={fieldState.error?.message}
                        onChange={() => {
                            field.onChange(!field.value)
                        }}
                    />
                </div>

                {mutationError && (
                    <div className="mb-4">
                        <Alert variant="error" role="alert" aria-live="polite">
                            {mutationError.message}
                        </Alert>
                    </div>
                )}

                <Button variant="primary" type="submit" loading={mutationLoading}>
                    Bekreft
                </Button>
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
