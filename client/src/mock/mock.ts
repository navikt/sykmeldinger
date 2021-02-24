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

// SYKMELDINGER
fetchMock.get('end:/v1/sykmeldinger', {
    status: 200,
    body: [
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
    ],
});

// SYKMELDING
fetchMock
    .get(`end:/v1/sykmeldinger/${sykmeldingApen.id}`, {
        body: sykmeldingApen,
    })
    .get(`end:/v1/sykmeldinger/${sykmeldingApenPapir.id}`, {
        body: sykmeldingApenPapir,
    })
    .get(`end:/v1/sykmeldinger/${sykmeldingSendt.id}`, {
        body: sykmeldingSendt,
    })
    .get(`end:/v1/sykmeldinger/${sykmeldingSendt2.id}`, {
        body: sykmeldingSendt2,
    })
    .get(`end:/v1/sykmeldinger/${sykmeldingSendt3.id}`, {
        body: sykmeldingSendt3,
    })
    .get(`end:/v1/sykmeldinger/${sykmeldingBekreftet.id}`, {
        body: sykmeldingBekreftet,
    })
    .get(`end:/v1/sykmeldinger/${sykmeldingAvvist.id}`, {
        body: sykmeldingAvvist,
    })
    .get(`end:/v1/sykmeldinger/${sykmeldingAvvistBekreftet.id}`, {
        body: sykmeldingAvvistBekreftet,
    })
    .get(`end:/v1/sykmeldinger/${sykmeldingAvbrutt.id}`, {
        body: sykmeldingAvbrutt,
    })
    .get(`end:/v1/sykmeldinger/${sykmeldingEgenmeldt.id}`, {
        body: sykmeldingEgenmeldt,
    });

// SYKMELDING-ACTIONS
fetchMock.post('end:/actions/bekreft', 203).post('end:/actions/send', 203).post('end:/actions/avbryt', 203);

// INFORMASJON OM BRUKER
fetchMock.get('end:/v1/brukerinformasjon', { body: { diskresjonskode: false, arbeidsgivere: arbeidsgivereMock } });

// VENTETID
fetchMock.get('end:/actions/erUtenforVentetid', { body: { erUtenforVentetid: false } });
