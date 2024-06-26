import Script from 'next/script'
import { ReactElement } from 'react'

import { isLocalOrDemo } from '../../utils/env'
import styles from '../../components/UxSignals/UxSignalsWidget.module.css'

const DISABLE_UX_SIGNALS = true

function UxSignalsWidget(): ReactElement | null {
    if (isLocalOrDemo || DISABLE_UX_SIGNALS) return null

    return (
        <>
            <Script
                type="module"
                strategy="lazyOnload"
                src="https://uxsignals-frontend.uxsignals.app.iterate.no/embed.js"
            />
            <div data-uxsignals-embed="panel-etd0zg7795" className={styles.uxSignalsContainer} />
        </>
    )
}

export default UxSignalsWidget
