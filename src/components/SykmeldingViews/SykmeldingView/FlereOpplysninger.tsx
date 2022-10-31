import { PropsWithChildren } from 'react'
import { Accordion } from '@navikt/ds-react'
import { Findout } from '@navikt/ds-icons'

import styles from './FlereOpplysninger.module.css'

function FlereOpplysninger({ children }: PropsWithChildren<unknown>): JSX.Element {
    return (
        <Accordion className={styles.flereOpplysninger}>
            <Accordion.Item>
                <Accordion.Header>
                    <div className={styles.iconAndTitle}>
                        <Findout />
                        Flere opplysninger
                    </div>
                </Accordion.Header>
                <Accordion.Content className={styles.content}>{children}</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

export default FlereOpplysninger
