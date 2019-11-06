import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import { sykmeldingMock } from './data/sykmeldingMock';
import naermesteLedereMock from './data/narmesteLedereMock';

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(1000), MiddlewareUtils.loggingMiddleware()),
});

mock.get('/syforest/sykmelding', sykmeldingMock);
mock.get('/syforest/naermesteledere', naermesteLedereMock);
