import nock from 'nock';
import { formatISO, sub } from 'date-fns';

import { sykmeldingApen } from '../utils/test/mockData/sykmelding-apen';
import { Sykmelding, SykmeldingSchema } from '../models/Sykmelding/Sykmelding';
import { renderHook } from '../utils/test/testUtils';
import { sykmeldingAvvist } from '../utils/test/mockData/sykmelding-avvist';
import { sykmeldingAvbrutt } from '../utils/test/mockData/sykmelding-avbrutt';
import { sykmeldingUnderbehandlingTilbakedatering } from '../utils/test/mockData/sykmelding-under-behandling-tilbakedatering';
import { Periodetype } from '../models/Sykmelding/Periode';
import { dateSub, dateAdd } from '../utils/dateUtils';

import useFindOlderSykmeldingId from './useFindOlderSykmeldingId';

describe('useFindOlderSykmeldingId', () => {
    const apiNock = nock('http://localhost');

    it('should find the earlier sykmelding when there is one APEN before', async () => {
        const sykmeldinger = [
            sykmeldingApen(dateSub(new Date(), { days: 30 }), 'SYKME-1'),
            sykmeldingApen(dateSub(new Date(), { days: 2 }), 'SYKME-2'),
            sykmeldingApen(dateAdd(new Date(), { days: 15 }), 'SYKME-3'),
        ];

        apiNock.get('/api/v1/sykmeldinger').reply(200, sykmeldinger);

        const { result, waitForNextUpdate } = renderHook(() =>
            useFindOlderSykmeldingId(SykmeldingSchema.parse(sykmeldinger[1])),
        );
        await waitForNextUpdate();

        expect(result.current.earliestSykmeldingId).toEqual('SYKME-1');
    });

    it('should find the earlier sykmelding but disregard the sykmelding that is older than 12 months', async () => {
        const sykmeldinger = [
            sykmeldingAvvist(dateSub(new Date(), { months: 12, days: 16 })),
            sykmeldingApen(dateSub(new Date(), { days: 30 }), 'SYKME-1'),
            sykmeldingApen(dateSub(new Date(), { days: 2 }), 'SYKME-2'),
            sykmeldingApen(dateAdd(new Date(), { days: 15 }), 'SYKME-3'),
        ];

        apiNock.get('/api/v1/sykmeldinger').reply(200, sykmeldinger);

        const { result, waitForNextUpdate } = renderHook(() =>
            useFindOlderSykmeldingId(SykmeldingSchema.parse(sykmeldinger[2])),
        );
        await waitForNextUpdate();

        expect(result.current.earliestSykmeldingId).toEqual('SYKME-1');
    });

    it('should find the earlier sykmelding but disregard the sykmelding that does not have APEN status', async () => {
        const sykmeldinger = [
            sykmeldingAvbrutt(dateSub(new Date(), { days: 40 })),
            sykmeldingApen(dateSub(new Date(), { days: 30 }), 'SYKME-1'),
            sykmeldingApen(dateSub(new Date(), { days: 2 }), 'SYKME-2'),
            sykmeldingApen(dateAdd(new Date(), { days: 15 }), 'SYKME-3'),
        ];

        apiNock.get('/api/v1/sykmeldinger').reply(200, sykmeldinger);

        const { result, waitForNextUpdate } = renderHook(() =>
            useFindOlderSykmeldingId(SykmeldingSchema.parse(sykmeldinger[2])),
        );
        await waitForNextUpdate();

        expect(result.current.earliestSykmeldingId).toEqual('SYKME-1');
    });

    it('should do', async () => {
        const sykmeldinger = [
            // 2 dager siden
            sykmeldingApen(dateSub(new Date(), { days: 2 }), 'this-sykmelding'),
            // 30 dager siden
            sykmeldingApen(dateSub(new Date(), { days: 30 }), 'previous-sykmelding'),
        ];

        apiNock.get('/api/v1/sykmeldinger').reply(200, sykmeldinger);

        const { result, waitForNextUpdate } = renderHook(() =>
            useFindOlderSykmeldingId(SykmeldingSchema.parse(sykmeldinger[0])),
        );
        await waitForNextUpdate();

        expect(result.current.earliestSykmeldingId).toEqual('previous-sykmelding');
    });

    it('should find the earlier sykmelding but disregard the sykmelding that is APEN but UNDER_BEHANDLING', async () => {
        const sykmeldinger = [
            sykmeldingUnderbehandlingTilbakedatering(formatISO(sub(new Date(), { days: 366 }))),
            sykmeldingApen(dateSub(new Date(), { days: 30 }), 'SYKME-1'),
            sykmeldingApen(dateSub(new Date(), { days: 2 }), 'SYKME-2'),
            sykmeldingApen(dateAdd(new Date(), { days: 15 }), 'SYKME-3'),
        ];

        apiNock.get('/api/v1/sykmeldinger').reply(200, sykmeldinger);

        const { result, waitForNextUpdate } = renderHook(() =>
            useFindOlderSykmeldingId(SykmeldingSchema.parse(sykmeldinger[2])),
        );
        await waitForNextUpdate();

        expect(result.current.earliestSykmeldingId).toEqual('SYKME-1');
    });

    it('should handle being the first sykmelding', async () => {
        const sykmeldinger = [
            sykmeldingApen(dateSub(new Date(), { days: 30 }), 'SYKME-1'),
            sykmeldingApen(dateSub(new Date(), { days: 15 }), 'SYKME-2'),
            sykmeldingApen(dateSub(new Date(), { days: 2 }), 'SYKME-3'),
        ];

        apiNock.get('/api/v1/sykmeldinger').reply(200, sykmeldinger);

        const { result, waitForNextUpdate } = renderHook(() =>
            useFindOlderSykmeldingId(SykmeldingSchema.parse(sykmeldinger[0])),
        );
        await waitForNextUpdate();

        expect(result.current.earliestSykmeldingId).toBeNull();
    });

    it('should allow two sykmeldinger with the exact same period', async () => {
        const sykmeldinger = [
            sykmeldingApen(dateSub(new Date(), { days: 7 }), 'SYKME-1'),
            sykmeldingApen(dateSub(new Date(), { days: 7 }), 'SYKME-2'),
        ];

        apiNock.get('/api/v1/sykmeldinger').reply(200, sykmeldinger);

        const { result, waitForNextUpdate } = renderHook(() =>
            useFindOlderSykmeldingId(SykmeldingSchema.parse(sykmeldinger[1])),
        );
        await waitForNextUpdate();

        expect(result.current.earliestSykmeldingId).toBeNull();
    });

    it('should still work when the two first sykmeldinger has same date but the provided sykmelding is later', async () => {
        const sykmeldinger = [
            sykmeldingApen(dateSub(new Date(), { days: 30 }), 'SYKME-1'),
            sykmeldingApen(dateSub(new Date(), { days: 30 }), 'SYKME-2'),
            sykmeldingApen(dateSub(new Date(), { days: 7 }), 'SYKME-3'),
        ];

        apiNock.get('/api/v1/sykmeldinger').reply(200, sykmeldinger);

        const { result, waitForNextUpdate } = renderHook(() =>
            useFindOlderSykmeldingId(SykmeldingSchema.parse(sykmeldinger[2])),
        );
        await waitForNextUpdate();

        expect(result.current.earliestSykmeldingId).toEqual('SYKME-1');
    });

    describe('should work when there is overlap between sykmeldinger', () => {
        const createSingle10PeriodApen = (date: string, id: string): Sykmelding => ({
            ...sykmeldingApen(date, id),
            sykmeldingsperioder: [
                {
                    fom: date,
                    tom: dateAdd(date, { days: 10 }),
                    type: Periodetype.AKTIVITET_IKKE_MULIG,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: false,
                    gradert: null,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                },
            ],
        });

        const newest = createSingle10PeriodApen(dateSub(new Date(), { days: 1 }), 'SYKME-1');
        const oldest = createSingle10PeriodApen(dateSub(new Date(), { days: 7 }), 'SYKME-2');

        beforeEach(() => {
            apiNock.get('/api/v1/sykmeldinger').reply(200, [newest, oldest]);
        });

        it('newest should point to oldest', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useFindOlderSykmeldingId(SykmeldingSchema.parse(newest)),
            );
            await waitForNextUpdate();

            expect(result.current.earliestSykmeldingId).toEqual('SYKME-2');
        });

        it('oldest should NOT point to newest', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useFindOlderSykmeldingId(SykmeldingSchema.parse(oldest)),
            );
            await waitForNextUpdate();

            expect(result.current.earliestSykmeldingId).toBeNull();
        });
    });
});
