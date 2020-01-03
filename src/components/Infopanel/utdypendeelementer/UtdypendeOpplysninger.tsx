import React from 'react';

import { SporsmalSvar } from '../../../types/sykmeldingTypes';

import tekster from '../Infopanel-tekster';

import SeksjonMedTittel from '../layout/SeksjonMedTittel';
import Margin from '../layout/Margin';
import ElementMedTekst from '../layout/ElementMedTekst';

interface OpplysningsGruppeProps {
    opplysningGruppe: Map<string, SporsmalSvar>;
}

const OpplysningsGruppe = ({ opplysningGruppe }: OpplysningsGruppeProps) => {
    const sporsmal = Array.from(opplysningGruppe).map(([key, sporsmalSvar]) => (
        <ElementMedTekst key={key} tittel={sporsmalSvar.sporsmal} tekst={sporsmalSvar.svar} margin />
    ));
    return <>{sporsmal}</>;
};

interface UtdypendeOpplysningerProps {
    opplysninger: Map<string, Map<string, SporsmalSvar>>;
}

const UtdypendeOpplysninger = ({ opplysninger }: UtdypendeOpplysningerProps) => {
    // TODO: legg til logikk for visning av seksjon
    /*
    const visSeksjon = sykmelding.utdypendeOpplysninger.sykehistorie ||
        sykmelding.utdypendeOpplysninger.paavirkningArbeidsevne ||
        sykmelding.utdypendeOpplysninger.resultatAvBehandling ||
        sykmelding.utdypendeOpplysninger.henvisningUtredningBehandling;
    */

    const opplysningGrupper = Array.from(opplysninger).map(([key, opplysningGruppe]) => (
        <Margin key={key}>
            <OpplysningsGruppe opplysningGruppe={opplysningGruppe} />
        </Margin>
    ));

    return (
        <SeksjonMedTittel understrek tittel={tekster['utdypende.tittel']}>
            {opplysningGrupper}
        </SeksjonMedTittel>
    );
};

export default UtdypendeOpplysninger;
