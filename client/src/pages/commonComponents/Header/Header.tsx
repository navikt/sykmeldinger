import './Header.less';

import React from 'react';
import { Sidetittel, Undertittel } from 'nav-frontend-typografi';
import { Periode } from '../../../types/sykmelding';
import { getTotalSykmeldingLenghtReadableString } from '../../../utils/sykmeldingUtils';

interface HeaderProps {
    title: string;
    subtitle?: string;
    sykmeldingPerioder?: Periode[];
}

const Header = ({ title, subtitle, sykmeldingPerioder }: HeaderProps) => {
    const totalPeriodString = sykmeldingPerioder
        ? `for ${getTotalSykmeldingLenghtReadableString(sykmeldingPerioder)}`
        : undefined;

    return (
        <div className="location-header">
            <Sidetittel>{title}</Sidetittel>
            {subtitle ? <Undertittel>{subtitle}</Undertittel> : null}
            {totalPeriodString ? <Undertittel>{totalPeriodString}</Undertittel> : null}
        </div>
    );
};

export default Header;
