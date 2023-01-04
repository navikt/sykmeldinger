import React, { PropsWithChildren } from 'react'
import { Heading, HeadingProps } from '@navikt/ds-react'

import styles from './FormStructure.module.css'

export function QuestionWrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return <div className={styles.question}>{children}</div>
}

export function SectionWrapper({
    children,
    title,
    size = 'medium',
    level = '2',
}: PropsWithChildren<{ title?: string } & Partial<Pick<HeadingProps, 'size' | 'level'>>>): JSX.Element {
    return (
        <section className={styles.section} aria-label={title}>
            {title && (
                <Heading size={size} level={level}>
                    {title}
                </Heading>
            )}
            {children}
        </section>
    )
}
