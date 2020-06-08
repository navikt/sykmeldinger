import React from 'react';

import ElementMedTekst from '../layout/ElementMedTekst';
import EnkelCheckbox from '../layout/Checkbox/EnkelCheckbox';
import Margin from '../layout/Margin';
import SeksjonMedTittel from '../layout/SeksjonMedTittel';

// TODO: Koble opp til data i sykmelding
const testSvar = 'andre årsaker til sykefravær';

const MulighetForArbeid = () => {
    if (!true) {
        return null;
    }

    return (
        <SeksjonMedTittel understrek tittel="Mulighet for arbeid">
            <Margin>
                <ElementMedTekst tittel="Pasienten kan ikke være i arbeid (100% sykmeldt)" />
                <EnkelCheckbox
                    tittel="Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet"
                    margin
                    checked
                    vis
                />
            </Margin>

            <ElementMedTekst tittel="Beskriv nærmere" tekst={testSvar} margin />

            <Margin>
                <ElementMedTekst tittel="Pasienten kan ikke være i arbeid (100% sykmeldt)" />
                <EnkelCheckbox
                    tittel="Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
                    margin
                    checked
                    vis
                />
            </Margin>

            <ElementMedTekst tittel="Angi hva som er årsaken" tekst={testSvar} margin />
        </SeksjonMedTittel>
    );
};

export default MulighetForArbeid;
