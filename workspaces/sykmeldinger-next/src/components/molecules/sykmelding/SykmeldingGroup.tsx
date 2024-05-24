import { ReactElement, PropsWithChildren } from 'react'
import { Heading } from '@navikt/ds-react'
import { CalendarIcon } from '@navikt/aksel-icons'

import { cn } from '../../../utils/tw-utils'
import { cleanId } from '../../../utils/stringUtils'

type Props = {
    heading: string
    parentId: string
    Icon: typeof CalendarIcon
    wrap?: boolean
    tight?: boolean
}

/**
 * A group of small pieces of information with a corresponding icon-header combo
 */
export function SykmeldingGroup({
    heading,
    Icon,
    parentId,
    tight = false,
    wrap = false,
    children,
}: PropsWithChildren<Props>): ReactElement {
    const labelId = parentId + cleanId(heading)
    return (
        <section className="pb-4" aria-labelledby={labelId}>
            <SykmeldingSectionHeading id={labelId} title={heading} Icon={Icon} />
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

interface SectionHeadingProps {
    id: string
    title: string
    Icon: typeof CalendarIcon
}

/**
 * Header to be used with SykmeldingGroup
 */
function SykmeldingSectionHeading({ id, title, Icon }: SectionHeadingProps): ReactElement {
    return (
        <div className="flex items-center gap-2 py-4">
            <Icon role="img" aria-hidden className="text-2xl" />
            <Heading size="small" level="3" id={id}>
                {title}
            </Heading>
        </div>
    )
}
