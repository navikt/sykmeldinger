import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';

import arbeidsgiverMock from './data/arbeidsgivereMock';
import naermesteLedereMock from './data/narmesteLedereMock';
import {
    avbruttSykmeldingMock,
    avvistSykmeldingMock,
    bekreftetSykmeldingMock,
    nySykmeldingMock,
    sendtSykmeldingMock,
} from './data/sykmeldingMock';

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(1000), MiddlewareUtils.loggingMiddleware()),
});

mock.get('/syforest/sykmelding', nySykmeldingMock);
mock.get('/syforest/informasjon/arbeidsgivere', arbeidsgiverMock);
mock.post('/syforest/sendSykmelding', { res: 'posted sykmelding' });
mock.post('/syforest/sykmeldinger/:id/actions/erUtenforVentetid', { erUtenforVentetid: false });
mock.get('/syforest/naermesteledere', naermesteLedereMock);

// TODO:
mock.get('/syforest/sykmelding/avvist', avvistSykmeldingMock);
mock.get('/syforest/sykmelding/sendt', sendtSykmeldingMock);
mock.get('/syforest/sykmelding/avbrutt', avbruttSykmeldingMock);
mock.get('/syforest/sykmelding/bekreftet', bekreftetSykmeldingMock);
