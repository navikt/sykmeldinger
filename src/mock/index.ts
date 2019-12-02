import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import {
    nySykmeldingMock,
    avvistSykmeldingMock,
    sendtSykmeldingMock,
    avbruttSykmeldingMock,
    bekreftetSykmeldingMock,
} from './data/sykmeldingMock';
import naermesteLedereMock from './data/narmesteLedereMock';

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(1000), MiddlewareUtils.loggingMiddleware()),
});

mock.get('/syforest/sykmelding', nySykmeldingMock);
mock.get('/syforest/naermesteledere', naermesteLedereMock);

// TODO:
mock.get('/syforest/sykmelding/avvist', avvistSykmeldingMock);
mock.get('/syforest/sykmelding/sendt', sendtSykmeldingMock);
mock.get('/syforest/sykmelding/avbrutt', avbruttSykmeldingMock);
mock.get('/syforest/sykmelding/bekreftet', bekreftetSykmeldingMock);
