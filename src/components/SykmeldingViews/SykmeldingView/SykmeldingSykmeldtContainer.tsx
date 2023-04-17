import { BodyShort, Button, Heading } from '@navikt/ds-react'
import { Print } from '@navikt/ds-icons'

import { SykmeldingFragment } from '../../../fetching/graphql.generated'
import { toReadableDate } from '../../../utils/dateUtils'
import { browserEnv } from '../../../utils/env'
import { isUtenlandsk } from '../../../utils/utenlanskUtils'

import SykmeldingSykmeldtUtenlandsk from './SykmeldingSykmeldtUtenlandsk'
import SykmeldingViewSykmeldt from './SykmeldingViewSykmeldt'

interface Props {
    sykmelding: SykmeldingFragment
    editableEgenmelding?: boolean
}

function SykmeldingSykmeldtContainer({ sykmelding, editableEgenmelding = false }: Props): JSX.Element {
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
                            icon={<Print title="Åpne PDF av sykmeldingen" />}
                        />
                    </div>
                </div>
            </header>
            {isUtenlandsk(sykmelding) ? (
                <SykmeldingSykmeldtUtenlandsk sykmelding={sykmelding} editableEgenmelding={editableEgenmelding} />
            ) : (
                <SykmeldingViewSykmeldt sykmelding={sykmelding} editableEgenmelding={editableEgenmelding} />
            )}
        </article>
    )
}

export default SykmeldingSykmeldtContainer
