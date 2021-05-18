import './Header.less';

import React from 'react';
import { Undertittel, Innholdstittel } from 'nav-frontend-typografi';

interface HeaderProps {
    title?: string;
    subTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subTitle }) => {
    if (!title) {
        return null;
    }

    return (
        <div className="location-header">
            <Innholdstittel tag="h1">{title}</Innholdstittel>
            {subTitle ? <Undertittel tag="h2">{subTitle}</Undertittel> : null}
        </div>
    );
};

export default Header;
