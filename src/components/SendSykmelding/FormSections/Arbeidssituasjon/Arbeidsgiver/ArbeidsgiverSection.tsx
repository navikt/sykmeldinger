import React from 'react'
import { useFormContext } from 'react-hook-form'

import {
    Arbeidsgiver,
    BrukerinformasjonFragment,
    SykmeldingFragment,
    YesOrNo,
} from '../../../../../fetching/graphql.generated'
import { FormValues } from '../../../SendSykmeldingForm'
import { SectionWrapper } from '../../shared/FormStructure'
import { getPublicEnv } from '../../../../../utils/env'
import EgenmeldingerField from '../Egenmelding/EgenmeldingerField'
import { findValgtArbeidsgiver } from '../../../../../utils/arbeidsgiverUtils'
import { useFindPrevSykmeldingTom } from '../../../../../hooks/useFindPrevSykmeldingTom'
import { getSykmeldingStartDate } from '../../../../../utils/sykmeldingUtils'
import { toDate } from '../../../../../utils/dateUtils'

import ArbeidsgivereMissingInfo from './ArbeidsgivereMissingInfo'
import ArbeidsgiverRiktigNarmesteLederField from './ArbeidsgiverRiktigNarmesteLederField'
import ArbeidsgiverField from './ArbeidsgiverField'
import styles from './ArbeidsgiverSection.module.css'

interface Props {
    sykmelding: SykmeldingFragment
    arbeidsgivere: BrukerinformasjonFragment['arbeidsgivere']
}

const publicEnv = getPublicEnv()

function ArbeidsgiverSection({ sykmelding, arbeidsgivere }: Props): JSX.Element | null {
    const { previousSykmeldingTom, error, isLoading } = useFindPrevSykmeldingTom(sykmelding)
    const loadingOrError = isLoading || error
    const { watch } = useFormContext<FormValues>()

    const valgtArbeidsgiverOrgnummer: string | null = watch('arbeidsgiverOrgnummer')
    const valgtRiktigNarmesteLeder: YesOrNo | null = watch('riktigNarmesteLeder')
    const valgtArbeidsgiver: Arbeidsgiver | undefined = findValgtArbeidsgiver(arbeidsgivere, valgtArbeidsgiverOrgnummer)
    const noArbeidsgivere: boolean = arbeidsgivere.length === 0

    const shouldShowEgenmelding =
        publicEnv.DISPLAY_EGENMELDING === 'true' && valgtArbeidsgiver && valgtRiktigNarmesteLeder && !loadingOrError

    return (
        <SectionWrapper>
            <ArbeidsgiverField arbeidsgivere={arbeidsgivere} />
            {noArbeidsgivere && <ArbeidsgivereMissingInfo />}
            {valgtArbeidsgiver?.aktivtArbeidsforhold && valgtArbeidsgiver?.naermesteLeder != null && (
                <ArbeidsgiverRiktigNarmesteLederField narmesteLeder={valgtArbeidsgiver.naermesteLeder} />
            )}
            {shouldShowEgenmelding && (
                <div className={styles.egenmeldingsperioder}>
                    <EgenmeldingerField
                        index={0}
                        previous={{
                            earliestPossibleDate: toDate(getSykmeldingStartDate(sykmelding)),
                            earliestSelectedDate: null,
                        }}
                        metadata={{
                            arbeidsgiverNavn: valgtArbeidsgiver.navn,
                            previousSykmeldingTom: previousSykmeldingTom,
                        }}
                    />
                </div>
            )}
        </SectionWrapper>
    )
}

export default ArbeidsgiverSection
