import { Element } from 'nav-frontend-typografi';
import styles from './JaEntry.module.css';

interface JaEntryProps {
    title: string;
}

const JaEntry: React.FC<JaEntryProps> = ({ title }) => {
    return (
        <div className={styles.jaEntry}>
            <Element>{title}</Element>
            <p className={styles.jaEntryText}>Ja</p>
        </div>
    );
};

export default JaEntry;
