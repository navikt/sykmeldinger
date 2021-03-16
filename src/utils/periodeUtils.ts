import { Periode } from '../types/sykmelding';
import dayjs from 'dayjs';

const getPeriodLength = (periode: Periode): number => {
    return dayjs(periode.tom).diff(dayjs(periode.fom), 'day');
};

export const getPeriodDescriptionStrings = (perioder: Periode[], arbeidsgiverNavn?: string): string[] => {
    return perioder.map((periode) => {
        const periodLength = getPeriodLength(periode);

        switch (periode.type) {
            case 'AKTIVITET_IKKE_MULIG':
                return `100% sykmeldt${arbeidsgiverNavn ? ` fra ${arbeidsgiverNavn}` : ''} i ${periodLength} dag${
                    periodLength > 1 ? 'er' : ''
                }`;
            case 'GRADERT':
                return `${periode.gradert?.grad}% sykmeldt${
                    arbeidsgiverNavn ? ` fra ${arbeidsgiverNavn}` : ''
                } i ${periodLength} dag${periodLength > 1 ? 'er' : ''}`;
            case 'BEHANDLINGSDAGER':
                return `${periode.behandlingsdager} behandlingsdager i løpet av ${periodLength} dag${
                    periodLength > 1 ? 'er' : ''
                }`;
            case 'AVVENTENDE':
                return `Avventende sykmelding i ${periodLength} dag${periodLength > 1 ? 'er' : ''}`;
            case 'REISETILSKUDD':
                return `Reisetilskudd i ${periodLength} dag${periodLength > 1 ? 'er' : ''}`;
            default:
                return '';
        }
    });
};
