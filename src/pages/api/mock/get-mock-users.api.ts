import { NextApiRequest, NextApiResponse } from 'next'

import mockDb from '../../../server/graphql/mockDb'
import { isLocalOrDemo } from '../../../utils/env'

const getMockUsers = (req: NextApiRequest, res: NextApiResponse): void => {
    if (!isLocalOrDemo) {
        res.status(405).json({ message: 'Method not allowed' })
        return
    }

    res.status(200).json({ users: mockDb().getMockUsers() })
}

export default getMockUsers
