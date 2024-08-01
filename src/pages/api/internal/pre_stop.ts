import type { NextApiResponse } from 'next'
import { logger } from '@navikt/next-logger'

const handler = async (_: never, res: NextApiResponse): Promise<void> => {
    logger.info('Next.js server: received pre stop request, waiting for 10s before starting shutdown')
    await new Promise((resolve) => setTimeout(resolve, 10000))
    logger.info('Next.js server: starting shutdown')

    res.status(200).json({ message: 'ready for shutdown' })
}

export default handler
