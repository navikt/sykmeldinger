import { GetServerSidePropsContext, NextApiRequest } from 'next'

export function getSessionId(req: GetServerSidePropsContext['req'] | NextApiRequest): string {
    const sessionId = req.cookies['next-session-id']
    if (!sessionId) {
        throw new Error('Session ID not found')
    }
    return sessionId
}
