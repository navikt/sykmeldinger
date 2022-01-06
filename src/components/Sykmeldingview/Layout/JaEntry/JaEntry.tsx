import { Element, Undertekst } from 'nav-frontend-typografi';
import styles from './JaEntry.module.css';

interface JaEntryProps {
    title: string;
}

const JaEntry: React.FC<JaEntryProps> = ({ title }) => {
    return (
        <div className={styles.jaEntry}>
            <Element>{title}</Element>
            <Undertekst className={styles.jaEntryText}>Ja</Undertekst>
        </div>
    );
};

export default JaEntry;
