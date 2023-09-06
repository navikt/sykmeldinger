import Script from 'next/script'
import { ReactElement } from 'react'

import { isLocalOrDemo } from '../../utils/env'
import styles from '../../components/UxSignals/UxSignalsWidget.module.css'

function UxSignalsWidget(): ReactElement | null {
    if (isLocalOrDemo) return null

    return (
        <>
            <Script
                type="module"
                strategy="lazyOnload"
                src="https://uxsignals-frontend.uxsignals.app.iterate.no/embed.js"
            />
            <div data-uxsignals-embed="study-6fkh2x1b4r" className={styles.uxSignalsContainer} />
        </>
    )
}

export default UxSignalsWidget
