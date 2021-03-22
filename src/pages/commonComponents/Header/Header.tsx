import './Header.less';

import React from 'react';
import { Undertittel, Innholdstittel } from 'nav-frontend-typografi';
import { getTotalSykmeldingLenghtReadableString } from '../../../utils/sykmeldingUtils';
import Periode from '../../../types/sykmelding/Periode';

interface HeaderProps {
    title: string;
    subtitle?: string;
    sykmeldingPerioder?: Periode[];
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, sykmeldingPerioder }) => {
    const totalPeriodString = sykmeldingPerioder
        ? `for ${getTotalSykmeldingLenghtReadableString(sykmeldingPerioder)}`
        : undefined;

    return (
        <div className="location-header">
            <Innholdstittel tag="h1">{title}</Innholdstittel>
            {subtitle ? <Undertittel tag="h2">{subtitle}</Undertittel> : null}
            {totalPeriodString ? <Undertittel tag="h2">{totalPeriodString}</Undertittel> : null}
        </div>
    );
};

export default Header;
