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
import { sykmeldingSendt2 } from './data/sykmelding-sendt-2';
import { sykmeldingSendt3 } from './data/sykmelding-sendt-3';

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(500), MiddlewareUtils.loggingMiddleware()),
});

mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmeldinger`, (_, res, ctx) =>
    res(
        ctx.json({
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
        }),
    ),
);

mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/APEN`, (_, res, ctx) =>
    res(ctx.json({ body: sykmeldingApen })),
);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/APEN_PAPIR`, (_, res, ctx) =>
    res(ctx.json({ body: sykmeldingApenPapir })),
);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/BEKREFTET`, (_, res, ctx) =>
    res(ctx.json({ body: sykmeldingBekreftet })),
);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/SENDT`, (_, res, ctx) =>
    res(ctx.json({ body: sykmeldingSendt })),
);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/SENDT-2`, (_, res, ctx) =>
    res(ctx.json({ body: sykmeldingSendt2 })),
);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/SENDT-3`, (_, res, ctx) =>
    res(ctx.json({ body: sykmeldingSendt3 })),
);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/AVVIST`, (_, res, ctx) =>
    res(ctx.json({ body: sykmeldingAvvist })),
);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/AVVIST_BEKREFTET`, (_, res, ctx) =>
    res(ctx.json({ body: sykmeldingAvvistBekreftet })),
);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/AVBRUTT`, (_, res, ctx) =>
    res(ctx.json({ body: sykmeldingAvbrutt })),
);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/UTGATT`, (_, res, ctx) =>
    res(ctx.json({ body: sykmeldingUtgatt })),
);
mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/EGENMELDT`, (_, res, ctx) =>
    res(ctx.json({ body: sykmeldingEgenmeldt })),
);

mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/informasjon/arbeidsgivere`, (_, res, ctx) =>
    res(ctx.json({ body: arbeidsgivereMock })),
);

mock.post(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/APEN`, (_, res, ctx) =>
    res(ctx.json({ body: 'hello world' })),
);

mock.get(
    `${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/APEN/actions/erUtenforVentetid`,
    (_, res, ctx) =>
        res(
            ctx.json({
                body: {
                    erUtenforVentetid: false,
                },
            }),
        ),
);
mock.get(
    `${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/APEN_PAPIR/actions/erUtenforVentetid`,
    (_, res, ctx) =>
        res(
            ctx.json({
                body: {
                    erUtenforVentetid: false,
                },
            }),
        ),
);
mock.get(
    `${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/BEKREFTET/actions/erUtenforVentetid`,
    (_, res, ctx) =>
        res(
            ctx.json({
                body: {
                    erUtenforVentetid: false,
                },
            }),
        ),
);
mock.get(
    `${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/SENDT/actions/erUtenforVentetid`,
    (_, res, ctx) =>
        res(
            ctx.json({
                body: {
                    erUtenforVentetid: false,
                },
            }),
        ),
);
mock.get(
    `${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/SENDT-2/actions/erUtenforVentetid`,
    (_, res, ctx) =>
        res(
            ctx.json({
                body: {
                    erUtenforVentetid: false,
                },
            }),
        ),
);
mock.get(
    `${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/SENDT-3/actions/erUtenforVentetid`,
    (_, res, ctx) =>
        res(
            ctx.json({
                body: {
                    erUtenforVentetid: false,
                },
            }),
        ),
);
mock.get(
    `${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/AVVIST/actions/erUtenforVentetid`,
    (_, res, ctx) =>
        res(
            ctx.json({
                body: {
                    erUtenforVentetid: false,
                },
            }),
        ),
);
mock.get(
    `${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/AVVIST_BEKREFTET/actions/erUtenforVentetid`,
    (_, res, ctx) =>
        res(
            ctx.json({
                body: {
                    erUtenforVentetid: false,
                },
            }),
        ),
);
mock.get(
    `${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/AVBRUTT/actions/erUtenforVentetid`,
    (_, res, ctx) =>
        res(
            ctx.json({
                body: {
                    erUtenforVentetid: false,
                },
            }),
        ),
);
mock.get(
    `${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/UTGATT/actions/erUtenforVentetid`,
    (_, res, ctx) =>
        res(
            ctx.json({
                body: {
                    erUtenforVentetid: false,
                },
            }),
        ),
);
mock.get(
    `${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/EGENMELDT/actions/erUtenforVentetid`,
    (_, res, ctx) =>
        res(
            ctx.json({
                body: {
                    erUtenforVentetid: false,
                },
            }),
        ),
);

mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=APEN`, (_, res, ctx) =>
    res(
        ctx.json({
            body: {
                soknaderOpprettet: 0,
                erBehandlet: false,
            },
        }),
    ),
);
mock.get(
    `${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=APEN_PAPIR`,
    (_, res, ctx) =>
        res(
            ctx.json({
                body: {
                    soknaderOpprettet: 0,
                    erBehandlet: false,
                },
            }),
        ),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=SENDT`, (_, res, ctx) =>
    res(
        ctx.json({
            body: {
                soknaderOpprettet: 0,
                erBehandlet: false,
            },
        }),
    ),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=SENDT-2`, (_, res, ctx) =>
    res(
        ctx.json({
            body: {
                soknaderOpprettet: 0,
                erBehandlet: false,
            },
        }),
    ),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=SENDT-3`, (_, res, ctx) =>
    res(
        ctx.json({
            body: {
                soknaderOpprettet: 0,
                erBehandlet: false,
            },
        }),
    ),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=BEKREFTET`, (_, res, ctx) =>
    res(
        ctx.json({
            body: {
                soknaderOpprettet: 0,
                erBehandlet: false,
            },
        }),
    ),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=AVVIST`, (_, res, ctx) =>
    res(
        ctx.json({
            body: {
                soknaderOpprettet: 0,
                erBehandlet: false,
            },
        }),
    ),
);
mock.get(
    `${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=AVVIST_BEKREFTET`,
    (_, res, ctx) =>
        res(
            ctx.json({
                body: {
                    soknaderOpprettet: 0,
                    erBehandlet: false,
                },
            }),
        ),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=AVBRUTT`, (_, res, ctx) =>
    res(
        ctx.json({
            body: {
                soknaderOpprettet: 0,
                erBehandlet: false,
            },
        }),
    ),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=UTGATT`, (_, res, ctx) =>
    res(
        ctx.json({
            body: {
                soknaderOpprettet: 0,
                erBehandlet: false,
            },
        }),
    ),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=EGENMELDT`, (_, res, ctx) =>
    res(
        ctx.json({
            body: {
                soknaderOpprettet: 0,
                erBehandlet: false,
            },
        }),
    ),
);

mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/SENDT`, (_, res, ctx) =>
    res(ctx.json({ body: [soknadNy, soknadFremtidig] })),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/SENDT-2`, (_, res, ctx) =>
    res(ctx.json({ body: [soknadNy, soknadFremtidig] })),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/SENDT-3`, (_, res, ctx) =>
    res(ctx.json({ body: [soknadNy, soknadFremtidig] })),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/BEKREFTET`, (_, res, ctx) =>
    res(ctx.json({ body: [soknadFremtidig] })),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/APEN`, (_, res, ctx) =>
    res(ctx.json({ body: [] })),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/APEN_PAPIR`, (_, res, ctx) =>
    res(ctx.json({ body: [] })),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/AVBRUTT`, (_, res, ctx) =>
    res(ctx.json({ body: [] })),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/AVVIST`, (_, res, ctx) =>
    res(ctx.json({ body: [] })),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/AVVIST_BEKREFTET`, (_, res, ctx) =>
    res(ctx.json({ body: [] })),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/UTGATT`, (_, res, ctx) =>
    res(ctx.json({ body: [] })),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/EGENMELDT`, (_, res, ctx) =>
    res(ctx.json({ body: [] })),
);

mock.get(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/actions/gjenapne/AVBRUTT`, (_, res, ctx) =>
    res(ctx.json({ status: 200 })),
);

mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/APEN/actions/bekreft`, (_, res, ctx) =>
    res(ctx.json({ status: 200 })),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/APEN_PAPIR/actions/bekreft`, (_, res, ctx) =>
    res(ctx.json({ status: 200 })),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/AVVIST/actions/bekreft`, (_, res, ctx) =>
    res(ctx.json({ status: 200 })),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/APEN/actions/send`, (_, res, ctx) =>
    res(ctx.json({ status: 200 })),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/APEN_PAPIR/actions/send`, (_, res, ctx) =>
    res(ctx.json({ status: 200 })),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/APEN/actions/avbryt`, (_, res, ctx) =>
    res(ctx.json({ status: 200 })),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/APEN_PAPIR/actions/avbryt`, (_, res, ctx) =>
    res(ctx.json({ status: 200 })),
);

mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/APEN/actions/behandlet`, (_, res, ctx) =>
    res(
        ctx.json({
            body: {
                soknaderOpprettet: 1,
                erBehandlet: false,
            },
        }),
    ),
);
mock.get(`${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/APEN_PAPIR/actions/behandlet`, (_, res, ctx) =>
    res(
        ctx.json({
            body: {
                soknaderOpprettet: 1,
                erBehandlet: false,
            },
        }),
    ),
);
