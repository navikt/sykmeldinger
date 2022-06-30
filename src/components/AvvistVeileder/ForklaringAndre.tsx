import React from 'react';
import { BodyLong, BodyShort, Label } from '@navikt/ds-react';

import { Behandlingsutfall } from '../../fetching/graphql.generated';

import styles from './ForklaringAndre.module.css';

interface ForklaringAndreProps {
    behandlerNavn: string;
    ruleHits: Behandlingsutfall['ruleHits'];
}

function ForklaringAndre({ behandlerNavn, ruleHits }: ForklaringAndreProps): JSX.Element {
    return (
        <>
            <BodyLong>
                Du trenger en ny sykmelding fordi det er gjort en feil i utfyllingen. Vi har gitt beskjed til{' '}
                {behandlerNavn} om hva som er feil, og at du må få en ny sykmelding.
            </BodyLong>
            <br />
            <Label>Grunnen til at sykmeldingen er avvist:</Label>
            <ul className={styles.begrunnelseList}>
                {ruleHits.map((ruleHit, index) => (
                    <li key={index}>
                        <BodyShort>{ruleHit.messageForUser}</BodyShort>
                    </li>
                ))}
            </ul>
            <BodyLong>
                Når du har fått ny sykmelding fra {behandlerNavn}, får du en ny beskjed fra oss om å logge deg inn på
                nav.no slik at du kan sende inn sykmeldingen. Går det mange dager, bør du kontakte {behandlerNavn} som
                skal skrive den nye sykmeldingen.
            </BodyLong>
        </>
    );
}

export default ForklaringAndre;
