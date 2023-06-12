import { ReactElement } from 'react'
import { Heading } from '@navikt/ds-react/esm/typography'

export function PageHeader({ title }: { title: string }): ReactElement {
    return (
        <div className="mb-8 flex items-center">
            <Heading size="xlarge" level="1">
                {title}
            </Heading>
        </div>
    )
}
