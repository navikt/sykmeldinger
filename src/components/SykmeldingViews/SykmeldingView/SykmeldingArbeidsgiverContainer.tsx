import React, { useRef, useState } from 'react';
import { Accordion, Heading } from '@navikt/ds-react';
import { Findout } from '@navikt/ds-icons';

import { SykmeldingFragment } from '../../../fetching/graphql.generated';
import Lukknapp from '../../Lukknapp/Lukknapp';

import SykmeldingViewArbeidsgiver from './SykmeldingViewArbeidsgiver';
import styles from './SykmeldingArbeidsgiverContainer.module.css';

interface Props {
    sykmelding: SykmeldingFragment;
}

const SykmeldingArbeidsgiverContainer: React.FC<Props> = ({ sykmelding }: Props) => {
    const [expanded, setExpanded] = useState(false);
    const elementRef = useRef<HTMLElement>(null);
    const headerId = `sykmelding-${sykmelding.id}-header-arbeidsgiver`;

    return (
        <article aria-labelledby={headerId} ref={elementRef} className={styles.opplysningerTilArbeidsgiver}>
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
                    <Accordion.Content
                        id={`sykmelding-${sykmelding.id}-content-arbeidsgiver`}
                        aria-labelledby={headerId}
                    >
                        <SykmeldingViewArbeidsgiver sykmelding={sykmelding} />
                        <Lukknapp onClick={() => setExpanded(false)} />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </article>
    );
};

export default SykmeldingArbeidsgiverContainer;
