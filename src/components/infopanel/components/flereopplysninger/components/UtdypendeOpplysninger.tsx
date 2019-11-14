import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { SporsmalSvar } from '../../../../../types/sykmeldingTypes';

import tekster from '../flereopplysninger-tekster';

import PanelSeksjon from '../components/PanelSeksjon';
import Margin from '../../Margin';

interface OpplysningsGruppeProps {
    opplysningGruppe: Map<string, SporsmalSvar>;
}

const OpplysningsGruppe = ({ opplysningGruppe }: OpplysningsGruppeProps) => {
    const sporsmal = Array.from(opplysningGruppe).map(([key, sporsmalSvar]) => (
        <Sporsmal key={key} sporsmalSvar={sporsmalSvar} />
    ));
    return <>{sporsmal}</>;
};

interface SporsmalProps {
    sporsmalSvar: SporsmalSvar;
}

const Sporsmal = ({ sporsmalSvar: { restriksjoner, sporsmal, svar } }: SporsmalProps) => {
    return (
        <Margin>
            <Element>{sporsmal}</Element>
            <Normaltekst>- {svar}</Normaltekst>
            {restriksjoner}
        </Margin>
    );
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
        <OpplysningsGruppe key={key} opplysningGruppe={opplysningGruppe} />
    ));

    return <PanelSeksjon tittel={tekster['utdypende.tittel']}>{opplysningGrupper}</PanelSeksjon>;
};

export default UtdypendeOpplysninger;
