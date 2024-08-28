import { ReactElement, CSSProperties } from 'react'
import { ExpansionCard } from '@navikt/ds-react'
import { FileSearchIcon } from '@navikt/aksel-icons'

import { SykmeldingFragment } from 'queries'

import { isUtenlandsk } from '../../../utils/utenlanskUtils'

import SykmeldingArbeidsgiver from './SykmeldingArbeidsgiver'
import SykmeldingArbeidsgiverUtenlandsk from './SykmeldingArbeidsgiverUtenlandsk'

interface Props {
    sykmelding: SykmeldingFragment
    chosenEgenmeldingsdager?: string[]
}

function SykmeldingArbeidsgiverExpansionCard({ sykmelding, chosenEgenmeldingsdager }: Props): ReactElement {
    const headerId = `sykmelding-${sykmelding.id}-header-arbeidsgiver`

    return (
        <ExpansionCard
            aria-labelledby={headerId}
            className="mb-8"
            style={{ '--ac-expansioncard-bg': 'var(--a-orange-50)' } as CSSProperties}
        >
            <ExpansionCard.Header>
                <div className="flex items-center gap-4">
                    <div className="mt-1.5 grid shrink-0 place-content-center text-4xl">
                        <FileSearchIcon role="img" aria-hidden />
                    </div>
                    <ExpansionCard.Title id={headerId} as="h2">
                        Se hva som sendes til jobben din
                    </ExpansionCard.Title>
                </div>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                {isUtenlandsk(sykmelding) ? (
                    <SykmeldingArbeidsgiverUtenlandsk
                        sykmelding={sykmelding}
                        chosenEgenmeldingsdager={chosenEgenmeldingsdager}
                    />
                ) : (
                    <SykmeldingArbeidsgiver sykmelding={sykmelding} chosenEgenmeldingsdager={chosenEgenmeldingsdager} />
                )}
            </ExpansionCard.Content>
        </ExpansionCard>
    )
}

export default SykmeldingArbeidsgiverExpansionCard
