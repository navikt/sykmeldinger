import React from 'react'
import { Heading } from '@navikt/ds-react'
import { Calender } from '@navikt/ds-icons'

import styles from './SykmeldtHeading.module.css'

interface Props {
    title: string
    Icon: typeof Calender
}

export function SykmeldtHeading({ title, Icon }: Props): JSX.Element {
    return (
        <div className={styles.root}>
            <Icon role="img" aria-hidden />
            <Heading size="small" level="3">
                {title}
            </Heading>
        </div>
    )
}
