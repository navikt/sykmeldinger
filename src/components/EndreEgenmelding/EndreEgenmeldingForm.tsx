import { FormProvider, useForm } from 'react-hook-form'
import { Alert, BodyShort, Button, Heading } from '@navikt/ds-react'
import Link from 'next/link'
import { ComponentType, ReactElement } from 'react'
import dynamic from 'next/dynamic'
import { logger } from '@navikt/next-logger'

import { SvarUnion_DagerSvar_Fragment, SykmeldingFragment } from 'queries'

import EgenmeldingerField, { EgenmeldingsdagerSubForm } from '../FormComponents/Egenmelding/EgenmeldingerField'
import { toDate } from '../../utils/dateUtils'
import { getSykmeldingStartDate } from '../../utils/sykmeldingUtils'
import { useEndreEgenmeldingsdager } from '../../hooks/useMutations'
import { logAmplitudeEvent } from '../../amplitude/amplitude'
import useWarnUnsavedPopup from '../../hooks/useWarnUnsaved'

import { createEgenmeldingsdagerDefaultValues } from './egenmeldingsdagerFormUtils'

const FormDevTools: ComponentType = dynamic(() => import('../FormComponents/DevTools/FormDevTools'), {
    ssr: false,
})

type EndreEgenmeldingFormProps = {
    sykmelding: SykmeldingFragment
    egenmeldingsdager: SvarUnion_DagerSvar_Fragment | null
    previousSykmeldingTom: Date | null
}

function EndreEgenmeldingForm({
    sykmelding,
    egenmeldingsdager,
    previousSykmeldingTom,
}: EndreEgenmeldingFormProps): ReactElement {
    const skjemanavn = 'Endre egenmeldingsdager'
    const [{ loading, error }, endreEgenmeldingsdager] = useEndreEgenmeldingsdager(
        sykmelding.id,
        (values) =>
            logAmplitudeEvent(
                { eventName: 'skjema fullført', data: { skjemanavn: skjemanavn } },
                { 'antall egenmeldingsdager': values.egenmeldingsdager?.length ?? null },
            ),
        () =>
            logAmplitudeEvent({
                eventName: 'skjema innsending feilet',
                data: { skjemanavn: skjemanavn },
            }),
    )

    const form = useForm<EgenmeldingsdagerSubForm>({
        defaultValues: egenmeldingsdager
            ? {
                  egenmeldingsdager: createEgenmeldingsdagerDefaultValues(
                      sykmelding,
                      previousSykmeldingTom,
                      egenmeldingsdager.dager,
                  ),
              }
            : {
                  egenmeldingsdager: null,
              },
    })

    useWarnUnsavedPopup(form.formState.isDirty && !form.formState.isSubmitSuccessful)

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(endreEgenmeldingsdager, (errors) => {
                    logger.debug(`Form errored, errors: ${JSON.stringify(errors, null, 2)}`)
                })}
            >
                <EgenmeldingerField
                    index={0}
                    previous={{
                        earliestPossibleDate: toDate(getSykmeldingStartDate(sykmelding.sykmeldingsperioder)),
                        earliestSelectedDate: null,
                    }}
                    metadata={{
                        arbeidsgiverNavn: sykmelding.sykmeldingStatus.arbeidsgiver?.orgNavn ?? '',
                        previousSykmeldingTom: previousSykmeldingTom,
                    }}
                    editSentEgenmelding
                    amplitudeSkjemanavn={skjemanavn}
                />
                <div className="mt-16 flex flex-col gap-4 border-t-2 border-border-divider pt-8">
                    <div>
                        <Button type="submit" loading={loading}>
                            Registrer endringene
                        </Button>
                    </div>
                    <div>
                        <Link href={`/${sykmelding.id}`} legacyBehavior passHref>
                            <Button as="a" variant="secondary" disabled={loading}>
                                Avbryt
                            </Button>
                        </Link>
                    </div>
                </div>
                {error && (
                    <Alert className="mt-4" variant="error" role="alert">
                        <Heading size="small" level="3" spacing>
                            Klarte ikke å sende inn oppdaterte egenmeldingsdager
                        </Heading>
                        <BodyShort spacing>
                            Innsendingen ble ikke gjennomført på grunn av en ukjent feil, vi jobber allerede med å løse
                            problemet. Vennligst prøv igjen senere.
                        </BodyShort>
                        <BodyShort>Vennligst kontakt NAV dersom problemet vedvarer.</BodyShort>
                    </Alert>
                )}
            </form>
            <FormDevTools />
        </FormProvider>
    )
}

export default EndreEgenmeldingForm
