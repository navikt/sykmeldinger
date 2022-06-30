import dayjs from 'dayjs';

import { ArbeidsrelatertArsakType, MedisinskArsakType, Periode, Periodetype } from '../fetching/graphql.generated';
import { AnnenFraverGrunn } from '../server/graphql/resolver-types.generated';

export function medisinskArsakToText(value: MedisinskArsakType): string {
    switch (value) {
        case MedisinskArsakType.TilstandHindrerAktivitet:
            return 'Helsetilstanden hindrer pasienten i å være i aktivitet';
        case MedisinskArsakType.AktivitetForverrerTilstand:
            return 'Aktivitet vil forverre helsetilstanden';
        case MedisinskArsakType.AktivitetForhindrerBedring:
            return 'Aktivitet vil hindre/forsinke bedring av helsetilstanden';
        case MedisinskArsakType.Annet:
            return 'Annet';
    }
}

export function arbeidsrelatertArsakToText(value: ArbeidsrelatertArsakType): string {
    switch (value) {
        case ArbeidsrelatertArsakType.ManglendeTilrettelegging:
            return 'Manglende tilrettelegging på arbeidsplassen';
        case ArbeidsrelatertArsakType.Annet:
            return 'Annet';
    }
}

export function annenFraverGrunnToText(value: AnnenFraverGrunn): string {
    switch (value) {
        case AnnenFraverGrunn.GodkjentHelseinstitusjon:
            return 'Når vedkommende er innlagt i en godkjent helseinstitusjon';
        case AnnenFraverGrunn.BehandlingForhindrerArbeid:
            return 'Når vedkommende er under behandling og legen erklærer at behandlingen gjør det nødvendig at vedkommende ikke arbeider';
        case AnnenFraverGrunn.ArbeidsrettetTiltak:
            return 'Når vedkommende deltar på et arbeidsrettet tiltak';
        case AnnenFraverGrunn.MottarTilskuddGrunnetHelsetilstand:
            return 'Når vedkommende på grunn av sykdom, skade eller lyte får tilskott når vedkommende på grunn av sykdom, skade eller lyte får tilskott';
        case AnnenFraverGrunn.NodvendigKontrollundenrsokelse:
            return 'Når vedkommende er til nødvendig kontrollundersøkelse som krever minst 24 timers fravær, reisetid medregnet';
        case AnnenFraverGrunn.Smittefare:
            return 'Når vedkommende myndighet har nedlagt forbud mot at han eller hun arbeider på grunn av smittefare';
        case AnnenFraverGrunn.Abort:
            return 'Når vedkommende er arbeidsufør som følge av svangerskapsavbrudd';
        case AnnenFraverGrunn.UforGrunnetBarnloshet:
            return 'Når vedkommende er arbeidsufør som følge av behandling for barnløshet';
        case AnnenFraverGrunn.Donor:
            return 'Når vedkommende er donor eller er under vurdering som donor';
        case AnnenFraverGrunn.BehandlingSterilisering:
            return 'Når vedkommende er arbeidsufør som følge av behandling i forbindelse med sterilisering';
    }
}

/**
 * Get a text representation of the period type
 * @return {string} The period string
 */
export function getPeriodTitle(period: Periode): string {
    switch (period.type) {
        case Periodetype.Avventende:
            return 'Avventende sykmelding';
        case Periodetype.AktivitetIkkeMulig:
            return '100% sykmelding';
        case Periodetype.Gradert:
            return `${period.gradert?.grad}% sykmelding`;
        case Periodetype.Reisetilskudd:
            return 'Reisetilskudd';
        case Periodetype.Behandlingsdager:
            return 'Behandlingsdager';
    }
}

/**
 * Get a text representation of the period fom to tom
 * @return {string} The period string
 */
export function getReadablePeriod(period: Periode): string {
    const sameMonthAndYear =
        dayjs(period.fom).get('month') === dayjs(period.tom).get('month') &&
        dayjs(period.fom).get('year') === dayjs(period.tom).get('year');
    const sameYearNotMonth =
        dayjs(period.fom).get('month') !== dayjs(period.tom).get('month') &&
        dayjs(period.fom).get('year') === dayjs(period.tom).get('year');

    if (sameMonthAndYear) {
        return `${dayjs(period.fom).format('D.')} - ${dayjs(period.tom).format('D. MMM YYYY')}`;
    } else if (sameYearNotMonth) {
        return `${dayjs(period.fom).format('D. MMM')} - ${dayjs(period.tom).format('D. MMM YYYY')}`;
    }
    return `${dayjs(period.fom).format('D. MMM YYYY')} - ${dayjs(period.tom).format('D. MMM YYYY')}`;
}

/**
 * Get the total length between fom and tom in days
 * @return {number} The period length
 */
export function getLength(period: Periode): number {
    return dayjs(period.tom).diff(dayjs(period.fom), 'day') + 1;
}

/**
 * Get a text representation of the period length
 * @return {string} The period string
 */
export function getReadableLength(period: Periode): string {
    const length = getLength(period);
    if (period.type === Periodetype.Behandlingsdager) {
        return `${period.behandlingsdager} behandlingsdag${
            period.behandlingsdager && period.behandlingsdager > 1 ? 'er' : ''
        } i løpet av ${length} dag${length > 1 ? 'er' : ''}`;
    }
    return `(${length} dag${length === 1 ? ')' : 'er)'}`;
}

/**
 * Get a text representation of the period based on the type of the period
 * @return {string} The period discription
 */
export function getDescription(period: Periode, arbeidsgiverNavn?: string): string {
    const periodLength = getLength(period);

    switch (period.type) {
        case Periodetype.AktivitetIkkeMulig:
            return `100% sykmeldt${arbeidsgiverNavn ? ` fra ${arbeidsgiverNavn}` : ''} i ${periodLength} dag${
                periodLength > 1 ? 'er' : ''
            }`;
        case Periodetype.Gradert:
            return `${period.gradert?.grad}% sykmeldt${
                arbeidsgiverNavn ? ` fra ${arbeidsgiverNavn}` : ''
            } i ${periodLength} dag${periodLength > 1 ? 'er' : ''}`;
        case Periodetype.Behandlingsdager:
            return `${period.behandlingsdager} behandlingsdag${
                period.behandlingsdager && period.behandlingsdager > 1 ? 'er' : ''
            } i løpet av ${periodLength} dag${periodLength > 1 ? 'er' : ''}`;
        case Periodetype.Avventende:
            return `Avventende sykmelding i ${periodLength} dag${periodLength > 1 ? 'er' : ''}`;
        case Periodetype.Reisetilskudd:
            return `Reisetilskudd i ${periodLength} dag${periodLength > 1 ? 'er' : ''}`;
        default:
            return '';
    }
}
