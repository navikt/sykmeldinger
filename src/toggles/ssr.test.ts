import { expect, describe, it, vi } from 'vitest'
import { GetServerSidePropsContext } from 'next/types'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'

import { handleUnleashIds } from './ssr'

const fakeToken =
    'eyJraWQiOiJjWmswME1rbTVIQzRnN3Z0NmNwUDVGSFpMS0pzdzhmQkFJdUZiUzRSVEQ0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIzZDhhNGRjOC1hYzA5LTRkZTItYmJhOC0yYjg3ZTBmMmVmNjYiLCJpc3MiOiJodHRwczovL2V4YW1wbGUuY29tL29pZGMtcHJvdmlkZXIvIiwiY2xpZW50X2FtciI6InByaXZhdGVfa2V5X2p3dCIsInBpZCI6IjA4MDg5NDA4MDg0IiwidG9rZW5fdHlwZSI6IkJlYXJlciIsImNsaWVudF9pZCI6IjIxZjE5YjQ5LTkwNGMtNDkxYS1iMDdlLTdhNzAyY2RmNTRhYSIsImF1ZCI6Imh0dHBzOi8vZXhhbXBsZS5jb20iLCJhY3IiOiJMZXZlbDQiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIiwiZXhwIjoxNjI4MDkwMjcwLCJpYXQiOjE2MjgwODY2NzAsImNsaWVudF9vcmdubyI6Ijg4OTY0MDc4MiIsImp0aSI6IjI2OTllMGEyLWIwMmEtNDc4My1hYTgzLTU5MTgzZTZlMDAxZSIsImNvbnN1bWVyIjp7ImF1dGhvcml0eSI6IjU4YTJjMDczLTUxYjMiLCJJRCI6IjkxMDM1MGEyLWNjZjQtNDM4NCJ9fQ.T402ovKHGMLEIdL6kZxdm8_Vy_USFzz9ZzhUT8f7zaOqq5_Rr_S_lW8pg-l1B9ZbXkTYaX_PO3xb630BYQQaG4D-F98CYrm98WodYZHQrIkIMqjsLU4xbe_IXrRKAdaqUkCMaHtAjo9GpebaL4zKlJatFkhvGJR7Z2PjqC3dlft4vaQTX7PGTfXcLZl1gfOF0UWdgx9EXYRv9JgmUI2gDHxU6_ivQCtwfjTwwcgpnqf1f0yPsrLPxmEWy3Jf12Rz9CPbSxzRzNrVhhfD7wz8UGvpQS-zDwRmcMh0L0kzSsiavn3lfGDz2Ce5-DTTptub6iSRuTOFqFQWkITohGTU3A'

describe('handleSessionId', () => {
    it('should use have pid when user has auth header and cookie exists', () => {
        const req = {
            headers: { authorization: `Bearer ${fakeToken}` },
            cookies: { 'sykmeldinger-unleash-session-id': 'unleash-id' } as NextApiRequestCookies,
        } as GetServerSidePropsContext['req']
        const res = {} as GetServerSidePropsContext['res']

        const { sessionId, userId } = handleUnleashIds(req, res)

        expect(userId).toEqual('08089408084')
        expect(sessionId).toEqual('unleash-id')
    })

    it('should use existing unleash header when no pid but has header', () => {
        const req = {
            headers: {},
            cookies: { 'sykmeldinger-unleash-session-id': 'unleash-id' } as NextApiRequestCookies,
        } as GetServerSidePropsContext['req']
        const res = {} as GetServerSidePropsContext['res']

        const { sessionId, userId } = handleUnleashIds(req, res)

        expect(sessionId).toEqual('unleash-id')
        expect(userId).toBeUndefined()
    })

    it('should generate new sykmeldinger-unleash-session-id when no pid and no cookie', () => {
        const setHeaderMock = vi.fn()
        const req = {
            headers: {},
            cookies: {} as NextApiRequestCookies,
        } as GetServerSidePropsContext['req']
        const res = {
            getHeader: (() => []) as GetServerSidePropsContext['res']['getHeader'],
            setHeader: setHeaderMock as GetServerSidePropsContext['res']['setHeader'],
        } as GetServerSidePropsContext['res']

        const { sessionId } = handleUnleashIds(req, res)

        expect(sessionId.length > 18).toBe(true)
        expect(setHeaderMock).toHaveBeenCalledWith('set-cookie', [
            `sykmeldinger-unleash-session-id=${sessionId}; path=/;`,
        ])
    })
})
