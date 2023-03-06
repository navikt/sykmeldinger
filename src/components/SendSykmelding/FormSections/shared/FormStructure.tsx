import React, { PropsWithChildren } from 'react'
import { Heading, HeadingProps } from '@navikt/ds-react'

export function QuestionWrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return <div className="mt-12">{children}</div>
}

export function SectionWrapper({
    children,
    title,
    size = 'medium',
    level = '2',
}: PropsWithChildren<{ title?: string } & Partial<Pick<HeadingProps, 'size' | 'level'>>>): JSX.Element {
    return (
        <section className="mt-6" aria-label={title}>
            {title && (
                <Heading size={size} level={level}>
                    {title}
                </Heading>
            )}
            {children}
        </section>
    )
}
