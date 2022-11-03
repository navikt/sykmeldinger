import React, { PropsWithChildren } from 'react'

import styles from './QuestionWrapper.module.css'

function QuestionWrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return <div className={styles.question}>{children}</div>
}

export default QuestionWrapper
