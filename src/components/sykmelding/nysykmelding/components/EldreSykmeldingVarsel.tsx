import React from 'react';

import tekster from '../nysykmelding-tekster';
import Lenke from 'nav-frontend-lenker';
import AlertStripe from 'nav-frontend-alertstriper';

const EldreSykmeldingVarsel = () => {
    // TODO: hvis brukeren har en eldre sykmelding som må behandles først
    if (false) {
        return null;
    }

    return (
        <AlertStripe type="info">
            {tekster['sykmelding.eldre-sykmeldinger.tekst']}
            <Lenke href="www.nav.no">{tekster['sykmelding.eldre-sykmeldinger.lenke']}</Lenke>
        </AlertStripe>
    );
};

export default EldreSykmeldingVarsel;
