import { PropsWithChildren } from 'react';
import cn from 'classnames';

import styles from './Bubble.module.css';

interface Props {
    whiteBackground?: boolean;
}

function Bubble({ whiteBackground, children }: PropsWithChildren<Props>): JSX.Element {
    return (
        <div className={cn(styles.bubble, { [styles.white]: whiteBackground })}>
            <div className={cn(styles.pin, { [styles.white]: whiteBackground })}></div>
            <div className={styles.content}>{children}</div>
        </div>
    );
}

export default Bubble;
