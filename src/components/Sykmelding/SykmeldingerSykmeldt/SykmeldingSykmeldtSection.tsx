import { ReactElement } from 'react'
import { BodyShort, Button, Heading } from '@navikt/ds-react'
import { PrinterSmallIcon } from '@navikt/aksel-icons'

import { SykmeldingFragment } from 'queries'

import { toReadableDate } from '../../../utils/dateUtils'
import { browserEnv } from '../../../utils/env'
import { isUtenlandsk } from '../../../utils/utenlanskUtils'

import SykmeldingSykmeldtUtenlandsk from './SykmeldingSykmeldtUtenlandsk'
import SykmeldingSykmeldt from './SykmeldingSykmeldt'

interface Props {
    sykmelding: SykmeldingFragment
    shouldShowEgenmeldingsdagerInfo?: boolean
}

function SykmeldingSykmeldtSection({ sykmelding, shouldShowEgenmeldingsdagerInfo = false }: Props): ReactElement {
    const articleHeadingId = `sykmelding-${sykmelding.id}-header`

    return (
        <article aria-labelledby={articleHeadingId}>
            <header>
                <div className="relative mb-2 flex flex-col pb-4">
                    <Heading id={articleHeadingId} size="medium" level="2">
                        Opplysninger fra sykmeldingen
                    </Heading>
                    <div className="flex justify-between border-b border-gray-500">
                        <BodyShort className="pb-2 text-gray-600" size="small">
                            {`Sendt til oss ${toReadableDate(sykmelding.mottattTidspunkt)}`}
                        </BodyShort>
                        <Button
                            className="absolute right-0 top-0 hidden md:block"
                            as="a"
                            href={`${browserEnv.NEXT_PUBLIC_BASE_PATH}/${sykmelding.id}/pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="tertiary"
                            icon={<PrinterSmallIcon title="Åpne PDF av sykmeldingen" />}
                        />
                    </div>
                </div>
            </header>
            {isUtenlandsk(sykmelding) ? (
                <SykmeldingSykmeldtUtenlandsk
                    sykmelding={sykmelding}
                    shouldShowEgenmeldingsdagerInfo={shouldShowEgenmeldingsdagerInfo}
                />
            ) : (
                <SykmeldingSykmeldt
                    sykmelding={sykmelding}
                    shouldShowEgenmeldingsdagerInfo={shouldShowEgenmeldingsdagerInfo}
                />
            )}
        </article>
    )
}

export default SykmeldingSykmeldtSection
