import type { ReactElement } from 'react'
import * as ds from '@navikt/ds-react'

export function PageHeader({ title }: { title: string }): ReactElement {
    return (
        <div className="mb-8 flex items-center">
            <ds.Heading size="xlarge" level="1">
                {title}
            </ds.Heading>
        </div>
    )
}
