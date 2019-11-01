import React from 'react';
import { Sidetittel, Normaltekst } from 'nav-frontend-typografi';
import './SykmeldingerHeader.less';

const SykmeldingerHeader: React.FC = () => {
    return (
        <div className="sykmeldinger-header">
            <Sidetittel className="sykmeldinger-header__tittel">Dine Sykmeldinger</Sidetittel>
            <Normaltekst className="sykmeldinger-header__infotekst">
                NAV mottar alle sykmeldinger. Ser du den ikke her? Det betyr at den som har sykmeldt deg ikke sender den
                digitalt til NAV. Da bruker du papirsykmeldingen i stedet.
            </Normaltekst>
        </div>
    );
};

export default SykmeldingerHeader;
