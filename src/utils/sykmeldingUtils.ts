import { differenceInDays, isAfter, isBefore, parseISO } from 'date-fns'

import { StatusEvent, SykmeldingFragment } from '../fetching/graphql.generated'

import { toDate, toReadableDatePeriod } from './dateUtils'
import { isUtenlandsk } from './utenlanskUtils'

export function isActiveSykmelding(sykmelding: SykmeldingFragment): boolean {
    // Alt som ikke er APEN status, er inaktive
    if (sykmelding.sykmeldingStatus.statusEvent !== 'APEN') return false
    // APEN sykmeldinger blir inaktive etter 12 måneder
    return differenceInDays(new Date(), parseISO(sykmelding.mottattTidspunkt)) < 365
}

export function isUnderbehandling(sykmelding: SykmeldingFragment): boolean {
    return (
        sykmelding.sykmeldingStatus.statusEvent === StatusEvent.SENDT &&
        sykmelding.merknader?.find((it) => it.type === 'UNDER_BEHANDLING') != null
    )
}

export function isSendtSykmelding(sykmelding: SykmeldingFragment): boolean {
    return (
        sykmelding.sykmeldingStatus.statusEvent === StatusEvent.SENDT ||
        sykmelding.sykmeldingStatus.statusEvent === StatusEvent.BEKREFTET
    )
}

/**
 * Get the type of sykmelding
 * Used for displaying the title.
 * @return {string}
 */
export function getSykmeldingTitle(
    sykmelding: SykmeldingFragment | undefined,
): 'Sykmelding' | 'Papirsykmelding' | 'Egenmelding' | 'Utenlandsk sykmelding' {
    if (sykmelding && isUtenlandsk(sykmelding)) {
        return 'Utenlandsk sykmelding'
    } else if (sykmelding?.papirsykmelding) {
        return 'Papirsykmelding'
    } else if (sykmelding?.egenmeldt) {
        return 'Egenmelding'
    }
    return 'Sykmelding'
}

/**
 * Get the first fom date of the earliest sykmelding period
 * @return {Date} The start date
 */
export function getSykmeldingStartDate(sykmelding: {
    sykmeldingsperioder: readonly { readonly fom: string }[]
}): string {
    return sykmelding.sykmeldingsperioder.reduce((acc, value) =>
        isBefore(toDate(value.fom), toDate(acc.fom)) ? value : acc,
    ).fom
}

/**
 * Get the last tom date of the last sykmelding period
 * @return {Date} The end date
 */
export function getSykmeldingEndDate(sykmelding: SykmeldingFragment): string {
    return sykmelding.sykmeldingsperioder.reduce((acc, value) =>
        isAfter(toDate(value.fom), toDate(acc.fom)) ? value : acc,
    ).tom
}

/**
 * Get the text representation of the sykmelding length from start date to end date
 * @return {string} The sykmelding length
 */
export function getReadableSykmeldingLength(sykmelding: SykmeldingFragment): string {
    const startDate = getSykmeldingStartDate(sykmelding)
    const endDate = getSykmeldingEndDate(sykmelding)

    return toReadableDatePeriod(startDate, endDate)
}

export function isV3(sykmelding: SykmeldingFragment): boolean {
    return sykmelding.rulesetVersion === 3
}
