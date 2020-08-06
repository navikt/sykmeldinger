import React from 'react';
import { VenstreChevron } from 'nav-frontend-chevron';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import './TilHovedsiden.less';

const TilHovedsiden = () => {
    return (
        <Lenke href={process.env.REACT_APP_SYKEFRAVAER_ROOT || '#'} className="til-hovedsiden">
            <VenstreChevron className="til-hovedsiden__chevron" />
            <Normaltekst>Til hovedsiden ditt sykefravær</Normaltekst>
        </Lenke>
    );
};

export default TilHovedsiden;
