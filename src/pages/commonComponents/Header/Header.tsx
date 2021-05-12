import './Header.less';

import React from 'react';
import { Undertittel, Innholdstittel } from 'nav-frontend-typografi';
import { Sykmelding } from '../../../models/Sykmelding/Sykmelding';

interface HeaderProps {
    title?: string;
    sykmelding?: Sykmelding;
}

const Header: React.FC<HeaderProps> = ({ title, sykmelding }) => {
    if (!title && !sykmelding) {
        return null;
    }
    return (
        <div className="location-header">
            <Innholdstittel tag="h1">{title}</Innholdstittel>
            {sykmelding ? <Undertittel tag="h2">{sykmelding.getReadableSykmeldingLength()}</Undertittel> : null}
        </div>
    );
};

export default Header;
