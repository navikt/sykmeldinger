import AlertStripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import React from 'react';

import Margin from '../components/Infopanel/layout/Margin';

const EldreSykmeldingVarsel = () => {
    // TODO: hvis brukeren har en eldre sykmelding som må behandles først
    if (false) {
        return null;
    }

    return (
        <Margin>
            <AlertStripe type="info">
                Du har eldre sykmeldinger som du bør behandle før denne.
                <Lenke href="www.nav.no">Gå til den eldste sykmeldingen.</Lenke>
            </AlertStripe>
        </Margin>
    );
};

export default EldreSykmeldingVarsel;
