import dayjs from 'dayjs';

import { Sykmelding } from '../../../api-models/sykmelding/Sykmelding';
import { Periodetype } from '../../../../fetching/graphql.generated';
import { Periode } from '../../../api-models/sykmelding/Periode';

export function getSykmeldingperioderSorted(sykmelding: Sykmelding): Periode[] {
    return [...sykmelding.sykmeldingsperioder].sort(({ fom }, { tom }) => {
        if (dayjs(fom).isBefore(tom)) {
            return -1;
        } else if (dayjs(fom).isSame(tom)) {
            return 0;
        }
        return 1;
    });
}

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
        default:
            return '';
    }
}

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

export function getReadableLength(period: Periode): string {
    const length = getLength(period);
    if (period.type === Periodetype.Behandlingsdager) {
        return `${period.behandlingsdager} behandlingsdag${
            period.behandlingsdager && period.behandlingsdager > 1 ? 'er' : ''
        } i løpet av ${length} dag${length > 1 ? 'er' : ''}`;
    }
    return `(${length} dag${length === 1 ? ')' : 'er)'}`;
}

export function getLength(period: Periode): number {
    return dayjs(period.tom).diff(dayjs(period.fom), 'day') + 1;
}
