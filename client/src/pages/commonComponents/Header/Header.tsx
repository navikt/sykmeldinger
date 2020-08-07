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
            <Innholdstittel tag="h1">{title}</Innholdstittel>
            {subtitle ? <Undertittel tag="h2">{subtitle}</Undertittel> : null}
            {totalPeriodString ? <Undertittel tag="h2">{totalPeriodString}</Undertittel> : null}
        </div>
    );
};

export default Header;
