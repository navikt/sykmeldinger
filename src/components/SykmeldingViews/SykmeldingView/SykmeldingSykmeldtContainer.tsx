import React from 'react';
import { BodyShort, Button, Heading } from '@navikt/ds-react';
import { Print } from '@navikt/ds-icons';

import { SykmeldingFragment } from '../../../fetching/graphql.generated';
import { toReadableDate } from '../../../utils/dateUtils';

import SykmeldingViewSykmeldt from './SykmeldingViewSykmeldt';
import styles from './SykmeldingSykmeldtContainer.module.css';

interface Props {
    sykmelding: SykmeldingFragment;
}

const SykmeldingSykmeldtContainer: React.FC<Props> = ({ sykmelding }: Props) => {
    return (
        <article aria-labelledby={`sykmelding-${sykmelding.id}-header`}>
            <header className={styles.sykmeldingsopplysningerHeader}>
                <div className={styles.sykmeldtHeader}>
                    <Heading size="small" level="2" id="sykmeldinger-panel-info-section">
                        Opplysninger fra sykmeldingen
                    </Heading>
                    <div className={styles.sentDateAndPrint}>
                        <BodyShort className={styles.sendtDato} size="small">
                            {`Sendt til oss ${toReadableDate(sykmelding.mottattTidspunkt)}`}
                        </BodyShort>
                        <Button onClick={() => window.print()} variant="tertiary" className={styles.printButton}>
                            <Print />
                        </Button>
                    </div>
                </div>
            </header>
            <div id={`sykmelding-${sykmelding.id}-content`} aria-labelledby={`sykmelding-${sykmelding.id}-header`}>
                <SykmeldingViewSykmeldt sykmelding={sykmelding} />
            </div>
        </article>
    );
};

export default SykmeldingSykmeldtContainer;
