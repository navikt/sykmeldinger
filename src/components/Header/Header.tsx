import React from 'react';
import { Undertittel, Innholdstittel } from 'nav-frontend-typografi';

import styles from './Header.module.css';
interface HeaderProps {
    title?: string;
    subTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subTitle }) => {
    if (!title) {
        return null;
    }

    return (
        <div className={styles.locationHeader}>
            <Innholdstittel tag="h1">{title}</Innholdstittel>
            {subTitle ? <Undertittel tag="h2">{subTitle}</Undertittel> : null}
        </div>
    );
};

export default Header;
