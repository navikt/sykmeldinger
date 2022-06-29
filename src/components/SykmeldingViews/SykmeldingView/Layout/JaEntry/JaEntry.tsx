import { BodyShort, Heading } from '@navikt/ds-react';

import styles from './JaEntry.module.css';

interface JaEntryProps {
    title: string;
    headingLevel?: '1' | '2' | '3' | '4' | '5' | '6';
}

const JaEntry: React.FC<JaEntryProps> = ({ title, headingLevel = '3' }) => {
    return (
        <div>
            <Heading className={styles.heading} size="small" level={headingLevel}>
                {title}
            </Heading>
            <BodyShort size="small" className={styles.jaEntryText}>
                Ja
            </BodyShort>
        </div>
    );
};

export default JaEntry;
