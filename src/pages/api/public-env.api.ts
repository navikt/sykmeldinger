import { NextApiRequest, NextApiResponse } from 'next'

import { getPublicEnv } from '../../utils/env'

const publicEnv = getPublicEnv()

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    res.status(200).setHeader('content-type', 'application/javascript').send(`
        window.publicEnv = ${JSON.stringify(publicEnv)}
    `)
}

export default handler
