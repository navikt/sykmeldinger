import './AvvistVeileder.less';

import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederMaleNeurtralSvg from '../Veileder/svg/VeilederMaleNeutralSvg';
import Behandlingsutfall from '../../models/Sykmelding/Behandlingsutfall';
import ForklaringZDiagnose from './ForklaringZDiagnose';
import ForklaringAndre from './ForklaringAndre';

interface AvvistVeilederProps {
    behandlerNavn: string;
    behandlingsutfall: Behandlingsutfall;
}

const AvvistVeileder: React.FC<AvvistVeilederProps> = ({ behandlerNavn, behandlingsutfall }) => {
    const isNotValidInHPR = behandlingsutfall.ruleHits.some(
        (regel) => regel.ruleName === 'BEHANDLER_IKKE_GYLDIG_I_HPR',
    );
    const isMissingAuthorization = behandlingsutfall.ruleHits.some(
        (regel) => regel.ruleName === 'BEHANDLER_MANGLER_AUTORISASJON_I_HPR',
    );
    const isNotCorrectRole = behandlingsutfall.ruleHits.some(
        (regel) => regel.ruleName === 'BEHANDLER_IKKE_LE_KI_MT_TL_FT_I_HPR',
    );
    const isSuspended = behandlingsutfall.ruleHits.some((regel) => regel.ruleName === 'BEHANDLER_SUSPENDERT');
    const isRoleOver12Weeks = behandlingsutfall.ruleHits.some(
        (regel) => regel.ruleName === 'BEHANDLER_MT_FT_KI_OVER_12_UKER',
    );
    const isOver70 = behandlingsutfall.ruleHits.some((regel) => regel.ruleName === 'PASIENT_ELDRE_ENN_70');
    const isZDiagnosis = behandlingsutfall.ruleHits.some((regel) => regel.ruleName === 'ICPC_2_Z_DIAGNOSE');

    return (
        <Veilederpanel type="plakat" kompakt fargetema="normal" svg={<VeilederMaleNeurtralSvg />}>
            <Undertittel className="veiledercontent__title">Sykmeldingen kan dessverre ikke brukes</Undertittel>
            <hr aria-hidden className="veiledercontent__underline" />
            <Normaltekst>Beklager at vi må bry deg mens du er syk.</Normaltekst>
            <br />
            {isNotValidInHPR || isMissingAuthorization || isNotCorrectRole || isSuspended || isRoleOver12Weeks ? (
                <Normaltekst>
                    Den som har skrevet sykmeldingen, har ikke autorisasjon til å gjøre det. Du må derfor få en annen
                    til å skrive sykmeldingen.
                </Normaltekst>
            ) : isOver70 ? (
                <Normaltekst>
                    Du har ikke rett til sykepenger fordi du er over 70 år. I stedet for sykmelding kan du be om en
                    skriftlig bekreftelse på at du er syk.
                </Normaltekst>
            ) : isZDiagnosis ? (
                <ForklaringZDiagnose />
            ) : (
                <ForklaringAndre behandlerNavn={behandlerNavn} />
            )}
        </Veilederpanel>
    );
};

export default AvvistVeileder;
