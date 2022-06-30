import { renderToString } from '@react-pdf/renderer';

import { Sykmelding } from '../api-models/sykmelding/Sykmelding';
import { getSykmelding } from '../sykmeldingerService';
import { sykmeldinger } from '../graphql/mockResolvers';
import { isLocalOrDemo } from '../../utils/env';

import SykmeldingPdf from './components/SykmeldingPdf';

export async function generateSykmeldingPdfServerSide(sykmeldingId: string, accessToken: string): Promise<string> {
    const timestamp = new Date().toISOString();
    const sykmelding: Sykmelding = !isLocalOrDemo
        ? await getSykmelding(sykmeldingId, accessToken)
        : await getMockSykmelding(sykmeldingId);

    return await renderToString(<SykmeldingPdf sykmelding={sykmelding} timestamp={timestamp} />);
}

async function getMockSykmelding(id: string): Promise<Sykmelding> {
    const relevantSykmelding = sykmeldinger.find((it) => it.id === id);
    if (!relevantSykmelding) {
        throw new Error(`Unable to find sykmelding by id: ${id}`);
    }
    return relevantSykmelding;
}
