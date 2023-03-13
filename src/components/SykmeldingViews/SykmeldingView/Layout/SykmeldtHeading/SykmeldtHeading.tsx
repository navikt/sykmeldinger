import React from 'react'
import { Heading } from '@navikt/ds-react'
import { Calender } from '@navikt/ds-icons'

interface Props {
    title: string
    Icon: typeof Calender
}

export function SykmeldtHeading({ title, Icon }: Props): JSX.Element {
    return (
        <div className="flex items-center gap-2 py-4">
            <Icon role="img" aria-hidden className="text-2xl" />
            <Heading size="small" level="3">
                {title}
            </Heading>
        </div>
    )
}
