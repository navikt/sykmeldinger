import { Heading } from '@navikt/ds-react';

import styles from './Section.module.css';

const Section: React.FC<{ title?: string }> = ({ title, children }) => {
    return (
        <div className={styles.opplysningSection}>
            {title && (
                <Heading className={styles.title} size="small" level="3">
                    {title}
                </Heading>
            )}
            {children}
        </div>
    );
};

export default Section;
