import { NextApiRequest, NextApiResponse } from 'next'

import { getPublicEnv } from '../../utils/env'

const publicEnv = getPublicEnv()

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    res.status(200).setHeader('content-type', 'application/javascript').send(`
        window.publicEnv = ${JSON.stringify(publicEnv)}
        // Temp to support changing variable without breaking for any users
        window._publicEnv = window.publicEnv
    `)
}

export default handler
