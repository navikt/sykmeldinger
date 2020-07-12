import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';

import arbeidsgivereMock from './data/arbeidsgivereMock';
import { sykmeldingBekreftet } from './data/sykmelding-bekreftet';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { sykmeldingApen } from './data/sykmelding-ny';
import { sykmeldingSendt } from './data/sykmelding-sendt';
import { sykmeldingAvvist } from './data/sykmelding-avvist';
import { sykmeldingAvbrutt } from './data/sykmelding-avbrutt';
import { soknadNy, soknadFremtidig } from './data/soknader';

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(1000), MiddlewareUtils.loggingMiddleware()),
});

mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmeldinger`, [
    sykmeldingApen,
    sykmeldingSendt,
    sykmeldingBekreftet,
    sykmeldingAvvist,
    sykmeldingAvbrutt,
]);

mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/APEN`, sykmeldingApen);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/BEKREFTET`, sykmeldingBekreftet);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/SENDT`, sykmeldingSendt);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/AVVIST`, sykmeldingAvvist);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/AVBRUTT`, sykmeldingAvbrutt);

mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/informasjon/arbeidsgivere`, arbeidsgivereMock);

mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/APEN/actions/erUtenforVentetid`, {
    erUtenforVentetid: false,
});
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/BEKREFTET/actions/erUtenforVentetid`, {
    erUtenforVentetid: false,
});
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/SENDT/actions/erUtenforVentetid`, {
    erUtenforVentetid: false,
});
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/AVVIST/actions/erUtenforVentetid`, {
    erUtenforVentetid: false,
});
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/AVBRUTT/actions/erUtenforVentetid`, {
    erUtenforVentetid: false,
});

mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=APEN`, {
    soknaderOpprettet: 0,
    erBehandlet: false,
});
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=SENDT`, {
    soknaderOpprettet: 0,
    erBehandlet: false,
});
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=BEKREFTET`, {
    soknaderOpprettet: 0,
    erBehandlet: false,
});
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=AVVIST`, {
    soknaderOpprettet: 0,
    erBehandlet: false,
});
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=AVBRUTT`, {
    soknaderOpprettet: 0,
    erBehandlet: false,
});

mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/SENDT`, [soknadNy, soknadFremtidig]);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/BEKREFTET`, [soknadFremtidig]);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/APEN`, []);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/AVBRUTT`, []);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/AVVIST`, []);

mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/actions/gjenapne/AVBRUTT`, {});
