import Script from 'next/script'
import { ReactElement } from 'react'

import { isLocalOrDemo } from '../../utils/env'
import styles from '../../components/UxSignals/UxSignalsWidget.module.css'

const DISABLE_UX_SIGNALS = true

function UxSignalsWidget(): ReactElement | null {
    if (isLocalOrDemo || DISABLE_UX_SIGNALS) return null

    return (
        <>
            <div data-uxsignals-embed="panel-gtnepi3ujl" className={styles.uxSignalsContainer}></div>
            <Script type="module" strategy="lazyOnload" src="https://widget.uxsignals.com/embed.js" />
        </>
    )
}

export default UxSignalsWidget
