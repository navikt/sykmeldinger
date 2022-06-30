import React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { BodyLong, BodyShort, Heading } from '@navikt/ds-react';

import VeilederMaleNeurtralSvg from '../Veileder/svg/VeilederMaleNeutralSvg';
import { Behandlingsutfall } from '../../fetching/graphql.generated';

import ForklaringZDiagnose from './ForklaringZDiagnose';
import ForklaringAndre from './ForklaringAndre';
import styles from './AvvistVeileder.module.css';

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
    const isOver12Weeks = behandlingsutfall.ruleHits.some(
        (regel) => regel.ruleName === 'BEHANDLER_MT_FT_KI_OVER_12_UKER',
    );
    const isOver70 = behandlingsutfall.ruleHits.some((regel) => regel.ruleName === 'PASIENT_ELDRE_ENN_70');
    const isZDiagnosis = behandlingsutfall.ruleHits.some((regel) => regel.ruleName === 'ICPC_2_Z_DIAGNOSE');

    return (
        <Veilederpanel type="plakat" kompakt fargetema="normal" svg={<VeilederMaleNeurtralSvg />}>
            <Heading size="small" className={styles.title}>
                Sykmeldingen kan dessverre ikke brukes
            </Heading>
            <hr aria-hidden className={styles.underline} />
            <BodyShort>Beklager at vi må bry deg mens du er syk.</BodyShort>
            <br />
            {isNotValidInHPR || isMissingAuthorization || isNotCorrectRole || isSuspended ? (
                <BodyShort>
                    Den som har skrevet sykmeldingen, har ikke autorisasjon til å gjøre det. Du må derfor få en annen
                    til å skrive sykmeldingen.
                </BodyShort>
            ) : isOver12Weeks ? (
                <div className={styles.over12Weeks}>
                    <BodyLong>
                        Kiropraktorer og manuellterapeuter har ikke lov til å skrive en sykmelding som gjør at det
                        totale sykefraværet ditt blir lenger enn 12 uker.
                    </BodyLong>
                    <BodyLong>Du må få en lege til å skrive sykmeldingen.</BodyLong>
                </div>
            ) : isOver70 ? (
                <BodyShort>
                    Du har ikke rett til sykepenger fordi du er over 70 år. I stedet for sykmelding kan du be om en
                    skriftlig bekreftelse på at du er syk.
                </BodyShort>
            ) : isZDiagnosis ? (
                <ForklaringZDiagnose />
            ) : (
                <ForklaringAndre behandlerNavn={behandlerNavn} ruleHits={behandlingsutfall.ruleHits} />
            )}
        </Veilederpanel>
    );
};

export default AvvistVeileder;
