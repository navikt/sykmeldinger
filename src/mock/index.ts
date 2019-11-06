import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import { sykmeldingerMock } from './data/sykmeldingerMock';
import naermesteLedereMock from './data/narmesteLedereMock';

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(500),
        MiddlewareUtils.loggingMiddleware()
    )
});

mock.get('/syforest/sykmeldinger', sykmeldingerMock);
mock.get('/syforest/naermesteledere', naermesteLedereMock);