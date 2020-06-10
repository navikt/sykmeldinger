import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';

import arbeidsgivereMock from './data/arbeidsgivereMock';
import { sykmeldingBekreftet } from './data/sykmelding-bekreftet';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { sykmeldingNy } from './data/sykmelding-ny';
import { sykmeldingSendt } from './data/sykmelding-sendt';
import { sykmeldingAvvist } from './data/sykmelding-avvist';
import { sykmeldingAvbrutt } from './data/sykmelding-avbrutt';

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(500), MiddlewareUtils.loggingMiddleware()),
});

mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/NY`, sykmeldingNy);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/informasjon/arbeidsgivere/NY`, arbeidsgivereMock);
mock.post(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/NY/actions/erUtenforVentetid`, {
    erUtenforVentetid: true,
});

mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/BEKREFTET`, sykmeldingBekreftet);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/informasjon/arbeidsgivere/BEKREFTET`, arbeidsgivereMock);
mock.post(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/BEKREFTET/actions/erUtenforVentetid`, {
    erUtenforVentetid: true,
});

mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/SENDT`, sykmeldingSendt);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/informasjon/arbeidsgivere/SENDT`, arbeidsgivereMock);
mock.post(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/SENDT/actions/erUtenforVentetid`, {
    erUtenforVentetid: true,
});

mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/AVVIST`, sykmeldingAvvist);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/informasjon/arbeidsgivere/AVVIST`, arbeidsgivereMock);
mock.post(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/AVVIST/actions/erUtenforVentetid`, {
    erUtenforVentetid: true,
});

mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/AVBRUTT`, sykmeldingAvbrutt);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/informasjon/arbeidsgivere/AVBRUTT`, arbeidsgivereMock);
mock.post(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/AVBRUTT/actions/erUtenforVentetid`, {
    erUtenforVentetid: true,
});
