import React from 'react'
import { BodyShort, Button, Heading } from '@navikt/ds-react'
import { Print } from '@navikt/ds-icons'

import { SykmeldingFragment } from '../../../fetching/graphql.generated'
import { toReadableDate } from '../../../utils/dateUtils'
import { getPublicEnv } from '../../../utils/env'
import { isUtenlandsk } from '../../../utils/utenlanskUtils'

import SykmeldingSykmeldtUtenlandsk from './SykmeldingSykmeldtUtenlandsk'
import SykmeldingViewSykmeldt from './SykmeldingViewSykmeldt'
import styles from './SykmeldingSykmeldtContainer.module.css'

interface Props {
    sykmelding: SykmeldingFragment
}

const publicEnv = getPublicEnv()

const SykmeldingSykmeldtContainer: React.FC<Props> = ({ sykmelding }: Props) => {
    const articleHeadingId = `sykmelding-${sykmelding.id}-header`

    return (
        <article aria-labelledby={articleHeadingId}>
            <header className={styles.sykmeldingsopplysningerHeader}>
                <div className={styles.sykmeldtHeader}>
                    <Heading id={articleHeadingId} size="small" level="2">
                        Opplysninger fra sykmeldingen
                    </Heading>
                    <div className={styles.sentDateAndPrint}>
                        <BodyShort className={styles.sendtDato} size="small">
                            {`Sendt til oss ${toReadableDate(sykmelding.mottattTidspunkt)}`}
                        </BodyShort>
                        <Button
                            as="a"
                            href={`${publicEnv.publicPath}/${sykmelding.id}/pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="tertiary"
                            className={styles.printButton}
                            icon={<Print title="Åpne PDF av sykmeldingen" />}
                        />
                    </div>
                </div>
            </header>
            {isUtenlandsk(sykmelding) ? (
                <SykmeldingSykmeldtUtenlandsk sykmelding={sykmelding} />
            ) : (
                <SykmeldingViewSykmeldt sykmelding={sykmelding} />
            )}
        </article>
    )
}

export default SykmeldingSykmeldtContainer
