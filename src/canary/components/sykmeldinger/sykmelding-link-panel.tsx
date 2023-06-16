import type { ReactElement } from 'react'
import { isBefore } from 'date-fns'
import * as ds from '@navikt/ds-react'

import { cn } from '../../../utils/tw-utils'
import { Periodetype, RegelStatus, StatusEvent } from '../../../fetching/graphql.generated'
import LenkepanelIcon from '../../../components/SykmeldingLinkPanel/Lenkepanel/LenkepanelIcon'
import type { Sykmelding } from '../../db'
import { diffInDays, toDate, toReadableDatePeriod } from '../../../utils/dateUtils'

function SykmeldingLinkPanel({ sykmelding, notifying }: { sykmelding: Sykmelding; notifying: boolean }): ReactElement {
    return (
        <ds.LinkPanel
            href={`/new/${sykmelding.sykmelding_id}`}
            className={cn('mb-4 p-6 [&>div]:w-full', {
                'border-orange-300 bg-orange-50 hover:border-orange-500': notifying,
            })}
        >
            <div className="flex gap-3 max-[560px]:flex-col">
                <div className="mr-8 hidden sm:block">
                    <LenkepanelIcon
                        behandlingsutfall={sykmelding.rule_hits[0].ruleStatus as RegelStatus}
                        isPaper={sykmelding.sykmelding.papirsykmelding}
                    />
                </div>
                <div className="grow">
                    <ds.BodyShort>{getReadableSykmeldingLength(sykmelding)}</ds.BodyShort>
                    <ds.Heading size="small" level="3">
                        Sykmelding
                    </ds.Heading>
                    <ul className="list-disc pl-4">
                        {sykmelding.sykmelding.sykmeldingsperioder.map((periode, index) => (
                            <li key={index}>
                                <ds.BodyShort>{getDescription(periode, sykmelding.arbeidsgiver?.orgNavn)}</ds.BodyShort>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex shrink-0 items-center">
                    <SykmeldingLinkPanelTag
                        status={sykmelding.event as StatusEvent}
                        behandlingsutfall={sykmelding.rule_hits[0].ruleStatus as RegelStatus}
                    />
                </div>
            </div>
        </ds.LinkPanel>
    )
}

function SykmeldingLinkPanelTag({
    status,
    behandlingsutfall,
}: {
    status: StatusEvent
    behandlingsutfall: RegelStatus
}): ReactElement | null {
    if (behandlingsutfall === 'INVALID') {
        if (status === 'APEN' || status === 'BEKREFTET') {
            return (
                <ds.Tag variant="warning" size="small">
                    Avvist av NAV
                </ds.Tag>
            )
        }
    }

    switch (status) {
        case 'AVBRUTT':
            return (
                <ds.Tag variant="error" size="small">
                    Avbrutt av deg
                </ds.Tag>
            )
        case 'SENDT':
            return (
                <ds.Tag variant="success" size="small">
                    Sendt til arbeidsgiver
                </ds.Tag>
            )
        case 'UTGATT':
            return (
                <ds.Tag variant="info" size="small">
                    Utgått
                </ds.Tag>
            )
        case 'BEKREFTET':
            return (
                <ds.Tag variant="success" size="small">
                    Sendt til NAV
                </ds.Tag>
            )
        default:
            return null
    }
}

function getReadableSykmeldingLength(sykmelding: Sykmelding): string {
    const fom = sykmelding.sykmelding.sykmeldingsperioder
        .map((it) => toDate(it.fom))
        .reduce((acc, value) => {
            return isBefore(value, acc) ? value : acc
        })

    const tom = sykmelding.sykmelding.sykmeldingsperioder
        .map((it) => toDate(it.tom))
        .reduce((acc, value) => {
            return isBefore(value, acc) ? value : acc
        })

    return toReadableDatePeriod(fom, tom)
}

export function getDescription(
    periode: Sykmelding['sykmelding']['sykmeldingsperioder'][number],
    arbeidsgiverNavn?: string,
): string {
    const periodLength = diffInDays(periode.fom, periode.tom)

    switch (periode.type) {
        case Periodetype.AKTIVITET_IKKE_MULIG:
            return `100% sykmeldt${arbeidsgiverNavn ? ` fra ${arbeidsgiverNavn}` : ''} i ${periodLength} dag${
                periodLength > 1 ? 'er' : ''
            }`
        case Periodetype.GRADERT:
            return `${periode.gradert?.grad}% sykmeldt${
                arbeidsgiverNavn ? ` fra ${arbeidsgiverNavn}` : ''
            } i ${periodLength} dag${periodLength > 1 ? 'er' : ''}`
        case Periodetype.BEHANDLINGSDAGER:
            return `${periode.behandlingsdager} behandlingsdag${
                periode.behandlingsdager && periode.behandlingsdager > 1 ? 'er' : ''
            } i løpet av ${periodLength} dag${periodLength > 1 ? 'er' : ''}`
        case Periodetype.AVVENTENDE:
            return `Avventende sykmelding i ${periodLength} dag${periodLength > 1 ? 'er' : ''}`
        case Periodetype.REISETILSKUDD:
            return `Reisetilskudd i ${periodLength} dag${periodLength > 1 ? 'er' : ''}`
        default:
            return ''
    }
}

export default SykmeldingLinkPanel
