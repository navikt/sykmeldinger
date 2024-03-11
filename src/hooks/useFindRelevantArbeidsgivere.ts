import { isSameDay, subDays, isBefore, Interval, areIntervalsOverlapping } from 'date-fns'
import * as R from 'remeda'

import { Arbeidsgiver, SykmeldingFragment } from 'queries'

import { getSykmeldingEndDate, getSykmeldingStartDate, isSendtSykmelding, isValidRange } from '../utils/sykmeldingUtils'
import { toDate } from '../utils/dateUtils'
import { sykmeldingByDateAsc } from '../utils/sykmeldingSortUtils'

import useSykmeldinger from './useSykmeldinger'

export interface PossibleArbeidsgiver {
    navn: string | undefined
    orgnummer: string | undefined
}

export function useFindRelevantArbeidsgivere(
    sykmelding: SykmeldingFragment,
    brukerinfoArbeidsgivere: readonly Arbeidsgiver[],
): {
    arbeidsgivere: PossibleArbeidsgiver[] | null
    isLoading: boolean
    error: Error | undefined
} {
    const { data, error, loading } = useSykmeldinger()

    if (loading || error || data?.sykmeldinger == null) {
        return {
            arbeidsgivere: null,
            isLoading: loading,
            error,
        }
    }

    const otherSykmeldinger: SykmeldingFragment[] = data.sykmeldinger
        .filter(isSendtSykmelding)
        .filter(isNotNullArbeidsgiver)
        .filter(isValidRange)
        .filter((it) => isPrevSykmeldingFomBeforeTom(it, sykmelding))
        .sort(sykmeldingByDateAsc)
        .reverse()

    const sykmeldingerEdgeToEdge: SykmeldingFragment[] = getSykmeldingerEdgeToEdge(sykmelding, otherSykmeldinger)

    const mappedBrukerInfoArbeidsgivere: PossibleArbeidsgiver[] = brukerinfoArbeidsgivere?.map((it) => {
        return {
            navn: it.navn,
            orgnummer: it.orgnummer,
        }
    })

    const earlierArbeidsgivere: PossibleArbeidsgiver[] = R.pipe(
        sykmeldingerEdgeToEdge,
        R.map((syk) => {
            return {
                navn: syk.sykmeldingStatus.arbeidsgiver?.orgNavn,
                orgnummer: syk.sykmeldingStatus.arbeidsgiver?.orgnummer,
            }
        }),
    )

    if (!earlierArbeidsgivere.length) {
        return {
            arbeidsgivere: null,
            isLoading: loading,
            error,
        }
    }

    const arbeidsgivereCombined: PossibleArbeidsgiver[] = R.pipe(
        R.concat(earlierArbeidsgivere, mappedBrukerInfoArbeidsgivere),
        R.uniqueBy((x: PossibleArbeidsgiver) => x.orgnummer),
    )

    return {
        arbeidsgivere: arbeidsgivereCombined ?? null,
        isLoading: loading,
        error,
    }
}

function isPrevSykmeldingFomBeforeTom(sykmelding: SykmeldingFragment, relevantSykmelding: SykmeldingFragment): boolean {
    return isBefore(
        toDate(getSykmeldingStartDate(sykmelding.sykmeldingsperioder)),
        toDate(getSykmeldingEndDate(relevantSykmelding.sykmeldingsperioder)),
    )
}

function isNotNullArbeidsgiver(sykmelding: SykmeldingFragment): boolean {
    return sykmelding.sykmeldingStatus.arbeidsgiver != null
}

function getSykmeldingerEdgeToEdge(sykmelding: SykmeldingFragment, others: SykmeldingFragment[]): SykmeldingFragment[] {
    if (others.length === 0) return []

    const [behind, ...rest] = others

    const sykmeldingFom = toDate(getSykmeldingStartDate(sykmelding.sykmeldingsperioder))
    const sykmeldingTom = toDate(getSykmeldingEndDate(sykmelding.sykmeldingsperioder))
    const sykmeldingInterval: Interval = { start: sykmeldingFom, end: sykmeldingTom }

    const behindFom = toDate(getSykmeldingStartDate(behind.sykmeldingsperioder))
    const behindTom = toDate(getSykmeldingEndDate(behind.sykmeldingsperioder))
    const behindInterval: Interval = { start: behindFom, end: behindTom }

    const intervalsOverlapping = areIntervalsOverlapping(sykmeldingInterval, behindInterval, { inclusive: true })
    const isFomOneDayBeforeTom = isSameDay(subDays(sykmeldingFom, 1), behindTom)
    if (intervalsOverlapping || isFomOneDayBeforeTom) {
        return [...getSykmeldingerEdgeToEdge(behind, rest), behind]
    }

    return []
}
