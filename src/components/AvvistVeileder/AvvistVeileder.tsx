import './AvvistVeileder.less';

import React from 'react';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { Sykmelding } from '../../models/Sykmelding/Sykmelding';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederMaleNeurtralSvg from '../Veileder/svg/VeilederMaleNeutralSvg';

interface AvvistVeilederProps {
    sykmelding: Sykmelding;
}

const AvvistVeileder: React.FC<AvvistVeilederProps> = ({ sykmelding }) => {
    const behandlerNavn = sykmelding.behandler.getName();

    return (
        <Veilederpanel type="plakat" kompakt fargetema="normal" svg={<VeilederMaleNeurtralSvg />}>
            <Undertittel className="veiledercontent__title">Sykmeldingen kan dessverre ikke brukes</Undertittel>
            <hr aria-hidden className="veiledercontent__underline" />
            <Normaltekst>Beklager at vi må bry deg mens du er syk.</Normaltekst>
            <br />
            <Normaltekst>
                Du trenger en ny sykmelding fordi det er gjort en feil i utfyllingen. Vi har gitt beskjed til{' '}
                {behandlerNavn} om hva som er feil, og at du må få en ny sykmelding.
            </Normaltekst>
            <br />
            <Normaltekst>
                Når du har fått ny sykmelding fra {behandlerNavn}, får du en ny beskjed fra oss om å logge deg inn på
                nav.no slik at du kan sende inn sykmeldingen. Går det mange dager, bør du kontakte {behandlerNavn} som
                skal skrive den nye sykmeldingen.
            </Normaltekst>
            <br />
            <Element>Grunnen til at sykmeldingen er avvist:</Element>
            <ul>
                {sykmelding.behandlingsutfall.ruleHits.map((ruleHit, index) => (
                    <li key={index}>
                        <Normaltekst>{ruleHit.messageForUser}</Normaltekst>
                    </li>
                ))}
            </ul>
        </Veilederpanel>
    );
};

export default AvvistVeileder;
