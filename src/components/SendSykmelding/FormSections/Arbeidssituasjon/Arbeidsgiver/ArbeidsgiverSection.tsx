import React from 'react'
import { useFormContext } from 'react-hook-form'

import { BrukerinformasjonFragment } from '../../../../../fetching/graphql.generated'
import { FormValues } from '../../../SendSykmeldingForm'
import { SectionWrapper } from '../../shared/FormStructure'
import { getPublicEnv } from '../../../../../utils/env'
import EgenmeldingerField from '../Egenmelding/EgenmeldingerField'

import ArbeidsgivereMissingInfo from './ArbeidsgivereMissingInfo'
import ArbeidsgiverRiktigNarmesteLederField from './ArbeidsgiverRiktigNarmesteLederField'
import ArbeidsgiverField from './ArbeidsgiverField'
import styles from './ArbeidsgiverSection.module.css'

interface Props {
    arbeidsgivere: BrukerinformasjonFragment['arbeidsgivere']
    sykmeldingFom: Date
}

const publicEnv = getPublicEnv()

function ArbeidsgiverSection({ arbeidsgivere, sykmeldingFom }: Props): JSX.Element {
    const { watch } = useFormContext<FormValues>()
    const valgtArbeidsgiverOrgnummer: string | null = watch('arbeidsgiverOrgnummer')
    const valgtRiktigNarmesteLeder: string | null = watch('riktigNarmesteLeder')
    const valgtArbeidsgiver = arbeidsgivere.find((ag) => ag.orgnummer === valgtArbeidsgiverOrgnummer)
    const noArbeidsgivere = arbeidsgivere.length === 0

    return (
        <SectionWrapper>
            <ArbeidsgiverField arbeidsgivere={arbeidsgivere} />
            {noArbeidsgivere && <ArbeidsgivereMissingInfo />}
            {valgtArbeidsgiver?.aktivtArbeidsforhold && valgtArbeidsgiver?.naermesteLeder != null && (
                <ArbeidsgiverRiktigNarmesteLederField narmesteLeder={valgtArbeidsgiver.naermesteLeder} />
            )}
            {publicEnv.DISPLAY_EGENMELDING === 'true' && valgtRiktigNarmesteLeder && valgtArbeidsgiver?.navn && (
                <div className={styles.egenmeldingsperioder}>
                    <EgenmeldingerField
                        index={0}
                        previous={{
                            earliestPossibleDate: sykmeldingFom,
                            earliestSelectedDate: null,
                        }}
                        metadata={{
                            arbeidsgiverNavn: valgtArbeidsgiver.navn,
                            // TODO https://trello.com/c/7Sqn8vbo
                            previousSykmeldingTom: null,
                        }}
                    />
                </div>
            )}
        </SectionWrapper>
    )
}

export default ArbeidsgiverSection
