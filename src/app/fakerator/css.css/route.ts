import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
    return new NextResponse(
        `
        .globby {
          background-color: red;
        }
    `,
        {
            headers: {
                'content-type': 'text/css',
            },
        },
    )
}
