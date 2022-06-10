import React from 'react';
import { BodyShort, Heading } from '@navikt/ds-react';
import { Bandage } from '@navikt/ds-icons';

import { toReadableDate } from '../../../../../utils/dateUtils';
import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading';
import { MedisinskVurdering } from '../../../../../models/Sykmelding/MedisinskVurdering';

import styles from './MedisinskTilstand.module.css';

interface Props {
    medisinskVurdering: MedisinskVurdering | null;
}

function MedisinskTilstand({ medisinskVurdering }: Props): JSX.Element | null {
    if (!medisinskVurdering) return null;

    return (
        <>
            <SykmeldtHeading title="Medisinsk tilstand" Icon={Bandage} />
            <div className={styles.medisinskTilstand}>
                {medisinskVurdering.hovedDiagnose?.tekst && (
                    <div className={styles.info}>
                        <Heading className={styles.heading} size="small" level="4">
                            Diagnose
                        </Heading>
                        <BodyShort size="small">{medisinskVurdering?.hovedDiagnose?.tekst}</BodyShort>
                    </div>
                )}
                {medisinskVurdering.biDiagnoser.map((bidiagnose, index) => {
                    if (bidiagnose.tekst) {
                        return (
                            <div className={styles.info} key={index}>
                                <Heading className={styles.heading} size="small" level="4">
                                    Bidiagnose
                                </Heading>
                                <BodyShort size="small">{bidiagnose.tekst}</BodyShort>
                            </div>
                        );
                    }
                    return null;
                })}
                <>
                    {!!(
                        medisinskVurdering.annenFraversArsak?.grunn &&
                        medisinskVurdering.annenFraversArsak?.grunn.length > 0
                    ) && (
                        <div className={styles.info}>
                            <Heading className={styles.heading} size="small" level="4">
                                Annen lovfestet fraværsgrunn
                            </Heading>
                            <BodyShort size="small">{medisinskVurdering.annenFraversArsak.grunn.join('. ')}</BodyShort>
                        </div>
                    )}
                    {!!medisinskVurdering.annenFraversArsak?.beskrivelse && (
                        <div className={styles.info}>
                            <Heading className={styles.underHeading} size="xsmall" level="5">
                                Beskrivelse av fraværsgrunn
                            </Heading>
                            <BodyShort size="small">{medisinskVurdering.annenFraversArsak.beskrivelse}</BodyShort>
                        </div>
                    )}
                    {medisinskVurdering.svangerskap && (
                        <div className={styles.info}>
                            <Heading className={styles.underHeading} size="xsmall" level="5">
                                Er sykdommen svangerskapsrelatert?
                            </Heading>
                            <BodyShort size="small">Ja</BodyShort>
                        </div>
                    )}
                    {medisinskVurdering.yrkesskade && (
                        <div className={styles.info}>
                            <Heading className={styles.underHeading} size="xsmall" level="5">
                                Kan sykdommen skyldes en yrkesskade/yrkessykdom?
                            </Heading>
                            <BodyShort size="small">Ja</BodyShort>
                        </div>
                    )}
                </>
                {!!medisinskVurdering.yrkesskadeDato && (
                    <div className={styles.info}>
                        <Heading className={styles.heading} size="small" level="4">
                            Skadedato
                        </Heading>
                        <BodyShort size="small">{toReadableDate(medisinskVurdering.yrkesskadeDato)}</BodyShort>
                    </div>
                )}
            </div>
        </>
    );
}

export default MedisinskTilstand;
