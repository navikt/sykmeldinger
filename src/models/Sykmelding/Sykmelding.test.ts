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

    describe('getReadableSykmeldingLength', () => {
        it('Lenght is one day', () => {
            const sykmeldingJson = {
                sykmeldingsperioder: [{ fom: '2021-06-01', tom: '2021-06-01' }],
            };
            const sykmelding = plainToClass(Sykmelding, sykmeldingJson);
            expect(sykmelding.getReadableSykmeldingLength()).toBe('1. juni 2021');
        });

        it('Within same year', () => {
            const sykmeldingJson = {
                sykmeldingsperioder: [
                    { fom: '2021-06-01', tom: '2021-06-03' },
                    { fom: '2021-05-01', tom: '2021-05-03' },
                    { fom: '2021-04-01', tom: '2021-04-03' },
                ],
            };
            const sykmelding = plainToClass(Sykmelding, sykmeldingJson);
            expect(sykmelding.getReadableSykmeldingLength()).toBe('1. april - 3. juni 2021');
        });

        it('Within same year and month', () => {
            const sykmeldingJson = {
                sykmeldingsperioder: [
                    { fom: '2021-06-20', tom: '2021-06-24' },
                    { fom: '2021-06-01', tom: '2021-06-03' },
                    { fom: '2021-06-06', tom: '2021-06-09' },
                ],
            };
            const sykmelding = plainToClass(Sykmelding, sykmeldingJson);
            expect(sykmelding.getReadableSykmeldingLength()).toBe('1. - 24. juni 2021');
        });

        it('Different years', () => {
            const sykmeldingJson = {
                sykmeldingsperioder: [
                    { fom: '2020-12-25', tom: '2020-12-31' },
                    { fom: '2021-01-01', tom: '2021-01-06' },
                ],
            };
            const sykmelding = plainToClass(Sykmelding, sykmeldingJson);
            expect(sykmelding.getReadableSykmeldingLength()).toBe('25. desember 2020 - 6. januar 2021');
        });
    });
});
