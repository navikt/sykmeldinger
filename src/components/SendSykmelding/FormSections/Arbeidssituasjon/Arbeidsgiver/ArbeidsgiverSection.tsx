import React from 'react'
import { useFormContext } from 'react-hook-form'

import {
    Arbeidsgiver,
    BrukerinformasjonFragment,
    NaermesteLederFragment,
    SykmeldingFragment,
    YesOrNo,
} from '../../../../../fetching/graphql.generated'
import { FormValues } from '../../../SendSykmeldingForm'
import { SectionWrapper } from '../../../../FormComponents/FormStructure'
import { getPublicEnv } from '../../../../../utils/env'
import { findValgtArbeidsgiver } from '../../../../../utils/arbeidsgiverUtils'
import { useFindPrevSykmeldingTom } from '../../../../../hooks/useFindPrevSykmeldingTom'
import { getSykmeldingStartDate } from '../../../../../utils/sykmeldingUtils'
import { toDate } from '../../../../../utils/dateUtils'
import EgenmeldingerField from '../../../../FormComponents/Egenmelding/EgenmeldingerField'

import ArbeidsgivereMissingInfo from './ArbeidsgivereMissingInfo'
import ArbeidsgiverRiktigNarmesteLederField from './ArbeidsgiverRiktigNarmesteLederField'
import ArbeidsgiverField from './ArbeidsgiverField'

interface Props {
    sykmelding: SykmeldingFragment
    arbeidsgivere: BrukerinformasjonFragment['arbeidsgivere']
}

const publicEnv = getPublicEnv()

function ArbeidsgiverSection({ sykmelding, arbeidsgivere }: Props): JSX.Element | null {
    const { watch } = useFormContext<FormValues>()
    const valgtArbeidsgiverOrgnummer: string | null = watch('arbeidsgiverOrgnummer')

    const { previousSykmeldingTom, error, isLoading } = useFindPrevSykmeldingTom(sykmelding, valgtArbeidsgiverOrgnummer)
    const { hasNoArbeidsgiver, hasAktiv, shouldShowEgenmeldingsdager } = useArbeidsgiverSubSections(arbeidsgivere)

    return (
        <SectionWrapper>
            <ArbeidsgiverField arbeidsgivere={arbeidsgivere} />
            {hasNoArbeidsgiver && <ArbeidsgivereMissingInfo />}
            {hasAktiv && <ArbeidsgiverRiktigNarmesteLederField narmesteLeder={hasAktiv.narmesteleder} />}
            {publicEnv.DISPLAY_EGENMELDING === 'true' && shouldShowEgenmeldingsdager && !error && !isLoading && (
                <EgenmeldingerField
                    index={0}
                    previous={{
                        earliestPossibleDate: toDate(getSykmeldingStartDate(sykmelding)),
                        earliestSelectedDate: null,
                    }}
                    metadata={{
                        arbeidsgiverNavn: shouldShowEgenmeldingsdager.arbeidsgiverNavn,
                        previousSykmeldingTom: previousSykmeldingTom,
                    }}
                />
            )}
        </SectionWrapper>
    )
}

function useArbeidsgiverSubSections(arbeidsgivere: BrukerinformasjonFragment['arbeidsgivere']): {
    hasNoArbeidsgiver: boolean
    hasAktiv: { narmesteleder: NaermesteLederFragment } | null
    shouldShowEgenmeldingsdager: { arbeidsgiverNavn: string } | null
} {
    const { watch } = useFormContext<FormValues>()
    const valgtArbeidsgiverOrgnummer: string | null = watch('arbeidsgiverOrgnummer')
    const valgtRiktigNarmesteLeder: YesOrNo | null = watch('riktigNarmesteLeder')

    const valgtArbeidsgiver: Arbeidsgiver | undefined = findValgtArbeidsgiver(arbeidsgivere, valgtArbeidsgiverOrgnummer)
    const hasNoArbeidsgiver: boolean = arbeidsgivere.length === 0
    const hasAktivArbeidsgiverWithNarmesteleder =
        valgtArbeidsgiver?.aktivtArbeidsforhold && valgtArbeidsgiver.naermesteLeder != null

    const shouldShowEgenmeldingsdager =
        (valgtArbeidsgiver != null && valgtRiktigNarmesteLeder === YesOrNo.YES) ||
        (valgtArbeidsgiver != null && !hasAktivArbeidsgiverWithNarmesteleder)

    return {
        hasNoArbeidsgiver,
        hasAktiv: hasAktivArbeidsgiverWithNarmesteleder
            ? {
                  narmesteleder: valgtArbeidsgiver.naermesteLeder,
              }
            : null,
        shouldShowEgenmeldingsdager: shouldShowEgenmeldingsdager
            ? {
                  arbeidsgiverNavn: valgtArbeidsgiver.navn,
              }
            : null,
    }
}

export default ArbeidsgiverSection
