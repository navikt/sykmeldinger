import { ReactElement, PropsWithChildren } from 'react'
import { Heading } from '@navikt/ds-react'
import { CalendarIcon } from '@navikt/aksel-icons'

import { cn } from '../../../utils/tw-utils'
import { cleanId } from '../../../utils/stringUtils'

interface Props {
    title: string
    Icon: typeof CalendarIcon
}

/**
 * A group of small pieces of information with a corresponding icon-header combo
 */
export function SykmeldingGroup({
    heading,
    Icon,
    tight = false,
    wrap = false,
    children,
}: PropsWithChildren<{ heading: string; Icon: typeof CalendarIcon; wrap?: boolean; tight?: boolean }>): ReactElement {
    return (
        <section className="pb-4" aria-labelledby={cleanId(heading)}>
            <SykmeldingSectionHeading title={heading} Icon={Icon} />
            <div
                className={cn('flex flex-col', {
                    'flex-row flex-wrap [&>div]:flex-grow': wrap,
                    'gap-3': !tight,
                })}
            >
                {children}
            </div>
        </section>
    )
}

/**
 * Header to be used with SykmeldingGroup
 */
function SykmeldingSectionHeading({ title, Icon }: Props): ReactElement {
    return (
        <div className="flex items-center gap-2 py-4">
            <Icon role="img" aria-hidden className="text-2xl" />
            <Heading size="small" level="3" id={cleanId(title)}>
                {title}
            </Heading>
        </div>
    )
}
