import React from 'react';
import { VenstreChevron } from 'nav-frontend-chevron';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import env from '../../utils/env';
import './TilHovedsiden.less';

const TilHovedsiden: React.FC = () => {
    return (
        <Lenke href={env.SYKEFRAVAER_ROOT || '#'} className="til-hovedsiden">
            <VenstreChevron className="til-hovedsiden__chevron" />
            <Normaltekst>Til hovedsiden ditt sykefravær</Normaltekst>
        </Lenke>
    );
};

export default TilHovedsiden;
