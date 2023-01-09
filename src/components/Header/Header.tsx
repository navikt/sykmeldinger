import { Heading } from '@navikt/ds-react'

import styles from './Header.module.css'
interface HeaderProps {
    title?: string
    subTitle?: string
}

function Header({ title, subTitle }: HeaderProps): JSX.Element | null {
    if (!title) {
        return null
    }

    return (
        <div className={styles.locationHeader}>
            <Heading size="large">{title}</Heading>
            {subTitle ? (
                <Heading size="medium" level="2">
                    {subTitle}
                </Heading>
            ) : null}
        </div>
    )
}

export default Header
