import './Header.less';

import React from 'react';
import { Undertittel, Innholdstittel } from 'nav-frontend-typografi';
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
            <Innholdstittel>{title}</Innholdstittel>
            {subtitle ? <Undertittel>{subtitle}</Undertittel> : null}
            {totalPeriodString ? <Undertittel>{totalPeriodString}</Undertittel> : null}
        </div>
    );
};

export default Header;
