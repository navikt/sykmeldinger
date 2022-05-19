import NavFrontendChevron from 'nav-frontend-chevron';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { useState } from 'react';
import cn from 'classnames';

import styles from './Ekspanderbar.module.css';

interface EkspanderbarProps {
    title: string;
}

const Ekspanderbar: React.FC<EkspanderbarProps> = ({ title, children }) => {
    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <div className={styles.ekspanderbar}>
            <button
                type="button"
                aria-expanded={expanded}
                onClick={() => {
                    setExpanded((prev) => !prev);
                }}
                className={styles.toggle}
            >
                <Element className={styles.text}>{title}</Element>
                <NavFrontendChevron type={expanded ? 'opp' : 'ned'} />
            </button>
            <div
                aria-hidden={!expanded}
                className={cn(styles.content, { [styles.displayNone]: !expanded })}
            >
                {typeof children === 'string' ? <Normaltekst>{children}</Normaltekst> : children}
            </div>
        </div>
    );
};

export default Ekspanderbar;
