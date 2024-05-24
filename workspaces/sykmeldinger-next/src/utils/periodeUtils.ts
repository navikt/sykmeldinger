import { sortBy } from 'remeda'

import { AnnenFraverGrunn, ArbeidsrelatertArsakType, MedisinskArsakType, Periodetype } from 'queries'

import { diffInDays } from './dateUtils'

export function medisinskArsakToText(value: MedisinskArsakType, isV3: boolean): string {
    switch (value) {
        case MedisinskArsakType.TILSTAND_HINDRER_AKTIVITET:
            return isV3
                ? 'Helsetilstanden hindrer pasienten å være i aktivitet'
                : 'Helsetilstanden hindrer pasienten i å være i aktivitet'
        case MedisinskArsakType.AKTIVITET_FORVERRER_TILSTAND:
            return isV3 ? 'Aktivitet vil forverre helsetilstand' : 'Aktivitet vil forverre helsetilstanden'
        case MedisinskArsakType.AKTIVITET_FORHINDRER_BEDRING:
            return 'Aktivitet vil hindre/forsinke bedring av helsetilstanden'
        case MedisinskArsakType.ANNET:
            return 'Annet'
    }
}

export function arbeidsrelatertArsakToText(value: ArbeidsrelatertArsakType): string {
    switch (value) {
        case ArbeidsrelatertArsakType.MANGLENDE_TILRETTELEGGING:
            return 'Manglende tilrettelegging på arbeidsplassen'
        case ArbeidsrelatertArsakType.ANNET:
            return 'Annet'
    }
}

export function annenFraverGrunnToText(value: AnnenFraverGrunn): string {
    switch (value) {
        case AnnenFraverGrunn.GODKJENT_HELSEINSTITUSJON:
            return 'Når vedkommende er innlagt i en godkjent helseinstitusjon'
        case AnnenFraverGrunn.BEHANDLING_FORHINDRER_ARBEID:
            return 'Når vedkommende er under behandling og legen erklærer at behandlingen gjør det nødvendig at vedkommende ikke arbeider'
        case AnnenFraverGrunn.ARBEIDSRETTET_TILTAK:
            return 'Når vedkommende deltar på et arbeidsrettet tiltak'
        case AnnenFraverGrunn.MOTTAR_TILSKUDD_GRUNNET_HELSETILSTAND:
            return 'Når vedkommende på grunn av sykdom, skade eller lyte får tilskott når vedkommende på grunn av sykdom, skade eller lyte får tilskott'
        case AnnenFraverGrunn.NODVENDIG_KONTROLLUNDENRSOKELSE:
            return 'Når vedkommende er til nødvendig kontrollundersøkelse som krever minst 24 timers fravær, reisetid medregnet'
        case AnnenFraverGrunn.SMITTEFARE:
            return 'Når vedkommende myndighet har nedlagt forbud mot at han eller hun arbeider på grunn av smittefare'
        case AnnenFraverGrunn.ABORT:
            return 'Når vedkommende er arbeidsufør som følge av svangerskapsavbrudd'
        case AnnenFraverGrunn.UFOR_GRUNNET_BARNLOSHET:
            return 'Når vedkommende er arbeidsufør som følge av behandling for barnløshet'
        case AnnenFraverGrunn.DONOR:
            return 'Når vedkommende er donor eller er under vurdering som donor'
        case AnnenFraverGrunn.BEHANDLING_STERILISERING:
            return 'Når vedkommende er arbeidsufør som følge av behandling i forbindelse med sterilisering'
    }
}

/**
 * Get a text representation of the period type
 * @return {string} The period string
 */
export function getPeriodTitle<Periode extends { type: Periodetype; gradert?: { grad: number } | null }>(
    period: Periode,
): string {
    switch (period.type) {
        case Periodetype.AVVENTENDE:
            return 'Avventende sykmelding'
        case Periodetype.AKTIVITET_IKKE_MULIG:
            return '100% sykmelding'
        case Periodetype.GRADERT:
            return `${period.gradert?.grad}% sykmelding`
        case Periodetype.REISETILSKUDD:
            return 'Reisetilskudd'
        case Periodetype.BEHANDLINGSDAGER:
            return 'Behandlingsdager'
    }
}

/**
 * Get a text representation of the period length
 * @return {string} The period string
 */
export function getReadableLength<
    Periode extends { type: Periodetype; behandlingsdager?: number | null; fom: string; tom: string },
>(period: Periode): string {
    const length = diffInDays(period.fom, period.tom)
    if (period.type === Periodetype.BEHANDLINGSDAGER) {
        return `${period.behandlingsdager} behandlingsdag${
            period.behandlingsdager && period.behandlingsdager > 1 ? 'er' : ''
        } i løpet av ${length} dag${length > 1 ? 'er' : ''}`
    }
    return `(${length} dag${length === 1 ? ')' : 'er)'}`
}

/**
 * Get a text representation of the period based on the type of the period
 * @return {string} The period discription
 */
export function getDescription(
    period: {
        type: Periodetype
        fom: string
        tom: string
        behandlingsdager?: number | null
        gradert?: { grad: number } | null
    },
    arbeidsgiverNavn?: string,
): string {
    const periodLength = diffInDays(period.fom, period.tom)

    switch (period.type) {
        case Periodetype.AKTIVITET_IKKE_MULIG:
            return `100% sykmeldt${arbeidsgiverNavn ? ` fra ${arbeidsgiverNavn}` : ''} i ${periodLength} dag${
                periodLength > 1 ? 'er' : ''
            }`
        case Periodetype.GRADERT:
            return `${period.gradert?.grad}% sykmeldt${
                arbeidsgiverNavn ? ` fra ${arbeidsgiverNavn}` : ''
            } i ${periodLength} dag${periodLength > 1 ? 'er' : ''}`
        case Periodetype.BEHANDLINGSDAGER:
            return `${period.behandlingsdager} behandlingsdag${
                period.behandlingsdager && period.behandlingsdager > 1 ? 'er' : ''
            } i løpet av ${periodLength} dag${periodLength > 1 ? 'er' : ''}`
        case Periodetype.AVVENTENDE:
            return `Avventende sykmelding i ${periodLength} dag${periodLength > 1 ? 'er' : ''}`
        case Periodetype.REISETILSKUDD:
            return `Reisetilskudd i ${periodLength} dag${periodLength > 1 ? 'er' : ''}`
        default:
            return ''
    }
}

/**
 * Get the periods of the sykmelding sorted by newest first
 * @return {Periode[]} The sorted sykmelding periods
 */
export const getSykmeldingperioderSorted = <Periode extends { fom: string; tom: string }>(
    perioder: readonly Periode[],
): Periode[] => sortBy(perioder, [(periode) => periode.fom, 'asc'], [(periode) => periode.tom, 'asc'])
