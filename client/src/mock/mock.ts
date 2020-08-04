import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';

import arbeidsgivereMock from './data/arbeidsgivereMock';
import { sykmeldingBekreftet } from './data/sykmelding-bekreftet';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { sykmeldingApen } from './data/sykmelding-apen';
import { sykmeldingSendt } from './data/sykmelding-sendt';
import { sykmeldingAvvist } from './data/sykmelding-avvist';
import { sykmeldingAvbrutt } from './data/sykmelding-avbrutt';
import { soknadNy, soknadFremtidig } from './data/soknader';
import { sykmeldingUtgatt } from './data/sykmelding-utgatt';
import { sykmeldingEgenmeldt } from './data/sykmelding-egenmeldt';
import { sykmeldingApenPapir } from './data/sykmelding-apen-papir';
import { sykmeldingAvvistBekreftet } from './data/sykmelding-avvist-bekreftet';

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(500), MiddlewareUtils.loggingMiddleware()),
});

mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmeldinger`, [
    sykmeldingApen,
    sykmeldingApenPapir,
    sykmeldingSendt,
    sykmeldingBekreftet,
    sykmeldingAvvist,
    sykmeldingAvvistBekreftet,
    sykmeldingAvbrutt,
    sykmeldingUtgatt,
    sykmeldingEgenmeldt,
]);

mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/APEN`, sykmeldingApen);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/APEN_PAPIR`, sykmeldingApenPapir);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/BEKREFTET`, sykmeldingBekreftet);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/SENDT`, sykmeldingSendt);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/AVVIST`, sykmeldingAvvist);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/AVVIST_BEKREFTET`, sykmeldingAvvistBekreftet);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/AVBRUTT`, sykmeldingAvbrutt);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/UTGATT`, sykmeldingUtgatt);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/EGENMELDT`, sykmeldingEgenmeldt);

mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/informasjon/arbeidsgivere`, arbeidsgivereMock);

mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/APEN/actions/erUtenforVentetid`, {
    erUtenforVentetid: false,
});
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/APEN_PAPIR/actions/erUtenforVentetid`, {
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
mock.get(
    `${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/AVVIST_BEKREFTET/actions/erUtenforVentetid`,
    {
        erUtenforVentetid: false,
    },
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/AVBRUTT/actions/erUtenforVentetid`, {
    erUtenforVentetid: false,
});
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/UTGATT/actions/erUtenforVentetid`, {
    erUtenforVentetid: false,
});
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/EGENMELDT/actions/erUtenforVentetid`, {
    erUtenforVentetid: false,
});

mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=APEN`, {
    soknaderOpprettet: 0,
    erBehandlet: false,
});
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=APEN_PAPIR`, {
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
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=AVVIST_BEKREFTET`, {
    soknaderOpprettet: 0,
    erBehandlet: false,
});
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=AVBRUTT`, {
    soknaderOpprettet: 0,
    erBehandlet: false,
});
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=UTGATT`, {
    soknaderOpprettet: 0,
    erBehandlet: false,
});
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=EGENMELDT`, {
    soknaderOpprettet: 0,
    erBehandlet: false,
});

mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/SENDT`, [soknadNy, soknadFremtidig]);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/BEKREFTET`, [soknadFremtidig]);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/APEN`, []);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/APEN_PAPIR`, []);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/AVBRUTT`, []);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/AVVIST`, []);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/AVVIST_BEKREFTET`, []);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/UTGATT`, []);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/EGENMELDT`, []);

mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/actions/gjenapne/AVBRUTT`, {});

mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/APEN/actions/bekreft`, {});
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/APEN_PAPIR/actions/bekreft`, {});
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/APEN/actions/send`, {});
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/APEN_PAPIR/actions/send`, {});
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/APEN/actions/avbryt`, {});
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/APEN_PAPIR/actions/avbryt`, {});

mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/APEN/actions/behandlet`, {
    soknaderOpprettet: 1,
    erBehandlet: false,
});
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/APEN_PAPIR/actions/behandlet`, {
    soknaderOpprettet: 1,
    erBehandlet: false,
});
