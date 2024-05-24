import { ReactElement } from 'react'
import { Button } from '@navikt/ds-react'

import styles from './Test.module.css'

function Test(): ReactElement {
    return (
        <div className={styles.root}>
            <div className="bg-red-500">Hello! VERY HALLO</div>
            <Button>Don't click</Button>
        </div>
    )
}

export default Test
