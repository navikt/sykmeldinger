import * as R from 'remeda'

import { PeriodeFragment, Periodetype, SykmeldingFragment } from 'queries'

import { getSykmeldingTitle } from './sykmeldingUtils'

export function toSykmeldingAriaLabel(sykmelding: SykmeldingFragment, sykmeldingPeriod: string): string {
    const { period, periodLength } = findHighestPriorityPeriod(sykmelding)
    const periodLengthText: string = periodLength > 1 ? `(${periodLength} sykmeldingsperioder)` : ''

    if (period.type === Periodetype.GRADERT) {
        const gradSorted = R.pipe(
            sykmelding.sykmeldingsperioder,
            R.filter((it) => it.type === Periodetype.GRADERT),
            R.sortBy((it) => it.gradert?.grad ?? 0),
            R.reverse(),
            R.first(),
        )
        return !gradSorted
            ? `${getSykmeldingTitle(sykmelding)} ${sykmeldingPeriod} ${periodLengthText}`
            : `${getPeriodTitle(gradSorted)} ${getSykmeldingTitle(sykmelding)} ${sykmeldingPeriod} ${periodLengthText}`
    }

    return `${getPeriodTitle(period)} ${getSykmeldingTitle(sykmelding)} ${sykmeldingPeriod} ${periodLengthText}`
}

function findHighestPriorityPeriod(sykmelding: SykmeldingFragment): { period: PeriodeFragment; periodLength: number } {
    const periodList: PeriodeFragment[] = sykmelding.sykmeldingsperioder.map((period: PeriodeFragment) => period)

    const period: PeriodeFragment =
        (periodList.find((el) => el.type === Periodetype.AKTIVITET_IKKE_MULIG) ||
            periodList.find((el) => el.type === Periodetype.GRADERT) ||
            periodList.find((el) => el.type === Periodetype.BEHANDLINGSDAGER) ||
            periodList.find((el) => el.type === Periodetype.REISETILSKUDD) ||
            periodList.find((el) => el.type === Periodetype.AVVENTENDE)) ??
        periodList[0]

    return { period: period, periodLength: periodList.length }
}

function getPeriodTitle(period: PeriodeFragment): string {
    switch (period.type) {
        case Periodetype.AVVENTENDE:
            return 'Avventende'
        case Periodetype.AKTIVITET_IKKE_MULIG:
            return '100%'
        case Periodetype.GRADERT:
            return `${period.gradert?.grad}%`
        case Periodetype.REISETILSKUDD:
            return 'Reisetilskudd,'
        case Periodetype.BEHANDLINGSDAGER:
            return period.behandlingsdager && period.behandlingsdager > 1 ? 'Behandlingsdager,' : 'Behandlingsdag,'
    }
}
