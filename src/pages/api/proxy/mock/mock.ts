import { NextApiRequest, NextApiResponse } from 'next';

import arbeidsgivereMock from '../../../../server/graphql/mockData/arbeidsgivereMock';
import { sykmeldingApen } from '../../../../server/graphql/mockData/sykmelding-apen';
import { sykmeldingApenPapir } from '../../../../server/graphql/mockData/sykmelding-apen-papir';
import { sykmeldingSendt } from '../../../../server/graphql/mockData/sykmelding-sendt';
import { sykmeldingSendt2 } from '../../../../server/graphql/mockData/sykmelding-sendt-2';
import { sykmeldingSendt3 } from '../../../../server/graphql/mockData/sykmelding-sendt-3';
import { sykmeldingBekreftet } from '../../../../server/graphql/mockData/sykmelding-bekreftet';
import { sykmeldingAvvist } from '../../../../server/graphql/mockData/sykmelding-avvist';
import { sykmeldingAvvistBekreftet } from '../../../../server/graphql/mockData/sykmelding-avvist-bekreftet';
import { sykmeldingAvbrutt } from '../../../../server/graphql/mockData/sykmelding-avbrutt';
import { sykmeldingUtgatt } from '../../../../server/graphql/mockData/sykmelding-utgatt';
import { sykmeldingEgenmeldt } from '../../../../server/graphql/mockData/sykmelding-egenmeldt';
import { sykmeldingUnderbehandlingTilbakedatering } from '../../../../server/graphql/mockData/sykmelding-under-behandling-tilbakedatering';
import { sykmeldingUgyldigTilbakedatering } from '../../../../server/graphql/mockData/sykmelding-ugyldig-tilbakedatering';
import { StatusEvent } from '../../../../server/graphql/resolver-types.generated';

const sykmeldinger = [
    sykmeldingApen(),
    sykmeldingApenPapir(),
    sykmeldingSendt(),
    sykmeldingSendt2,
    sykmeldingSendt3,
    sykmeldingBekreftet,
    sykmeldingAvvist(),
    sykmeldingAvvistBekreftet,
    sykmeldingAvbrutt(),
    sykmeldingUtgatt,
    sykmeldingEgenmeldt,
    sykmeldingUnderbehandlingTilbakedatering(),
    sykmeldingUgyldigTilbakedatering,
];

export function handleMockRequest(req: NextApiRequest, res: NextApiResponse, path: string[]): void {
    if (path.length === 2 && path[1] === 'sykmeldinger') {
        res.status(200).json(sykmeldinger);
        return;
    } else if (path.length === 2 && path[1] === 'brukerinformasjon') {
        res.status(200).json({ strengtFortroligAdresse: false, arbeidsgivere: arbeidsgivereMock });
        return;
    } else if (path.length === 3) {
        const relevantSykmelding = sykmeldinger.find((it) => it.id === path[2]);
        if (!relevantSykmelding) {
            throw new Error(`Unable to find sykmelding by id: ${path[2]}`);
        }
        res.status(200).json(relevantSykmelding);
        return;
    } else if (path.length === 4 && ['send', 'bekreftAvvist', 'avbryt', 'gjenapne'].includes(path[3])) {
        const relevantSykmelding = sykmeldinger.find((it) => it.id === path[2]);
        if (!relevantSykmelding) {
            throw new Error(`Unable to find sykmelding by id: ${path[2]}`);
        }
        relevantSykmelding.sykmeldingStatus.statusEvent = pathParamToStatusEvent(path[3]);

        res.status(203).json({ ok: 'ok' });
        return;
    }

    throw new Error(`Unhandled mock path: ${path}`);
}

function pathParamToStatusEvent(path: string): StatusEvent {
    switch (path) {
        case 'send':
            return StatusEvent.Sendt;
        case 'bekreftAvvist':
            return StatusEvent.Bekreftet;
        case 'avbryt':
            return StatusEvent.Avbrutt;
        case 'gjenapne':
            return StatusEvent.Apen;
        default:
            throw new Error(`Unknown path ${path}`);
    }
}
