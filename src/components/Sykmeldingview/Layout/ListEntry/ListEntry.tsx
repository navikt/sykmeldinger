import { Element, Undertekst } from 'nav-frontend-typografi';
import styles from './ListEntry.module.css';

interface ListEntryProps {
    listText: string[];
    listTitle: string;
}

const ListEntry: React.FC<ListEntryProps> = ({ listText, listTitle }) => {
    return (
        <div className={styles.listEntry}>
            <Element>{listTitle}</Element>
            <ul>
                {listText.map((str, index) => (
                    <li className={styles.listEntryText} key={index}><Undertekst>{str}</Undertekst></li>
                ))}
            </ul>
        </div>
    );
};

export default ListEntry;
