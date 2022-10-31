// TODO replace this component
/* eslint-disable postcss-modules/no-unused-class */
import { PropsWithChildren } from 'react'

import styles from './Spacing.module.css'

type Direction = 'top' | 'bottom'
type Amount = 'x-small' | 'small' | 'medium' | 'large'

interface SpacingProps {
    direction?: Direction
    amount?: Amount
}

function Spacing({ direction = 'bottom', amount = 'medium', children }: PropsWithChildren<SpacingProps>): JSX.Element {
    return <div className={styles[`${direction}-${amount}`]}>{children}</div>
}

export default Spacing
