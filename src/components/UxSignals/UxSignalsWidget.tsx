import Script from 'next/script'
import React from 'react'

import { isLocalOrDemo } from '../../utils/env'
import styles from '../../components/UxSignals/UxSignalsWidget.module.css'

function UxSignalsWidget(): JSX.Element | null {
    if (isLocalOrDemo) return null

    return (
        <>
            <Script
                type="module"
                strategy="lazyOnload"
                src="https://uxsignals-frontend.uxsignals.app.iterate.no/embed.js"
            />
            <div data-uxsignals-embed="study-ok4tm1djgc" className={styles.uxSignalsContainer} />
        </>
    )
}

export default UxSignalsWidget
