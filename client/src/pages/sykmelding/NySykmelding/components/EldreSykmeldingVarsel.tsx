import AlertStripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import React from 'react';

import Margin from '../../components/Infopanel/layout/Margin';
import tekster from '../NySykmelding-tekster';

const EldreSykmeldingVarsel = () => {
    // TODO: hvis brukeren har en eldre sykmelding som må behandles først
    if (false) {
        return null;
    }

    return (
        <Margin>
            <AlertStripe type="info">
                {tekster['ny-sykmelding.eldre-sykmeldinger.tekst']}
                <Lenke href="www.nav.no">{tekster['ny-sykmelding.eldre-sykmeldinger.lenke']}</Lenke>
            </AlertStripe>
        </Margin>
    );
};

export default EldreSykmeldingVarsel;
