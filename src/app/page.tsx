import React, { ReactElement } from 'react'
import Link from 'next/link'

function Page(): ReactElement {
    return (
        <div>
            Noen sykmeldinger:
            <Link href="/joda">En</Link>
            <Link href="/neida">To</Link>
            <Link href="/så-det">Tre</Link>
        </div>
    )
}

export default Page
