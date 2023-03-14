import React, { PropsWithChildren } from 'react'
import { Heading } from '@navikt/ds-react'
import { Calender } from '@navikt/ds-icons'
import cn from 'classnames'

interface Props {
    title: string
    Icon: typeof Calender
}

/**
 * A group of small pieces of information with a corresponding icon-header combo
 */
export function SykmeldingGroup({
    heading,
    Icon,
    tight = false,
    children,
}: PropsWithChildren<{ heading: string; Icon: typeof Calender; tight?: boolean }>): JSX.Element {
    return (
        <div className="pb-4">
            <SykmeldingSectionHeading title={heading} Icon={Icon} />
            <div
                className={cn('flex flex-col', {
                    'gap-3': !tight,
                })}
            >
                {children}
            </div>
        </div>
    )
}

/**
 * Header to be used with SykmeldingGroup
 *
 * TODO: Don't export this, should only be used through SykmeldingGroup
 */
export function SykmeldingSectionHeading({ title, Icon }: Props): JSX.Element {
    return (
        <div className="flex items-center gap-2 py-4">
            <Icon role="img" aria-hidden className="text-2xl" />
            <Heading size="small" level="3">
                {title}
            </Heading>
        </div>
    )
}
