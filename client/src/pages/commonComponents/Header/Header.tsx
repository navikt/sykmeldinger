import './Header.less';

import React from 'react';
import { Sidetittel, Undertittel } from 'nav-frontend-typografi';

const Header = ({ title, subtitle }: { title: string; subtitle?: string }) => {
    return (
        <div className="location-header">
            <Sidetittel>{title}</Sidetittel>
            <Undertittel>{subtitle}</Undertittel>
        </div>
    );
};

export default Header;
