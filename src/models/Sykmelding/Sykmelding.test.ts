/// <reference types="jest" />
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { Sykmelding } from './Sykmelding';

describe('Sykmelding', () => {
    describe('getSykmeldingStartDate', () => {
        it('Gets fom of the earliest period', () => {
            const sykmeldingJson = {
                sykmeldingsperioder: [
                    { fom: '2021-05-01', tom: '2021-05-03' },
                    { fom: '2021-04-01', tom: '2021-04-03' },
                    { fom: '2021-06-01', tom: '2021-06-03' },
                ],
            };
            const sykmelding = plainToClass(Sykmelding, sykmeldingJson);
            expect(sykmelding.getSykmeldingStartDate()).toEqual(new Date('2021-04-01'));
        });
    });

    describe('getSykmeldingEndDate', () => {
        it('Gets tom of the latest period', () => {
            const sykmeldingJson = {
                sykmeldingsperioder: [
                    { fom: '2021-06-01', tom: '2021-06-03' },
                    { fom: '2021-05-01', tom: '2021-05-03' },
                    { fom: '2021-04-01', tom: '2021-04-03' },
                ],
            };
            const sykmelding = plainToClass(Sykmelding, sykmeldingJson);
            expect(sykmelding.getSykmeldingEndDate()).toEqual(new Date('2021-06-03'));
        });
    });

    describe('getSykmeldingperioderSorted', () => {
        it('Gets tom of the latest period', () => {
            const sykmeldingJson = {
                sykmeldingsperioder: [
                    { fom: '2021-06-01', tom: '2021-06-03' },
                    { fom: '2021-05-01', tom: '2021-05-03' },
                    { fom: '2021-04-01', tom: '2021-04-03' },
                ],
            };
            const sykmelding = plainToClass(Sykmelding, sykmeldingJson);
            expect(sykmelding.getSykmeldingperioderSorted()).toEqual([
                { fom: new Date('2021-04-01'), tom: new Date('2021-04-03') },
                { fom: new Date('2021-05-01'), tom: new Date('2021-05-03') },
                { fom: new Date('2021-06-01'), tom: new Date('2021-06-03') },
            ]);
        });
    });

    describe('getSykmeldingEndDate', () => {
        it('Get length of sykmelding as readable string', () => {
            const sykmeldingJson = {
                sykmeldingsperioder: [
                    { fom: '2021-06-01', tom: '2021-06-03' },
                    { fom: '2021-05-01', tom: '2021-05-03' },
                    { fom: '2021-04-01', tom: '2021-04-03' },
                ],
            };
            const sykmelding = plainToClass(Sykmelding, sykmeldingJson);
            expect(sykmelding.getReadableSykmeldingLength()).toBe('1. april 2021 - 3. juni 2021');
        });
    });
});
