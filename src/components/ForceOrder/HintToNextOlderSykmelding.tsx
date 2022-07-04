import { BodyLong, Button, GuidePanel } from '@navikt/ds-react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import cn from 'classnames';

import { toEarliestSykmelding, useUnsentSykmeldinger } from '../../hooks/useFindOlderSykmeldingId';
import { pluralize } from '../../utils/stringUtils';
import { getPublicEnv } from '../../utils/env';
import { useAmplitude } from '../../amplitude/amplitude';

import styles from './HintToNextOlderSykmelding.module.css';

const publicEnv = getPublicEnv();

function HintToNextOlderSykmelding(): JSX.Element | null {
    const logEvent = useAmplitude();
    const { unsentSykmeldinger, error, isLoading } = useUnsentSykmeldinger();
    const dontShowYet = isLoading || error || unsentSykmeldinger == null;
    const isDone = unsentSykmeldinger?.length === 0 ?? false;

    useEffect(() => {
        if (dontShowYet) return;

        if (isDone) {
            logEvent({ eventName: 'guidepanel vist', data: { komponent: 'hint til neste eldre sykmelding' } });
        } else {
            logEvent({ eventName: 'guidepanel vist', data: { komponent: 'ingen flere sykmeldinger å sende inn' } });
        }
    }, [dontShowYet, isDone, logEvent]);

    if (dontShowYet) return null;
    if (isDone) {
        return (
            <div className={cn(styles.root, styles.ferdigButtonWrapper)}>
                <Button
                    as="a"
                    href={publicEnv.SYKEFRAVAER_ROOT || '#'}
                    onClick={() =>
                        logEvent({
                            eventName: 'navigere',
                            data: { destinasjon: 'ditt sykefravær', lenketekst: 'Ferdig' },
                        })
                    }
                >
                    Ferdig
                </Button>
            </div>
        );
    }

    const earliest = unsentSykmeldinger.reduce(toEarliestSykmelding);

    return (
        <GuidePanel poster className={styles.root}>
            <BodyLong spacing>
                Du har {pluralize('sykmelding', unsentSykmeldinger.length)} du må velge om du skal bruke
            </BodyLong>
            <Link passHref href={`/${earliest.id}`}>
                <Button
                    as="a"
                    variant="primary"
                    onClick={() =>
                        logEvent({
                            eventName: 'navigere',
                            data: { destinasjon: 'neste ubrukte sykmelding', lenketekst: 'Gå til sykmeldingen' },
                        })
                    }
                >
                    {unsentSykmeldinger.length > 1 ? 'Gå videre' : 'Gå til sykmeldingen'}
                </Button>
            </Link>
        </GuidePanel>
    );
}

export default HintToNextOlderSykmelding;
