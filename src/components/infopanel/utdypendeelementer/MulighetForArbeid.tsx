import React from 'react';

import OpplysningerSeksjon from '../layout/OpplysningerSeksjon';

import tekster from '../infopanel-tekster';
import Margin from '../layout/Margin';
import ElementMedTekst from '../layout/ElementMedTekst';
import EnkelCheckbox from '../layout/EnkelCheckbox';

// TODO: Koble opp til data i sykmelding
const testSvar = 'andre årsaker til sykefravær';

const MulighetForArbeid = () => {
    if (!true) {
        return null;
    }

    return (
        <OpplysningerSeksjon tittel={tekster['muliget-for-arbeid.tittel']}>
            <Margin>
                <ElementMedTekst tittel={tekster['muliget-for-arbeid.medisinske-arsaker.tittel']} />
                <EnkelCheckbox tittel={tekster['muliget-for-arbeid.medisinske-arsaker']} margin checked={true} />
            </Margin>

            <ElementMedTekst
                tittel={tekster['muliget-for-arbeid.medisinske-arsaker.beskriv']}
                tekst={testSvar}
                margin
            />

            <Margin>
                <ElementMedTekst tittel={tekster['muliget-for-arbeid.forhold-pa-arbeidsplassen.tittel']} />
                <EnkelCheckbox tittel={tekster['muliget-for-arbeid.forhold-pa-arbeidsplassen']} margin checked={true} />
            </Margin>

            <ElementMedTekst
                tittel={tekster['muliget-for-arbeid.forhold-pa-arbeidsplassen.angi']}
                tekst={testSvar}
                margin
            />
        </OpplysningerSeksjon>
    );
};

export default MulighetForArbeid;
