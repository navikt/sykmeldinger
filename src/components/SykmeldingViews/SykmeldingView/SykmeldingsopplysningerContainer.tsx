import React, { useRef, useState } from 'react';
import cn from 'classnames';
import { Accordion, BodyShort, Button, Heading } from '@navikt/ds-react';
import { Findout, Print } from '@navikt/ds-icons';

import { SykmeldingFragment } from '../../../fetching/graphql.generated';
import Lukknapp from '../../Lukknapp/Lukknapp';
import { toReadableDate } from '../../../utils/dateUtils';

import SykmeldingViewArbeidsgiver from './SykmeldingViewArbeidsgiver';
import SykmeldingViewSykmeldt from './SykmeldingViewSykmeldt';
import styles from './SykmeldingsopplysningerContainer.module.css';

interface SykmeldingsopplysningerProps {
    sykmelding: SykmeldingFragment;
    expandable?: boolean;
    expandedDefault?: boolean;
    arbeidsgiver?: boolean;
}

const Sykmeldingsopplysninger: React.FC<SykmeldingsopplysningerProps> = ({
    sykmelding,
    expandable = false,
    expandedDefault = true,
    arbeidsgiver = false,
}: SykmeldingsopplysningerProps) => {
    const [expanded, setExpanded] = useState(expandedDefault);
    const elementRef = useRef<HTMLElement>(null);

    const contentId = `sykmelding-${sykmelding.id}-content${arbeidsgiver ? '-arbeidsgiver' : ''}`;
    const headerId = `sykmelding-${sykmelding.id}-header${arbeidsgiver ? '-arbeidsgiver' : ''}`;

    return (
        <article
            aria-labelledby={headerId}
            ref={elementRef}
            className={cn(styles.sykmeldingsopplysninger, { [styles.opplysningerTilArbeidsgiver]: arbeidsgiver })}
        >
            {expandable ? (
                <>
                    <Accordion className={styles.expandeblePanel}>
                        <Accordion.Item open={expanded}>
                            <Accordion.Header
                                id={headerId}
                                className={styles.sykmeldingsopplysningerHeader}
                                type="button"
                                onClick={() => {
                                    if (!expanded) {
                                        setTimeout(() => {
                                            elementRef.current?.scrollIntoView({ behavior: 'smooth' });
                                        }, 200);
                                    }
                                    setExpanded(!expanded);
                                }}
                            >
                                <div className={styles.expendableHeader}>
                                    <div className={styles.sykmeldingsopplysningerIcon}>
                                        <Findout />
                                    </div>
                                    <Heading
                                        className={styles.sykmeldingsopplysningerText}
                                        size="small"
                                        level="2"
                                        id="sykmeldinger-panel-info-section"
                                    >
                                        Se hva som sendes til jobben din
                                    </Heading>
                                </div>
                            </Accordion.Header>
                            <Accordion.Content id={contentId} aria-labelledby={headerId}>
                                <SykmeldingViewArbeidsgiver sykmelding={sykmelding} />
                                <Lukknapp onClick={() => setExpanded(false)} />
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion>
                </>
            ) : (
                <>
                    {!arbeidsgiver ? (
                        <>
                            <header className={styles.sykmeldingsopplysningerHeader}>
                                <div className={styles.sykmeldtHeader}>
                                    <Heading size="small" level="2" id="sykmeldinger-panel-info-section">
                                        Opplysninger fra sykmeldingen
                                    </Heading>
                                    <div className={styles.sentDateAndPrint}>
                                        <BodyShort className={styles.sendtDato} size="small">
                                            {`Sendt til oss ${toReadableDate(sykmelding.mottattTidspunkt)}`}
                                        </BodyShort>
                                        <Button
                                            onClick={() => window.print()}
                                            variant="tertiary"
                                            className={styles.printButton}
                                        >
                                            <Print />
                                        </Button>
                                    </div>
                                </div>
                            </header>
                            <div id={contentId} aria-labelledby={headerId}>
                                <SykmeldingViewSykmeldt sykmelding={sykmelding} />
                            </div>
                        </>
                    ) : (
                        <>
                            <header className={styles.sykmeldingsopplysningerHeader}>
                                <div className={styles.arbeidsgiverHeader}>
                                    <div className={styles.sykmeldingsopplysningerIcon}>
                                        <Findout />
                                    </div>
                                    <Heading
                                        className={styles.sykmeldingsopplysningerText}
                                        size="small"
                                        level="2"
                                        id="sykmeldinger-panel-info-section"
                                    >
                                        Se hva som sendes til jobben din
                                    </Heading>
                                </div>
                            </header>
                            <div id={contentId} aria-labelledby={headerId}>
                                <SykmeldingViewArbeidsgiver sykmelding={sykmelding} />
                            </div>
                        </>
                    )}
                </>
            )}
        </article>
    );
};

export default Sykmeldingsopplysninger;
