import { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'

import { Arbeidsgiver, BrukerinformasjonFragment, NaermesteLederFragment, SykmeldingFragment, YesOrNo } from 'queries'

import { FormValues } from '../../../SendSykmeldingForm'
import { SectionWrapper } from '../../../../FormComponents/FormStructure'
import { findValgtArbeidsgiver } from '../../../../../utils/arbeidsgiverUtils'
import { useFindPrevSykmeldingTom } from '../../../../../hooks/useFindPrevSykmeldingTom'
import { getSykmeldingStartDate } from '../../../../../utils/sykmeldingUtils'
import { toDate } from '../../../../../utils/dateUtils'
import EgenmeldingerField from '../../../../FormComponents/Egenmelding/EgenmeldingerField'
import SendesTilArbeidsgiverInfo from '../SendesTilArbeidsgiver/SendesTilArbeidsgiverInfo'
import { useShouldShowSendesTilArbeidsgiverInfo, useShouldShowSeveralArbeidsgivereInfo } from '../formProgressUtils'

import ArbeidsgiverRiktigNarmesteLederField from './ArbeidsgiverRiktigNarmesteLederField'
import ArbeidsgiverField from './ArbeidsgiverField'
import FlereArbeidsgivereSection from './FlereArbeidsgivereSection'

type Props = {
    sykmelding: SykmeldingFragment
    arbeidsgivere: BrukerinformasjonFragment['arbeidsgivere']
}

function ArbeidsgiverSection({ sykmelding, arbeidsgivere }: Props): ReactElement | null {
    const { watch } = useFormContext<FormValues>()
    const [valgtArbeidsgiverOrgnummer, harFlereArbeidsforhold]: [string | null, YesOrNo | null] = watch([
        'arbeidsgiverOrgnummer',
        'erSykmeldtFraFlereArbeidsforhold',
    ])

    const { previousSykmeldingTom, error, isLoading } = useFindPrevSykmeldingTom(sykmelding, valgtArbeidsgiverOrgnummer)
    const { hasAktiv, shouldShowEgenmeldingsdager } = useArbeidsgiverSubSections(arbeidsgivere)
    const { shouldAskForSeveralSykmeldinger } = useShouldShowSeveralArbeidsgivereInfo(arbeidsgivere, sykmelding)
    const shouldShowSendesTilArbeidsgiverInfo = useShouldShowSendesTilArbeidsgiverInfo()
    const valgtArbeidsgiver = findValgtArbeidsgiver(arbeidsgivere, valgtArbeidsgiverOrgnummer)

    const hasCompletedSeveralArbeidsgivere: boolean =
        (shouldAskForSeveralSykmeldinger && harFlereArbeidsforhold === YesOrNo.YES) ||
        (shouldAskForSeveralSykmeldinger && harFlereArbeidsforhold === YesOrNo.NO) ||
        !shouldAskForSeveralSykmeldinger

    return (
        <SectionWrapper>
            <ArbeidsgiverField arbeidsgivere={arbeidsgivere} />
            {valgtArbeidsgiverOrgnummer && (
                <FlereArbeidsgivereSection sykmelding={sykmelding} arbeidsgivere={arbeidsgivere} />
            )}
            {hasAktiv && hasCompletedSeveralArbeidsgivere && (
                <ArbeidsgiverRiktigNarmesteLederField narmesteLeder={hasAktiv.narmesteleder} />
            )}
            {shouldShowEgenmeldingsdager && !error && !isLoading && (
                <EgenmeldingerField
                    index={0}
                    previous={{
                        earliestPossibleDate: toDate(getSykmeldingStartDate(sykmelding.sykmeldingsperioder)),
                        earliestSelectedDate: null,
                    }}
                    metadata={{
                        arbeidsgiverNavn: shouldShowEgenmeldingsdager.arbeidsgiverNavn,
                        previousSykmeldingTom: previousSykmeldingTom,
                    }}
                    amplitudeSkjemanavn="Egenmeldingsdager"
                />
            )}
            {shouldShowSendesTilArbeidsgiverInfo && (
                <SendesTilArbeidsgiverInfo
                    sykmelding={sykmelding}
                    metadata={{
                        sykmeldingId: sykmelding.id,
                        arbeidsgiverNavn: valgtArbeidsgiver?.navn ?? '',
                        narmestelederNavn: valgtArbeidsgiver?.naermesteLeder?.navn ?? '',
                        sykmeldingStartDato: getSykmeldingStartDate(sykmelding.sykmeldingsperioder),
                    }}
                />
            )}
        </SectionWrapper>
    )
}

function useArbeidsgiverSubSections(arbeidsgivere: BrukerinformasjonFragment['arbeidsgivere']): {
    hasAktiv: { narmesteleder: NaermesteLederFragment } | null
    shouldShowEgenmeldingsdager: { arbeidsgiverNavn: string } | null
} {
    const { watch } = useFormContext<FormValues>()
    const valgtArbeidsgiverOrgnummer: string | null = watch('arbeidsgiverOrgnummer')
    const valgtRiktigNarmesteLeder: YesOrNo | null = watch('riktigNarmesteLeder')

    const valgtArbeidsgiver: Arbeidsgiver | undefined = findValgtArbeidsgiver(arbeidsgivere, valgtArbeidsgiverOrgnummer)
    const hasAktivArbeidsgiverWithNarmesteleder =
        valgtArbeidsgiver?.aktivtArbeidsforhold && valgtArbeidsgiver.naermesteLeder != null

    const shouldShowEgenmeldingsdager =
        (valgtArbeidsgiver != null && valgtRiktigNarmesteLeder != null) ||
        (valgtArbeidsgiver != null && !hasAktivArbeidsgiverWithNarmesteleder)

    return {
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
