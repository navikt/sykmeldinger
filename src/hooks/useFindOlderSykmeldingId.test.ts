import nock from 'nock';
import dayjs, { Dayjs } from 'dayjs';

import { sykmeldingApen } from '../mock/data/sykmelding-apen';
import { Sykmelding } from '../models/Sykmelding/Sykmelding';
import { renderHook } from '../utils/test/testUtils';

import useFindOlderSykmeldingId from './useFindOlderSykmeldingId';
import { sykmeldingAvvist } from '../mock/data/sykmelding-avvist';
import { sykmeldingAvbrutt } from '../mock/data/sykmelding-avbrutt';
import { sykmeldingUnderbehandlingTilbakedatering } from '../mock/data/sykmelding-under-behandling-tilbakedatering';

describe('useFindOlderSykmeldingId', () => {
    const apiNock = nock('http://localhost');

    it('should find the earlier sykmelding when there is one APEN before', async () => {
        const sykmeldinger = [
            sykmeldingApen(dayjs().subtract(30, 'days'), 'SYKME-1'),
            sykmeldingApen(dayjs().subtract(2, 'days'), 'SYKME-2'),
            sykmeldingApen(dayjs().add(15, 'days'), 'SYKME-3'),
        ];

        apiNock.get('/api/v1/sykmeldinger').reply(200, sykmeldinger);

        const { result, waitForNextUpdate } = renderHook(() =>
            useFindOlderSykmeldingId(new Sykmelding(sykmeldinger[1])),
        );
        await waitForNextUpdate();

        expect(result.current.earliestSykmeldingId).toEqual('SYKME-1');
    });

    it('should find the earlier sykmelding but disregard the sykmelding that is older than 3 months', async () => {
        const sykmeldinger = [
            sykmeldingAvvist(dayjs().subtract(3, 'months').subtract(16, 'day')),
            sykmeldingApen(dayjs().subtract(30, 'days'), 'SYKME-1'),
            sykmeldingApen(dayjs().subtract(2, 'days'), 'SYKME-2'),
            sykmeldingApen(dayjs().add(15, 'days'), 'SYKME-3'),
        ];

        apiNock.get('/api/v1/sykmeldinger').reply(200, sykmeldinger);

        const { result, waitForNextUpdate } = renderHook(() =>
            useFindOlderSykmeldingId(new Sykmelding(sykmeldinger[2])),
        );
        await waitForNextUpdate();

        expect(result.current.earliestSykmeldingId).toEqual('SYKME-1');
    });

    it('should find the earlier sykmelding but disregard the sykmelding that does not have APEN status', async () => {
        const sykmeldinger = [
            sykmeldingAvbrutt(dayjs().subtract(40, 'days')),
            sykmeldingApen(dayjs().subtract(30, 'days'), 'SYKME-1'),
            sykmeldingApen(dayjs().subtract(2, 'days'), 'SYKME-2'),
            sykmeldingApen(dayjs().add(15, 'days'), 'SYKME-3'),
        ];

        apiNock.get('/api/v1/sykmeldinger').reply(200, sykmeldinger);

        const { result, waitForNextUpdate } = renderHook(() =>
            useFindOlderSykmeldingId(new Sykmelding(sykmeldinger[2])),
        );
        await waitForNextUpdate();

        expect(result.current.earliestSykmeldingId).toEqual('SYKME-1');
    });

    it('should do', async () => {
        const sykmeldinger = [
            // 2 dager siden
            sykmeldingApen(dayjs().subtract(2, 'days'), 'this-sykmelding'),
            // 30 dager siden
            sykmeldingApen(dayjs().subtract(30, 'days'), 'previous-sykmelding'),
        ];

        apiNock.get('/api/v1/sykmeldinger').reply(200, sykmeldinger);

        const { result, waitForNextUpdate } = renderHook(() =>
            useFindOlderSykmeldingId(new Sykmelding(sykmeldinger[0])),
        );
        await waitForNextUpdate();

        expect(result.current.earliestSykmeldingId).toEqual('previous-sykmelding');
    });

    it('should find the earlier sykmelding but disregard the sykmelding that is APEN but UNDER_BEHANDLING', async () => {
        const sykmeldinger = [
            sykmeldingUnderbehandlingTilbakedatering(dayjs().subtract(40, 'days')),
            sykmeldingApen(dayjs().subtract(30, 'days'), 'SYKME-1'),
            sykmeldingApen(dayjs().subtract(2, 'days'), 'SYKME-2'),
            sykmeldingApen(dayjs().add(15, 'days'), 'SYKME-3'),
        ];

        apiNock.get('/api/v1/sykmeldinger').reply(200, sykmeldinger);

        const { result, waitForNextUpdate } = renderHook(() =>
            useFindOlderSykmeldingId(new Sykmelding(sykmeldinger[2])),
        );
        await waitForNextUpdate();

        expect(result.current.earliestSykmeldingId).toEqual('SYKME-1');
    });

    it('should handle being the first sykmelding', async () => {
        const sykmeldinger = [
            sykmeldingApen(dayjs().subtract(30, 'days'), 'SYKME-1'),
            sykmeldingApen(dayjs().subtract(15, 'days'), 'SYKME-2'),
            sykmeldingApen(dayjs().subtract(2, 'days'), 'SYKME-3'),
        ];

        apiNock.get('/api/v1/sykmeldinger').reply(200, sykmeldinger);

        const { result, waitForNextUpdate } = renderHook(() =>
            useFindOlderSykmeldingId(new Sykmelding(sykmeldinger[0])),
        );
        await waitForNextUpdate();

        expect(result.current.earliestSykmeldingId).toBeNull();
    });

    it('should allow two sykmeldinger with the exact same period', async () => {
        const sykmeldinger = [
            sykmeldingApen(dayjs().subtract(7, 'days'), 'SYKME-1'),
            sykmeldingApen(dayjs().subtract(7, 'days'), 'SYKME-2'),
        ];

        apiNock.get('/api/v1/sykmeldinger').reply(200, sykmeldinger);

        const { result, waitForNextUpdate } = renderHook(() =>
            useFindOlderSykmeldingId(new Sykmelding(sykmeldinger[1])),
        );
        await waitForNextUpdate();

        expect(result.current.earliestSykmeldingId).toBeNull();
    });

    it('should still work when the two first sykmeldinger has same date but the provided sykmelding is later', async () => {
        const sykmeldinger = [
            sykmeldingApen(dayjs().subtract(30, 'days'), 'SYKME-1'),
            sykmeldingApen(dayjs().subtract(30, 'days'), 'SYKME-2'),
            sykmeldingApen(dayjs().subtract(7, 'days'), 'SYKME-3'),
        ];

        apiNock.get('/api/v1/sykmeldinger').reply(200, sykmeldinger);

        const { result, waitForNextUpdate } = renderHook(() =>
            useFindOlderSykmeldingId(new Sykmelding(sykmeldinger[2])),
        );
        await waitForNextUpdate();

        expect(result.current.earliestSykmeldingId).toEqual('SYKME-1');
    });

    describe('should work when there is overlap between sykmeldinger', () => {
        const createSingle10PeriodApen = (date: Dayjs, id: string) => ({
            ...sykmeldingApen(date, id),
            sykmeldingsperioder: [
                {
                    fom: date.format('YYYY-MM-DD'),
                    tom: date.add(10, 'days').format('YYYY-MM-DD'),
                    type: 'AKTIVITET_IKKE_MULIG',
                    aktivitetIkkeMulig: null as any,
                    reisetilskudd: false,
                },
            ],
        });

        const newest = createSingle10PeriodApen(dayjs().subtract(1, 'days'), 'SYKME-1');
        const oldest = createSingle10PeriodApen(dayjs().subtract(7, 'days'), 'SYKME-2');

        beforeEach(() => {
            apiNock.get('/api/v1/sykmeldinger').reply(200, [newest, oldest]);
        });

        it('newest should point to oldest', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useFindOlderSykmeldingId(new Sykmelding(newest)));
            await waitForNextUpdate();

            expect(result.current.earliestSykmeldingId).toEqual('SYKME-2');
        });

        it('oldest should NOT point to newest', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useFindOlderSykmeldingId(new Sykmelding(oldest)));
            await waitForNextUpdate();

            expect(result.current.earliestSykmeldingId).toBeNull();
        });
    });
});
