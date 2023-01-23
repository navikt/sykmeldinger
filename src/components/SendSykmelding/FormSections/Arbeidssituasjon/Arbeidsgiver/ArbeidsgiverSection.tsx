import React, { useLayoutEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { BrukerinformasjonFragment } from '../../../../../fetching/graphql.generated'
import { FormValues } from '../../../SendSykmeldingForm'
import { SectionWrapper } from '../../shared/FormStructure'
import EgenmeldingerField from '../Egenmelding/EgenmeldingerField'
import { getPublicEnv } from '../../../../../utils/env'

import ArbeidsgivereMissingInfo from './ArbeidsgivereMissingInfo'
import ArbeidsgiverRiktigNarmesteLederField from './ArbeidsgiverRiktigNarmesteLederField'
import ArbeidsgiverField from './ArbeidsgiverField'
import styles from './ArbeidsgiverSection.module.css'

interface Props {
    arbeidsgivere: BrukerinformasjonFragment['arbeidsgivere']
    sykmeldingFom: Date | string
}

const publicEnv = getPublicEnv()

function ArbeidsgiverSection({ arbeidsgivere, sykmeldingFom }: Props): JSX.Element {
    const { watch } = useFormContext<FormValues>()
    const valgtArbeidsgiverOrgnummer: string | null = watch('arbeidsgiverOrgnummer')
    const valgtRiktigNarmesteLeder: string | null = watch('riktigNarmesteLeder')
    const valgtArbeidsgiver = arbeidsgivere.find((ag) => ag.orgnummer === valgtArbeidsgiverOrgnummer)
    const noArbeidsgivere = arbeidsgivere.length === 0

    const { control } = useFormContext<FormValues>()
    const { fields, append } = useFieldArray({
        control,
        name: 'egenmeldingsperioderAnsatt',
    })

    useLayoutEffect(() => {
        if (fields.length === 0) {
            append({ harPerioder: null, datoer: null, hasClickedVidere: null })
        }
    }, [fields, append])

    return (
        <SectionWrapper>
            <ArbeidsgiverField arbeidsgivere={arbeidsgivere} />
            {noArbeidsgivere && <ArbeidsgivereMissingInfo />}
            {valgtArbeidsgiver?.aktivtArbeidsforhold && valgtArbeidsgiver?.naermesteLeder != null && (
                <ArbeidsgiverRiktigNarmesteLederField narmesteLeder={valgtArbeidsgiver.naermesteLeder} />
            )}
            {publicEnv.DISPLAY_EGENMELDING === 'true' && valgtRiktigNarmesteLeder && valgtArbeidsgiver?.navn && (
                <div className={styles.egenmeldingsperioder}>
                    {fields.map((field, index) => (
                        <EgenmeldingerField
                            key={field.id}
                            index={index}
                            sykmeldingFom={sykmeldingFom}
                            arbeidsgiverNavn={valgtArbeidsgiver?.navn}
                            append={append}
                        />
                    ))}
                </div>
            )}
        </SectionWrapper>
    )
}

export default ArbeidsgiverSection
