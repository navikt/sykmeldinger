import React from 'react';
import { BodyLong, Button, GuidePanel, Heading, ReadMore } from '@navikt/ds-react';
import Link from 'next/link';

import { pluralize } from '../../utils/stringUtils';
import { useAmplitude, useLogAmplitudeEvent } from '../../amplitude/amplitude';

import styles from './ForceUseOlderSykmelding.module.css';

interface Props {
    olderSykmeldingId: string;
    olderSykmeldingCount: number;
}

function ForceUseOlderSykmelding({ olderSykmeldingId, olderSykmeldingCount }: Props): JSX.Element {
    const logEvent = useAmplitude();
    useLogAmplitudeEvent({
        eventName: 'guidepanel vist',
        data: { komponent: 'tvungen videresending til ubrukte sykmeldinger' },
    });

    return (
        <GuidePanel poster>
            <Heading size="small">Før du kan begynne</Heading>
            Du har {pluralize('sykmelding', olderSykmeldingCount)} du må velge om du skal bruke, før du kan bruke denne.
            <div className={styles.readMore}>
                <ReadMore
                    header="Hvorfor må jeg gjøre dette?"
                    onClick={() =>
                        logEvent({
                            eventName: 'accordion åpnet',
                            data: { tekst: 'Hvorfor må jeg gjøre dette?' },
                        })
                    }
                >
                    <div>
                        <BodyLong spacing>
                            Andre sykmeldingsperioder kan påvirke beløpet du skal få utbetalt for denne perioden.
                        </BodyLong>
                        <BodyLong>
                            Derfor må vi be deg om å velge om du skal bruke de sykmeldingene du har liggende, før du kan
                            begynne på denne.
                        </BodyLong>
                    </div>
                </ReadMore>
            </div>
            <Link passHref href={`/${olderSykmeldingId}`}>
                <Button
                    as="a"
                    variant="primary"
                    onClick={() =>
                        logEvent({
                            eventName: 'navigere',
                            data: {
                                destinasjon: 'neste ubrukte sykmelding (tvungen)',
                                lenketekst: 'Gå til sykmeldingen',
                            },
                        })
                    }
                >
                    {olderSykmeldingCount > 1 ? 'Gå videre' : 'Gå til sykmeldingen'}
                </Button>
            </Link>
        </GuidePanel>
    );
}

export default ForceUseOlderSykmelding;
