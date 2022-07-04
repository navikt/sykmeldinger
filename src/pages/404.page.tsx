import { GuidePanel } from '@navikt/ds-react';

import styles from './404.module.css';

const NotFoundPage = (): JSX.Element => {
    return (
        <div className={styles.limit}>
            <GuidePanel>Oisann! Du har kommet til en side som ikke eksisterer</GuidePanel>
        </div>
    );
};

export default NotFoundPage;
