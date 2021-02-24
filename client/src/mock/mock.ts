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
    .post('end:/actions/bekreft', 203, { delay: 1000 })
    .post('end:/actions/send', 203, { delay: 1000 })
    .post('end:/actions/avbryt', 203, { delay: 1000 })
    .post('end:/actions/gjenapne', 203, { delay: 1000 });

// INFORMASJON OM BRUKER
fetchMock.get(
    'end:/v1/brukerinformasjon',
    { body: { diskresjonskode: false, arbeidsgivere: arbeidsgivereMock } },
    { delay: 1000 },
);

// VENTETID
fetchMock.get('end:/actions/erUtenforVentetid', { body: { erUtenforVentetid: false } }, { delay: 1000 });
