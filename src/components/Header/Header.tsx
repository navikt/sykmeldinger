import './Header.less';

import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';

const Header = ({ location }: { location: string }) => {
    return (
        <div className="location-header">
            <Systemtittel>{location}</Systemtittel>
        </div>
    );
};

export default Header;
