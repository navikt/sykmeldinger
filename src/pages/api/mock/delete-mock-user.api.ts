import { NextApiRequest, NextApiResponse } from 'next'

import mockDb from '../../../server/graphql/mockDb'
import { isLocalOrDemo } from '../../../utils/env'

const getMockUsers = (req: NextApiRequest, res: NextApiResponse): void => {
    if (req.method !== 'POST' || !isLocalOrDemo) {
        res.status(405).json({ message: 'Method not allowed' })
        return
    }

    const values = JSON.parse(req.body)
    if (!mockDb().hasUser(values.user)) {
        res.status(400).json({ message: 'User not found' })
        return
    }

    mockDb().deleteUser(values.user)

    res.status(200).json({ ok: 'ok' })
}

export default getMockUsers
