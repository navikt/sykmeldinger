import { Undertittel } from 'nav-frontend-typografi';

import styles from './Section.module.css';

const Section: React.FC<{ title?: string }> = ({ title, children }) => {
    return (
        <div className={styles.opplysningSection}>
            {title && <Undertittel className={styles.title}>{title}</Undertittel>}
            {children}
        </div>
    );
};

export default Section;
