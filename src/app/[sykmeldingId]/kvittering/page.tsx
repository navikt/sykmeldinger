import React, { ReactElement } from 'react'
import Link from 'next/link'

function Page(): ReactElement {
    return (
        <div>
            Bra kvittering ass!
            <Link href="/">Tilbake til start</Link>
        </div>
    )
}

export default Page
