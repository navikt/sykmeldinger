import React, { PropsWithChildren } from 'react'
import { Heading } from '@navikt/ds-react'

import styles from './FormStructure.module.css'

export function QuestionWrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return <div className={styles.question}>{children}</div>
}

export function SectionWrapper({ children, title }: PropsWithChildren<{ title?: string }>): JSX.Element {
    return (
        <div className={styles.section}>
            {title && (
                <Heading size="medium" level="2">
                    {title}
                </Heading>
            )}
            {children}
        </div>
    )
}
