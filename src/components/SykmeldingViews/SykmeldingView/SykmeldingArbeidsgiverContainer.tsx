import React, { useRef, useState } from 'react'
import { Accordion } from '@navikt/ds-react'
import { Findout } from '@navikt/ds-icons'

import { SykmeldingFragment } from '../../../fetching/graphql.generated'
import Lukknapp from '../../Lukknapp/Lukknapp'
import { isUtenlandsk } from '../../../utils/utenlanskUtils'

import SykmeldingViewArbeidsgiver from './SykmeldingViewArbeidsgiver'
import SykmeldingArbeidsgiverUtenlandsk from './SykmeldingArbeidsgiverUtenlandsk'

interface Props {
    sykmelding: SykmeldingFragment
}

function SykmeldingArbeidsgiverContainer({ sykmelding }: Props): JSX.Element {
    const [expanded, setExpanded] = useState(false)
    const elementRef = useRef<HTMLElement>(null)
    const headerId = `sykmelding-${sykmelding.id}-header-arbeidsgiver`

    return (
        <article aria-labelledby={headerId} ref={elementRef} className="bg-orange-50">
            <Accordion>
                <Accordion.Item open={expanded}>
                    <Accordion.Header
                        id={headerId}
                        className="border-none bg-orange-50 aria-expanded:bg-orange-50"
                        type="button"
                        onClick={() => {
                            if (!expanded) {
                                setTimeout(() => {
                                    elementRef.current?.scrollIntoView({ behavior: 'smooth' })
                                }, 200)
                            }
                            setExpanded(!expanded)
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <Findout role="img" aria-hidden className="shrink-0 text-2xl" />
                            Se hva som sendes til jobben din
                        </div>
                    </Accordion.Header>
                    <Accordion.Content className="p-0 py-3" id={`sykmelding-${sykmelding.id}-content-arbeidsgiver`}>
                        {isUtenlandsk(sykmelding) ? (
                            <SykmeldingArbeidsgiverUtenlandsk sykmelding={sykmelding} />
                        ) : (
                            <SykmeldingViewArbeidsgiver sykmelding={sykmelding} />
                        )}
                        <Lukknapp onClick={() => setExpanded(false)} />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </article>
    )
}

export default SykmeldingArbeidsgiverContainer
