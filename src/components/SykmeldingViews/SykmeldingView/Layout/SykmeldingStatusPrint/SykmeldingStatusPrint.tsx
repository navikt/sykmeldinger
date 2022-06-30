import React from 'react';
import cn from 'classnames';
import { Heading } from '@navikt/ds-react';
import { InformationFilled } from '@navikt/ds-icons';

import { Behandlingsutfall } from '../../../../../fetching/graphql.generated';

import styles from './SykmeldingStatusPrint.module.css';

interface Props {
    title: string;
    Icon: typeof InformationFilled;
    list?: Behandlingsutfall['ruleHits'];
}

function SykmeldingStatusPrint({ title, Icon, list }: Props): JSX.Element {
    return (
        <div className={cn(styles.root, 'sykmelding-status-print')}>
            <div className={styles.sykmeldingStatusPrint}>
                <Icon />
                <Heading level="1" size="medium">
                    {title}
                </Heading>
            </div>
            {list && (
                <>
                    <Heading level="2" size="xsmall">
                        Grunnen til at sykmeldingen er avvist:
                    </Heading>
                    <ul className={styles.list}>
                        {list.map((grunn, index) => (
                            <li key={index}>{grunn.messageForUser}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default SykmeldingStatusPrint;
