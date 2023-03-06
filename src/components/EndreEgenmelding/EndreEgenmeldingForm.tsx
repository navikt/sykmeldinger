import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@navikt/ds-react'
import Link from 'next/link'
import { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import { logger } from '@navikt/next-logger'

import EgenmeldingerField, { EgenmeldingsdagerSubForm } from '../FormComponents/Egenmelding/EgenmeldingerField'
import { toDate } from '../../utils/dateUtils'
import { getSykmeldingStartDate } from '../../utils/sykmeldingUtils'
import { SvarUnion_DagerSvar_Fragment, SykmeldingFragment } from '../../fetching/graphql.generated'

import { createEgenmeldingsdagerDefaultValues } from './egenmeldingsdagerFormUtils'
import styles from './EndreEgenmeldingForm.module.css'

const FormDevTools: ComponentType = dynamic(() => import('../FormComponents/DevTools/FormDevTools'), {
    ssr: false,
})

type EndreEgenmeldingFormProps = {
    sykmelding: SykmeldingFragment
    egenmeldingsdager: SvarUnion_DagerSvar_Fragment
    previousSykmeldingTom: Date | null
}

export function EndreEgenmeldingForm({
    sykmelding,
    egenmeldingsdager,
    previousSykmeldingTom,
}: EndreEgenmeldingFormProps): JSX.Element {
    const form = useForm<EgenmeldingsdagerSubForm>({
        defaultValues: {
            egenmeldingsdager: createEgenmeldingsdagerDefaultValues(
                sykmelding,
                previousSykmeldingTom,
                egenmeldingsdager.dager,
            ),
        },
    })

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(
                    (values) => {
                        logger.debug(
                            `Form submitted, but we don't have a backend yet :(, values: ${JSON.stringify(
                                values,
                                null,
                                2,
                            )}`,
                        )
                    },
                    (errors) => {
                        logger.debug(`Form errored, errors: ${JSON.stringify(errors, null, 2)}`)
                    },
                )}
            >
                <EgenmeldingerField
                    index={0}
                    previous={{
                        earliestPossibleDate: toDate(getSykmeldingStartDate(sykmelding)),
                        earliestSelectedDate: null,
                    }}
                    metadata={{
                        arbeidsgiverNavn: sykmelding.sykmeldingStatus.arbeidsgiver?.orgNavn ?? '',
                        previousSykmeldingTom: previousSykmeldingTom,
                    }}
                />
                <div className={styles.formButtons}>
                    <div>
                        <Button type="submit">Registrer endringene</Button>
                    </div>
                    <div>
                        <Link href={`/${sykmelding.id}`} legacyBehavior passHref>
                            <Button as="a" variant="secondary">
                                Avbryt
                            </Button>
                        </Link>
                    </div>
                </div>
            </form>
            <FormDevTools />
        </FormProvider>
    )
}

export default EndreEgenmeldingForm
