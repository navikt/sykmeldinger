import React, { useState } from 'react'
import Link from 'next/link'
import { BodyShort, Heading, LinkPanel } from '@navikt/ds-react'
import cn from 'classnames'

import { Sykmelding } from '../../../fetching/graphql.generated'
import { getReadableSykmeldingLength, getSykmeldingTitle } from '../../../utils/sykmeldingUtils'
import { getDescription } from '../../../utils/periodeUtils'

import LenkepanelIcon from './LenkepanelIcon'
import LenkepanelEtikett from './LenkepanelEtikett'
import styles from './Lenkepanel.module.css'

interface LenkepanelProps {
    sykmelding: Sykmelding
    isNew: boolean
}

const Lenkepanel: React.FC<LenkepanelProps> = ({ sykmelding, isNew }) => {
    const status = sykmelding.sykmeldingStatus.statusEvent
    const behandlingsutfallStatus = sykmelding.behandlingsutfall.status
    const arbeidsgiverNavn = sykmelding.sykmeldingStatus.arbeidsgiver?.orgNavn

    const [isHoverState, setIsHoverState] = useState<boolean>(false)

    return (
        <Link href={`/${sykmelding.id}`} passHref>
            <LinkPanel
                onMouseEnter={() => setIsHoverState(true)}
                onMouseLeave={() => setIsHoverState(false)}
                className={cn(styles.lenkepanel, { [styles.lenkepanelAlert]: isNew })}
                border
            >
                <div className={styles.lenkepanelContent}>
                    <div className={styles.icon}>
                        <LenkepanelIcon
                            hover={isHoverState}
                            behandlingsutfall={behandlingsutfallStatus}
                            isPaper={Boolean(sykmelding.papirsykmelding)}
                        />
                    </div>
                    <div className={styles.mainContent}>
                        <BodyShort>{getReadableSykmeldingLength(sykmelding)}</BodyShort>
                        <Heading size="small" level="3">
                            {getSykmeldingTitle(sykmelding)}
                        </Heading>
                        <ul>
                            {sykmelding.sykmeldingsperioder.map((periode, index) => (
                                <li key={index}>
                                    <BodyShort>{getDescription(periode, arbeidsgiverNavn)}</BodyShort>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.statusText}>
                        <LenkepanelEtikett status={status} behandlingsutfall={behandlingsutfallStatus} />
                    </div>
                </div>
            </LinkPanel>
        </Link>
    )
}

export default Lenkepanel
