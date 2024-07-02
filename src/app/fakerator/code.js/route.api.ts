import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
    return new NextResponse(
        `
        console.log("Actual script")
    `,
        {
            headers: {
                'content-type': 'application/javascript',
            },
        },
    )
}
