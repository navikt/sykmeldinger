import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import {
    nySykmeldingMock,
    avvistSykmeldingMock,
    sendtSykmeldingMock,
    avbruttSykmeldingMock,
    bekreftetSykmeldingMock,
} from './data/sykmeldingMock';
import naermesteLedereMock from './data/narmesteLedereMock';
import arbeidsgiverMock from './data/arbeidsgivereMock';

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(1000), MiddlewareUtils.loggingMiddleware()),
});

mock.get('/syforest/sykmelding', nySykmeldingMock);
<<<<<<< HEAD
mock.get('/syforest/informasjon/arbeidsgivere', arbeidsgiverMock);
mock.post('/syforest/sendSykmelding', { res: 'posted sykmelding' });
mock.post('/syforest/sykmeldinger/:id/actions/erUtenforVentetid', { erUtenforVentetid: false });
=======
mock.get('/syforest/naermesteledere', naermesteLedereMock);

// TODO:
mock.get('/syforest/sykmelding/avvist', avvistSykmeldingMock);
mock.get('/syforest/sykmelding/sendt', sendtSykmeldingMock);
mock.get('/syforest/sykmelding/avbrutt', avbruttSykmeldingMock);
mock.get('/syforest/sykmelding/bekreftet', bekreftetSykmeldingMock);
>>>>>>> 400cd7c62b9ec622b3f98f0c3e91427b59e5811c
