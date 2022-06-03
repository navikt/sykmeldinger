import { NextApiRequest, NextApiResponse } from 'next';

export function handleFlexMockRequest(req: NextApiRequest, res: NextApiResponse, path: string[]): void {
    if (path[path.length - 1] === 'erUtenforVentetid') {
        res.status(200).json({ erUtenforVentetid: false, oppfolgingsdato: '2021-04-10' });
        return;
    }

    throw new Error(`Unhandled mock path: ${path}`);
}
