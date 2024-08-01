import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

const isReady = (req: NextApiRequest, res: NextApiResponse<Data>): void => {
    res.status(200).json({ message: `I'm ready!` })
}

export default isReady
