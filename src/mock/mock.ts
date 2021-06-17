import arbeidsgivereMock from './data/arbeidsgivereMock';
import { sykmeldingBekreftet } from './data/sykmelding-bekreftet';
import { sykmeldingApen } from './data/sykmelding-apen';
import { sykmeldingSendt } from './data/sykmelding-sendt';
import { sykmeldingAvvist } from './data/sykmelding-avvist';
import { sykmeldingAvbrutt } from './data/sykmelding-avbrutt';
import { sykmeldingUtgatt } from './data/sykmelding-utgatt';
import { sykmeldingEgenmeldt } from './data/sykmelding-egenmeldt';
import { sykmeldingApenPapir } from './data/sykmelding-apen-papir';
import { sykmeldingAvvistBekreftet } from './data/sykmelding-avvist-bekreftet';
import { sykmeldingSendt2 } from './data/sykmelding-sendt-2';
import { sykmeldingSendt3 } from './data/sykmelding-sendt-3';
import fetchMock from 'fetch-mock';
import {sykmeldingUgyldigTilbakedatering} from "./data/sykmelding-ugyldig-tilbakedatering";

// Redirect to basepath to make demo-app work by visiting ingress (sykmeldinger.labs.nais.io)
if (window.location.pathname === '/') {
    window.location.pathname = window._env_?.SYKMELDINGER_ROOT || '/syk/sykmeldinger';
}

fetchMock.config.fallbackToNetwork = true;

const sykmeldinger = [
    sykmeldingApen,
    sykmeldingApenPapir,
    sykmeldingSendt,
    sykmeldingSendt2,
    sykmeldingSendt3,
    sykmeldingBekreftet,
    sykmeldingAvvist,
    sykmeldingAvvistBekreftet,
    sykmeldingAvbrutt,
    sykmeldingUtgatt,
    sykmeldingEgenmeldt,
    sykmeldingUgyldigTilbakedatering,
];

// SYKMELDINGER
fetchMock.get(
    'end:/v1/sykmeldinger',
    {
        status: 200,
        body: sykmeldinger,
    },
    { delay: 1000 },
);

// SYKMELDING
sykmeldinger.forEach((sykmelding: any) =>
    fetchMock.get(`end:/v1/sykmeldinger/${sykmelding.id}`, { body: sykmelding }, { delay: 1000 }),
);

// SYKMELDING-ACTIONS
fetchMock
    .post('end:/bekreftAvvist', 203, { delay: 1000 })
    .post('end:/send', 203, { delay: 1000 })
    .post('end:/actions/avbryt', 203, { delay: 1000 })
    .post('end:/gjenapne', 203, { delay: 1000 });

// INFORMASJON OM BRUKER
fetchMock.get(
    'end:/v1/brukerinformasjon',
    { body: { strengtFortroligAdresse: false, arbeidsgivere: arbeidsgivereMock } },
    { delay: 2000 },
);

// VENTETID
fetchMock.get(
    'end:/actions/v2/erUtenforVentetid',
    { body: { erUtenforVentetid: false, oppfolgingsdato: '2021-04-10' } },
    { delay: 1000 },
);
