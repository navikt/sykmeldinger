import nock from 'nock';
import dayjs from 'dayjs';

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
});
