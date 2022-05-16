import { NextApiRequest, NextApiResponse } from 'next';

import arbeidsgivereMock from '../../../../utils/test/mockData/arbeidsgivereMock';
import { sykmeldingBekreftet } from '../../../../utils/test/mockData/sykmelding-bekreftet';
import { sykmeldingApen } from '../../../../utils/test/mockData/sykmelding-apen';
import { sykmeldingSendt } from '../../../../utils/test/mockData/sykmelding-sendt';
import { sykmeldingAvvist } from '../../../../utils/test/mockData/sykmelding-avvist';
import { sykmeldingAvbrutt } from '../../../../utils/test/mockData/sykmelding-avbrutt';
import { sykmeldingUtgatt } from '../../../../utils/test/mockData/sykmelding-utgatt';
import { sykmeldingEgenmeldt } from '../../../../utils/test/mockData/sykmelding-egenmeldt';
import { sykmeldingApenPapir } from '../../../../utils/test/mockData/sykmelding-apen-papir';
import { sykmeldingAvvistBekreftet } from '../../../../utils/test/mockData/sykmelding-avvist-bekreftet';
import { sykmeldingSendt2 } from '../../../../utils/test/mockData/sykmelding-sendt-2';
import { sykmeldingSendt3 } from '../../../../utils/test/mockData/sykmelding-sendt-3';
import { sykmeldingUgyldigTilbakedatering } from '../../../../utils/test/mockData/sykmelding-ugyldig-tilbakedatering';
import { sykmeldingUnderbehandlingTilbakedatering } from '../../../../utils/test/mockData/sykmelding-under-behandling-tilbakedatering';
import { StatusEvent } from '../../../../models/Sykmelding/SykmeldingStatus';

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
            return StatusEvent.SENDT;
        case 'bekreftAvvist':
            return StatusEvent.BEKREFTET;
        case 'avbryt':
            return StatusEvent.AVBRUTT;
        case 'gjenapne':
            return StatusEvent.APEN;
        default:
            throw new Error(`Unknown path ${path}`);
    }
}
