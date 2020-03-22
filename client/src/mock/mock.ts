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

mock.get(`${process.env.REACT_APP_API_URL}/sykmelding/NY`, sykmeldingNy);
mock.get(`${process.env.REACT_APP_API_URL}/informasjon/arbeidsgivere/NY`, arbeidsgivereMock);
mock.post(`${process.env.REACT_APP_API_URL}/sykmeldinger/NY/actions/erUtenforVentetid`, { erUtenforVentetid: true });

mock.get(`${process.env.REACT_APP_API_URL}/sykmelding/BEKREFTET`, sykmeldingBekreftet);
mock.get(`${process.env.REACT_APP_API_URL}/informasjon/arbeidsgivere/BEKREFTET`, arbeidsgivereMock);
mock.post(`${process.env.REACT_APP_API_URL}/sykmeldinger/BEKREFTET/actions/erUtenforVentetid`, { erUtenforVentetid: true });

mock.get(`${process.env.REACT_APP_API_URL}/sykmelding/SENDT`, sykmeldingSendt);
mock.get(`${process.env.REACT_APP_API_URL}/informasjon/arbeidsgivere/SENDT`, arbeidsgivereMock);
mock.post(`${process.env.REACT_APP_API_URL}/sykmeldinger/SENDT/actions/erUtenforVentetid`, { erUtenforVentetid: true });

mock.get(`${process.env.REACT_APP_API_URL}/sykmelding/AVVIST`, sykmeldingAvvist);
mock.get(`${process.env.REACT_APP_API_URL}/informasjon/arbeidsgivere/AVVIST`, arbeidsgivereMock);
mock.post(`${process.env.REACT_APP_API_URL}/sykmeldinger/AVVIST/actions/erUtenforVentetid`, { erUtenforVentetid: true });

mock.get(`${process.env.REACT_APP_API_URL}/sykmelding/AVBRUTT`, sykmeldingAvbrutt);
mock.get(`${process.env.REACT_APP_API_URL}/informasjon/arbeidsgivere/AVBRUTT`, arbeidsgivereMock);
mock.post(`${process.env.REACT_APP_API_URL}/sykmeldinger/AVBRUTT/actions/erUtenforVentetid`, { erUtenforVentetid: true });
