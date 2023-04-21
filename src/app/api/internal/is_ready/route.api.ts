import { NextResponse } from 'next/server'

import { getServerEnv } from '../../../../utils/env'

export const dynamic = 'force-dynamic'

export async function GET(): Promise<Response> {
    try {
        getServerEnv()
        return NextResponse.json({ message: `I'm ready` })
    } catch (e) {
        return NextResponse.json({ message: `Missing some env variables: ${e}` }, { status: 500 })
    }
}
